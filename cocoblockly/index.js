const {app, BrowserWindow, globalShortcut, Menu, ipcMain, dialog} = require('electron');
const fs = require('fs');
const path = require('path');
const os = require('os');
const Configstore = require('configstore');
const conf = new Configstore("NeoBlock");


let mainWindow;
var exec = require('child_process').exec;

if (os.platform() == "win32") {
    app.setPath("appData", process.env.LOCALAPPDATA);
    app.setPath("userData", path.join(process.env.LOCALAPPDATA, app.getName()));
}


var cocoServer = {};

cocoServer.compileError = 0;
cocoServer.compilerBusy = 0;
cocoServer.progress = 0;
cocoServer.compileProgressRe = /.*Progress \{0\} \|\|\| \[(.*)\]/;

cocoServer.arduino_paths_osx = [
						"/Users/xcorex/Downloads/Arduino-2.app",
						"/Applications/Arduino.app",
						app.getAppPath() + path.sep + 'Arduino.app'
					]
					
cocoServer.arduino_paths_win = [
						"c:\\Program Files (x86)\\Arduino",
						"c:\\Program Files\\Arduino",
						app.getAppPath() + path.sep + 'Arduino'
					]

cocoServer.errorLint = []
cocoServer.compile = {
	errorLint: [],
	errorRe: /In file included from (.*)\/(.*).ino:(.*):(.*):\n(.*)/g,
	errorRe2: /(.*):(.*):(.*): (.*): (.*)/g
}

function fileExists(filePath) {
    try
    {
        var stats = fs.statSync(filePath);
        return stats.isFile() || stats.isDirectory();
    }
    catch (err)
    {
        return false;
    }
}

process.on('uncaughtException', function (exception) {
  // handle or ignore error
  console.log(exception);
});


var setArduinoFolder = function(arduino_path, script_name)
{
	var scriptName = script_name;
    var arduinoAppPath = arduino_path;

	var tmpSys = app.getPath('temp');

	if (os.platform() === 'linux') {
		tmpSys = tmpSys + path.sep;
	}
	
    var docDir = app.getPath('documents');
	var appDataDir = app.getPath('appData');
	var appResourceDir = app.getAppPath();

	appResourceDir = appResourceDir.substring(0, appResourceDir.lastIndexOf(path.sep));appResourceDir.substring(0, appResourceDir.lastIndexOf(path.sep));

    var tmpScriptDir = tmpSys + scriptName;
    var tmpScript = tmpScriptDir + path.sep + scriptName + ".ino";
	var scriptNameCompile = scriptName + "Compile";    
    var tmpCompileDir = tmpSys + scriptNameCompile;
    

    var getLatestVer = function(board_dir)
    {
    	var ver_dir = (fs.readdirSync(board_dir))

    	var max_time = 0;
    	var latest_ver = "";

    	var arrayLength = ver_dir.length;
		for (var i = 0; i < arrayLength; i++) {
		    var cur_ver = ver_dir[i];
		    var fullpath = path.join(cocomakepath, path.sep, cur_ver);
		    var cur_time = fs.statSync(fullpath).ctime;
		    if (cur_ver === '.DS_Store') continue;
		    if (cur_time > max_time) latest_ver = ver_dir[i];
		}

		return latest_ver;
    }

    if (os.platform() === 'darwin') {
    	
		var cocomakepath = appResourceDir + '/toolchain/platform/8BitMixtape/hardware/avr'
		// var cocomakepath = appDataDir + '/../Arduino15/packages/8BitMixtape/hardware/avr'

    	var latest_ver = getLatestVer(cocomakepath)

	    cocoServer.arduinoPath = {
	    	scriptName   : scriptName,
			tmpScriptDir : tmpScriptDir,
			tmpScript  	 : tmpScript,
			tmpCompileDir: tmpCompileDir,
			appPath 	 : arduinoAppPath,
			hwManager 	 : appResourceDir + '/toolchain/platform',
		    toolHwManager: appResourceDir + '/toolchain/platform',
		    hwUserPath 	 : docDir + '/Arduino/hardware',
		    userLib 	 : docDir + '/Arduino/libraries',
		    builderPath  : appResourceDir + '/toolchain/tools_osx/arduino-builder',
		    hwPath 		 : appResourceDir + '/toolchain/tools_osx/hardware',
		    builtinLib 	 : appResourceDir + '/toolchain/libraries',
		    toolbuilder  : appResourceDir + '/toolchain/tools_osx/tools-builder',
		    toolAvr 	 : appResourceDir + '/toolchain/tools_osx/hardware/tools/avr',
		    builtPath 	 : tmpCompileDir,
			scriptPath 	 : tmpScript,
			cocoMakePath : cocomakepath + path.sep + latest_ver,
			cocoMakeAvrdudePath : cocomakepath + path.sep + latest_ver + path.sep + 'tools/hex2wav/macosx',

		}

    }else if (os.platform() === 'win32') {

    	var cocomakepath = appResourceDir + '\\toolchain\\platform\\8BitMixtape\\hardware\\avr\\'

    	var latest_ver = getLatestVer(cocomakepath)

	    cocoServer.arduinoPath = {
	    	scriptName   : scriptName,	    	
			tmpScriptDir : tmpScriptDir,
			tmpScript  	 : tmpScript,
			tmpCompileDir: tmpCompileDir,			
			appPath 	 : arduinoAppPath,
			hwManager 	 : appResourceDir + '\\toolchain\\platform',
		    toolHwManager: appResourceDir + '\\toolchain\\platform',
		    hwUserPath 	 : docDir + "\\Arduino\\hardware\\",
		    userLib 	 : docDir + "\\Arduino\\libraries",
		    builderPath  : appResourceDir + '\\toolchain\\tools_win\\arduino-builder',
		    hwPath 		 : appResourceDir + '\\toolchain\\tools_win\\hardware',
		    builtinLib 	 : appResourceDir + '\\toolchain\\libraries',
		    toolbuilder  : appResourceDir + '\\toolchain\\tools_win\\tools-builder',
		    toolAvr 	 : appResourceDir + '\\toolchain\\tools_win\\hardware\\tools\\avr',
		    builtPath 	 : tmpCompileDir,
			scriptPath 	 : tmpScript,
			cocoMakePath : cocomakepath + path.sep + latest_ver,
			cocoMakeAvrdudePath : cocomakepath + path.sep + latest_ver + path.sep + 'tools\\hex2wav\\windows',
		}    
    }else if (os.platform() === 'linux') {

    	appDataDir = app.getPath('home')

		var cocomakepath = appResourceDir + '/toolchain/platform/8BitMixtape/hardware/avr'

    	var latest_ver = getLatestVer(cocomakepath)

	    cocoServer.arduinoPath = {
	    	scriptName   : scriptName,
			tmpScriptDir : tmpScriptDir,
			tmpScript  	 : tmpScript,
			tmpCompileDir: tmpCompileDir,
			appPath 	 : arduinoAppPath,
			hwManager 	 : appResourceDir + '/toolchain/platform',
		    toolHwManager: appResourceDir + '/toolchain/platform',
		    hwUserPath 	 : docDir + '/Arduino/hardware',
		    userLib 	 : docDir + '/Arduino/libraries',
		    builderPath  : appResourceDir + '/toolchain/tools_linux64/arduino-builder',
		    hwPath 		 : appResourceDir + '/toolchain/tools_linux64/hardware',
		    builtinLib 	 : appResourceDir + '/toolchain/libraries',
		    toolbuilder  : appResourceDir + '/toolchain/tools_linux64/tools-builder',
			toolAvr 	 : appResourceDir + '/toolchain/tools_linux64/hardware/tools/avr',
		    builtPath 	 : tmpCompileDir,
			scriptPath 	 : tmpScript,
			cocoMakePath : cocomakepath + path.sep + latest_ver,
			cocoMakeAvrdudePath : cocomakepath + path.sep + latest_ver + path.sep + 'tools/hex2wav/linux',

		}

    }

	console.log(cocoServer.arduinoPath);
}

var setArduinoFolderFromList = function (path_array) {
	var arrayLength = path_array.length;
	for (var i = 0; i < arrayLength; i++) {
		var path = path_array[i];
		    if (fileExists(path)) 
	    	{
	    		setArduinoFolder(path, "CocoTmp");
    			console.log("found arduino in " , path);    			
    			conf.set('arduinopath', path);
	    		break;
	    	}
	}
}

var initArduinoPath = function() {
	  /*
      if ( typeof(conf.get('arduinopath')) !== 'undefined' && conf.get('arduinopath') !== '')
      {
      	console.log('set path', conf.get('arduinopath'))
		setArduinoFolder(conf.get('arduinopath'), "CocoTmp");

      }else {
	    if (os.platform() === 'darwin')
	    {    	
	    	setArduinoFolderFromList(cocoServer.arduino_paths_osx)
	    }else if (os.platform() === 'win32') {
	    	setArduinoFolderFromList(cocoServer.arduino_paths_win)
	    }
	  }
	  */
	 setArduinoFolder(app.getAppPath(), "CocoTmp");
}

var cocoUploadCode = function(fun) {

	var hex2wavcmd = "hex2wav";

	if (os.platform() === 'win32') {
    	hex2wavcmd = "hex2wav.exe";
	}

    var uploadCmd = '"' + cocoServer.arduinoPath.cocoMakeAvrdudePath + path.sep + hex2wavcmd + "\" --dump-hex \"" + cocoServer.arduinoPath.builtPath + path.sep + cocoServer.arduinoPath.scriptName + ".ino.hex\"" + " \"" + cocoServer.arduinoPath.builtPath + path.sep + cocoServer.arduinoPath.scriptName + ".ino.wav\"";
	sendConsole(uploadCmd);
	sendProgress({process: 'upload', progress:0});

    var child = exec(uploadCmd);

	child.stderr.on('data', function(data) {

        cocoServer.compilerBusy = 1;

        if (data.includes('Detecting CocoMidi')) {
			sendProgress({process: 'upload', progress:25});
		}   

        if (data.includes('Waiting for 10 seconds')) {
			sendProgress({process: 'upload', progress:75});        	
			sendProgress({process: 'upload_replug', progress:75});
		}        

        if (data.includes('AVR device initialized')) {
			sendProgress({process: 'upload_replug_done', progress:100});
		}    


        if (data.includes('avrdude done.')) {
			sendProgress({process: 'upload', progress:100});        	
		}

		sendConsole(data);

	});

	child.on('close', function() {
        cocoServer.compilerBusy = 0;		
		fun();
	});

}


var cocoCompileCode = function(code, fun, funerr) {

	cocoServer.compileError = 0;

	var quote = function(str)
	{
		return '"' + str + '"';
	}

    var build_opt = [
    	['-compile'],
    	['-logger=machine'],
    	['-hardware', quote(cocoServer.arduinoPath.hwPath)],
    	['-hardware',quote(cocoServer.arduinoPath.hwManager)],
		['-tools',quote(cocoServer.arduinoPath.toolbuilder)],		
    	['-tools',quote(cocoServer.arduinoPath.toolAvr)],
		['-tools',quote(cocoServer.arduinoPath.toolHwManager)],
    	['-built-in-libraries',quote(cocoServer.arduinoPath.builtinLib)],
    	// ['-libraries',quote(cocoServer.arduinoPath.userLib)],    	
    	['-fqbn=8BitMixtape:avr:8bitmixtapeneo:bootloader=tinyaudioboot,core=teenyriotcore'],
    	['-ide-version=10801'],
    	['-build-path',quote(cocoServer.arduinoPath.builtPath)],
    	['-warnings=none'],
    	['-prefs=build.warn_data_percentage=75'],
    	['-verbose'],
    	[quote(cocoServer.arduinoPath.scriptPath)]
    ]


	var arrayLength = build_opt.length;
	var command = "";

	for (var i = 0; i < arrayLength; i++) {
	    build_opt[i] = build_opt[i].join(' ');
	}

    var build_command = quote(cocoServer.arduinoPath.builderPath) + ' ' + build_opt.join(' ');

	sendConsole(build_command);	

    cocoServer.compilerBusy = 1;

    if (!fileExists(cocoServer.arduinoPath.tmpScriptDir))
    {
		fs.mkdirSync(cocoServer.arduinoPath.tmpScriptDir);
    }


    if(!fileExists(cocoServer.arduinoPath.tmpCompileDir))
    {
		fs.mkdirSync(cocoServer.arduinoPath.tmpCompileDir);
    }

    fs.writeFileSync(cocoServer.arduinoPath.tmpScript, code);

	sendProgress({process: 'compile', progress:0});

    var child = exec(build_command);
    
    child.stderr.on('data', function(data) {
			
			//distinguish between error and warning

			if (data.includes('===Warning:') !== true)
			{
				cocoServer.compileError++;
			}

			sendConsole("\n--------- error --------\n\n");	


			//parse error and send the line number and error message to codemirror editor

			if (data.includes(cocoServer.arduinoPath.scriptPath))
			{			

				var m;

				while ((m = cocoServer.compile.errorRe.exec(data)) !== null) {
				    if (m.index === cocoServer.compile.errorRe.lastIndex) {
				        cocoServer.compile.errorRe.lastIndex++;
				    }
				    var new_err = {
						line: m[3],
						space: m[4],
						desc: m[5]
					}
					cocoServer.compile.errorLint.push(new_err)
				}

				while ((m = cocoServer.compile.errorRe2.exec(data)) !== null) {
				    if (m.index === cocoServer.compile.errorRe2.lastIndex) {
				        cocoServer.compile.errorRe2.lastIndex++;
				    }
				    var new_err = {
						line: m[2],
						space: m[3],
						desc: m[5]
					}
					cocoServer.compile.errorLint.push(new_err)
				}

			}

			sendConsole(data);	
	})

    //parse compile progress and send to progressbar

	child.stdout.on('data', function(data) {
		var m;	 
		if ((m = cocoServer.compileProgressRe.exec(data)) !== null) {
		    if (m.index === cocoServer.compileProgressRe.lastIndex) {
		        cocoServer.compileProgressRe.lastIndex++;
		    }
			sendProgress({process: 'compile', progress:m[1]});
		};

		//output everything to console
		sendConsole(data);
	});

	child.on('close', function(code) {
		
		//send errors to linter codemirror
		sendLinter(cocoServer.compile.errorLint);
		
		var isErr = 'false';

		//get how many error
		if (cocoServer.compile.errorLint.length > 0 || cocoServer.compileError > 0) isErr = 'true';

		cocoServer.compile.errorLint.length = 0;

		sendProgress({process: 'compile', error: isErr, progress:100});

        cocoServer.compilerBusy = 0;

        //callback if error and success
        if(isErr !== 'true')
	    {
	    	fun(code);
	    }else{
		    funerr();
	    }

	});

}



var receicveIPCMsg = function(event, count, data) {	

	var command = data['command'];
	var params = data['params'];
	var response = {};
			
	switch (command) {
		case 'setpath':
			setArduinoFolder(params.arduinopath, "CocoTmp")
			break;
		case 'settitle':
			mainWindow.setTitle(params)
			break;			
		case 'compile':
			if (cocoServer.compilerBusy) break;			
			cocoCompileCode(params, function(){
				response['compile'] = 'done';
				sendIPCresp(event, count, response);
			},function(){
				response['compile'] = 'error';
				sendIPCresp(event, count, response);				
			});
			break;
		case 'upload':
			if (cocoServer.compilerBusy) break;
			cocoUploadCode(function(){
				sendConsole("upload done..");
			})
			break;			
		default:
			break;
	}
}



ipcMain.on('do-ipc', (event, arg) => {
  receicveIPCMsg(event, arg.count, arg.command);  	
})


var sendIPCresp = function(event, count, data)
{
  event.sender.send('done-ipc'+count, data)
}

var sendIPCBroadcast = function(data) {
  mainWindow.webContents.send('statusipc', data)
}

var sendConsole = function(data)
{
  var param = {};
  param['command'] = 'console';
  param['params'] = data;
  sendIPCBroadcast(param)
}

var sendLinter = function(data)
{
  var param = {};
  param['command'] = 'linter';
  param['params'] = data;
  sendIPCBroadcast(param)
}


var sendProgress = function(data)
{
  var param = {};
  param['command'] = 'progress';
  param['params'] = data;
  sendIPCBroadcast(param)
}

app.on('ready', () => {

	initArduinoPath();

    if (os.platform() === 'darwin') {
    	Menu.setApplicationMenu(menu);
	}

	mainWindow = new BrowserWindow({
	  height: 768,
	  width: 1024,
      minHeight: 637,
  	  minWidth: 816
	});
	// mainWindow.openDevTools();

    mainWindow.on('close', function(e){
        app.quit();
    });


  mainWindow.loadURL('file://' + __dirname + '/index.html');

});


app.on('will-quit', () => {
  //globalShortcut.unregisterAll()
})


app.on('window-all-closed', () => {
	app.quit();
})

var menu = Menu.buildFromTemplate([
  {
    label: 'File',
    submenu: [
      {label: 'About App', selector: 'orderFrontStandardAboutPanel:'},
      {label: 'Open', accelerator: 'CmdOrCtrl+O', click: function() {sendIPCBroadcast({command: 'openfile'})}},  
      {label: 'Save', accelerator: 'CmdOrCtrl+S', click: function() {sendIPCBroadcast({command: 'savefile'})}},    
      {label: 'Save As',click: function() {sendIPCBroadcast({command: 'saveasfile'})}}, 
      {label: 'Toggle Sidebar', accelerator: 'CmdOrCtrl+T',click: function() {sendIPCBroadcast({command: 'togsidebar'})}}, 
      {label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      {label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
      {label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" },
      {label: 'Upload', accelerator: 'CmdOrCtrl+U', click: function() {sendIPCBroadcast({command: 'upload'})}},      
      {label: 'Debug',click: function() {mainWindow.openDevTools();}}, 
      {label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: function() {force_quit=true; app.quit();}}
    ]
  }]);
