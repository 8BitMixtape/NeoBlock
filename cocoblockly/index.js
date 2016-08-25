const {app, BrowserWindow, globalShortcut, Menu, ipcMain} = require('electron');
const fs = require('fs');
const path = require('path');
const os = require('os');
const storage = require('electron-json-storage');

let mainWindow;
var exec = require('child_process').exec;

if (os.platform() == "win32") {
    app.setPath("appData", process.env.LOCALAPPDATA);
    app.setPath("userData", path.join(process.env.LOCALAPPDATA, app.getName()));
}


var cocoServer = {};

cocoServer.compilerBusy = 0;
cocoServer.progress = 0;
cocoServer.compileProgressRe = /.*Progress \{0\} \|\|\| \[(.*)\]/;

cocoServer.arduino_paths_osx = [
						"/Users/xcorex/Downloads/Arduino-2.app",
						"/Applications/Arduino.app",
						app.getAppPath() + '/' + 'Arduino.app'
					]
					
cocoServer.arduino_paths_win = [
						"c:\\Program Files (x86)\\Arduino",
						"c:\\Program Files\\Arduino",
						app.getAppPath() + '/' + 'Arduino'
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

    var docDir = app.getPath('documents');
    var appDataDir = app.getPath('appData');
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
    	
    	var cocomakepath = appDataDir + '/../Arduino15/packages/CocoMake7/hardware/avr'

    	var latest_ver = getLatestVer(cocomakepath)

	    cocoServer.arduinoPath = {
	    	scriptName   : scriptName,
			tmpScriptDir : tmpScriptDir,
			tmpScript  	 : tmpScript,
			tmpCompileDir: tmpCompileDir,
			appPath 	 : arduinoAppPath,
			hwManager 	 : appDataDir + '/../Arduino15/packages',
		    toolHwManager: appDataDir + '/../Arduino15/packages',
		    hwUserPath 	 : docDir + '/Arduino/hardware',
		    userLib 	 : docDir + '/Arduino/libraries',
		    builderPath  : arduinoAppPath + '/Contents/Java/arduino-builder',
		    hwPath 		 : arduinoAppPath + '/Contents/Java/hardware',
		    builtinLib 	 : arduinoAppPath + '/Contents/Java/libraries',
		    toolbuilder  : arduinoAppPath + '/Contents/Java/tools-builder',
		    toolAvr 	 : arduinoAppPath + '/Contents/Java/hardware/tools/avr',
		    builtPath 	 : tmpCompileDir,
			scriptPath 	 : tmpScript,
			cocoMakePath : cocomakepath + path.sep + latest_ver,
			cocoMakeAvrdudePath : cocomakepath + path.sep + latest_ver + path.sep + 'tools/avrdude/macosx',

		}

    }else if (os.platform() === 'win32') {

    	var cocomakepath = appDataDir + '\\Arduino15\\packages\\CocoMake7\\hardware\\avr\\'

    	var latest_ver = getLatestVer(cocomakepath)

	    cocoServer.arduinoPath = {
	    	scriptName   : scriptName,	    	
			tmpScriptDir : tmpScriptDir,
			tmpScript  	 : tmpScript,
			tmpCompileDir: tmpCompileDir,			
			appPath 	 : arduinoAppPath,
			hwManager 	 : appDataDir + '\\Arduino15\\packages',
		    toolHwManager: appDataDir + '\\Arduino15\\packages',
		    hwUserPath 	 : docDir + "\\Arduino\\hardware\\",
		    userLib 	 : docDir + "\\Arduino\\libraries",
		    builderPath  : arduinoAppPath + '\\arduino-builder',
		    hwPath 		 : arduinoAppPath + '\\hardware',
		    builtinLib 	 : arduinoAppPath + '\\libraries',
		    toolbuilder  : arduinoAppPath + '\\tools-builder',
		    toolAvr 	 : arduinoAppPath + '\\hardware\\tools\\avr',
		    builtPath 	 : tmpCompileDir,
			scriptPath 	 : tmpScript,
			cocoMakePath : cocomakepath + path.sep + latest_ver,
			cocoMakeAvrdudePath : cocomakepath + path.sep + latest_ver + path.sep + 'tools\\avrdude\\windows',
		}    
    }else if (os.platform() === 'linux') {

    	appDataDir = app.getPath('home')

    	var cocomakepath = appDataDir + '/.arduino15/packages/CocoMake7/hardware/avr'

    	var latest_ver = getLatestVer(cocomakepath)

	    cocoServer.arduinoPath = {
	    	scriptName   : scriptName,
			tmpScriptDir : tmpScriptDir,
			tmpScript  	 : tmpScript,
			tmpCompileDir: tmpCompileDir,
			appPath 	 : arduinoAppPath,
			hwManager 	 : appDataDir + '/.arduino15/packages',
		    toolHwManager: appDataDir + '/.arduino15/packages',
		    hwUserPath 	 : docDir + '/Arduino/hardware',
		    userLib 	 : docDir + '/Arduino/libraries',
		    builderPath  : arduinoAppPath + '/arduino-builder',
		    hwPath 		 : arduinoAppPath + '/hardware',
		    builtinLib 	 : arduinoAppPath + '/libraries',
		    toolbuilder  : arduinoAppPath + '/tools-builder',
		    toolAvr 	 : arduinoAppPath + '/hardware/tools/avr',
		    builtPath 	 : tmpCompileDir,
			scriptPath 	 : tmpScript,
			cocoMakePath : cocomakepath + path.sep + latest_ver,
			cocoMakeAvrdudePath : cocomakepath + path.sep + latest_ver + path.sep + 'tools/avrdude/macosx',

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
    			
    			storage.set('coco_settings', { arduinopath: path }, function(error) {
			      if (error) throw error;
			    });

	    		break;
	    	}
	}
}

var initArduinoPath = function() {

    storage.get('coco_settings', function(error, data) {
      if (typeof(data.arduinopath) !== 'undefined' && data.arduinopath !== '')
      {
      	console.log('set path', data.arduinopath)
		setArduinoFolder(data.arduinopath, "CocoTmp");

      }else {
	    if (os.platform() === 'darwin')
	    {    	
	    	setArduinoFolderFromList(cocoServer.arduino_paths_osx)
	    }else if (os.platform() === 'win32') {
	    	setArduinoFolderFromList(cocoServer.arduino_paths_win)
	    }
      }

      // if (typeof(data.arduinopath) !== 'undefined' && data.cocomakepath !== '')
      // {

      // 	var avrdude_path = "tools/avrdude/macosx";
      // 	if (os.platform() === 'win32') avrdude_path = 'tools\\avrdude\\windows'

      // 	cocoServer.arduinoPath.cocoMakePath = data.cocomakepath
      // 	cocoServer.arduinoPath.cocoMakeAvrdudePath = data.cocomakepath + path.sep + avrdude_path,
      // }


    });


}

var cocoUploadCode = function(fun) {

    var uploadCmd = '"' + cocoServer.arduinoPath.cocoMakeAvrdudePath + path.sep + "avrdude\" -C\"" + cocoServer.arduinoPath.cocoMakeAvrdudePath  + path.sep + "avrdude.conf\" -pattiny85 -cusbasp -D -Uflash:w:" + cocoServer.arduinoPath.builtPath + path.sep + cocoServer.arduinoPath.scriptName +  ".ino.hex:i";

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
    	['-libraries',quote(cocoServer.arduinoPath.userLib)],    	
    	['-fqbn=CocoMake7:avr:cocomake'],
    	['-ide-version=10606'],
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
			sendConsole("\n--------- error --------\n\n");	
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

	child.stdout.on('data', function(data) {
		var m;	 
		if ((m = cocoServer.compileProgressRe.exec(data)) !== null) {
		    if (m.index === cocoServer.compileProgressRe.lastIndex) {
		        cocoServer.compileProgressRe.lastIndex++;
		    }
			sendProgress({process: 'compile', progress:m[1]});
		};
		// }else{
			sendConsole(data);
		// }
	});

	child.on('close', function(code) {
		sendLinter(cocoServer.compile.errorLint);
		
		var isErr = 'false';

		if (cocoServer.compile.errorLint.length > 0) isErr = 'true';

		cocoServer.compile.errorLint.length = 0;

		sendProgress({process: 'compile', error: isErr, progress:100});
        cocoServer.compilerBusy = 0;

        if(isErr !== 'true')
	    {
	    	fun(code);
	    }else{
		    funerr();
	    }

	});

}



var processIPCMsg = function(event, count, data) {	

	var command = data['command'];
	var params = data['params'];
	var response = {};
			console.log(data)

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
  processIPCMsg(event, arg.count, arg.command);  	
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
    Menu.setApplicationMenu(menu);

	mainWindow = new BrowserWindow({
	  height: 768,
	  width: 1024,
      minHeight: 637,
  	  minWidth: 816
	});

  mainWindow.loadURL('file://' + __dirname + '/index.html');

});


app.on('will-quit', () => {
  globalShortcut.unregisterAll()
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

      {label: 'Upload', accelerator: 'CmdOrCtrl+U', click: function() {sendIPCBroadcast({command: 'upload'})}},      
      {label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: function() {force_quit=true; app.quit();}}
    ]
  }]);
