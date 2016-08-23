const {app, BrowserWindow, globalShortcut, Menu, ipcMain} = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;

var exec = require('child_process').exec;

// const menu = Menu.buildFromTemplate(template)
// Menu.setApplicationMenu(menu)


var cocoServer = {};

cocoServer.compilerBusy = 0;
cocoServer.progress = 0;
cocoServer.compileProgressRe = /===info \|\|\| Progress \{0\} \|\|\| \[(.*)\]/;

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
  // console.log(exception);
});

var cocoUploadCode = function(fun) {

	var scriptName = "CocoTmp.ino";
    var tmpCompileDir = "/tmp/CocoTmpCompile";

    var uploadCmd = "/Users/xcorex/Documents/Arduino/hardware/CocoMake7/avr/tools/avrdude/macosx/avrdude -C/Users/xcorex/Documents/Arduino/hardware/CocoMake7/avr/tools/avrdude/macosx/avrdude.conf -pattiny85 -cusbasp -P/dev/cu.usbmodem1411 -b19200 -D -Uflash:w:" + tmpCompileDir + "/" + scriptName +  ".hex:i";

	sendProgress({process: 'upload', progress:0});


    var child = exec(uploadCmd);

	child.stderr.on('data', function(data) {
        cocoServer.compilerBusy = 1;

        if (data.includes('Detecting CocoMidi')) {
			// sendProgress('25');
			sendProgress({process: 'upload', progress:25});
			// console.log("25");
		}   

        if (data.includes('Waiting for 10 seconds')) {
			sendProgress({process: 'upload', progress:75});        	
			sendProgress({process: 'upload_replug', progress:75});
			// console.log("75");
		}        

        if (data.includes('AVR device initialized')) {
			sendProgress({process: 'upload_replug_done', progress:100});
			// console.log("75");
		}    


        if (data.includes('avrdude done.')) {
			sendProgress({process: 'upload', progress:100});        	
			// console.log("100");
		}

		sendConsole(data);
	});

	child.on('close', function() {
        cocoServer.compilerBusy = 0;		
		fun();
	});

}

var cocoCompileCode = function(code, fun) {

	var arduinoAppPath = "/Users/xcorex/Downloads/Arduino-2.app";

	var scriptName = "CocoTmp.ino";
    
	var tmpSys = '/tmp/';
    var tmpScriptDir = tmpSys + path.sep + "CocoTmp";
    var tmpScript = tmpScriptDir + path.sep + scriptName;
    var tmpCompileDir = tmpSys + path.sep + "CocoTmpCompile";


    var arduinoBuilderPath = arduinoAppPath + "/Contents/Java/arduino-builder";

	var arduinoHwManager = '/Users/xcorex/Library/Arduino15/packages';
    var arduinoToolHwManager = '/Users/xcorex/Library/Arduino15/packages';

    var arduinoHwUserPath = '/Users/xcorex/Documents/Arduino/hardware';
    var arduinoUserLib = '/Users/xcorex/Documents/Arduino/libraries';

    var arduinoHwPath = arduinoAppPath + '/Contents/Java/hardware';
    var arduinoBuiltinLib = arduinoAppPath + '/Contents/Java/libraries';
    var arduinoToolbuilder = arduinoAppPath +  '/Contents/Java/tools-builder';
    var arduinoToolAvr = arduinoAppPath + '/Contents/Java/hardware/tools/avr';

    var arduinoBuiltPath = tmpCompileDir;
	var arduinoScriptPath = tmpScript;


	var quote = function(str)
	{
		return '"' + str + '"';
	}

    var build_opt = [
    	['-compile'],
    	['-logger=machine'],
    	['-hardware', quote(arduinoHwPath)],
    	['-hardware',quote(arduinoHwManager)],
    	['-hardware',quote(arduinoHwUserPath)],
    	['-tools',quote(arduinoToolbuilder)],
    	['-tools',quote(arduinoToolAvr)],
    	['-tools',quote(arduinoToolHwManager)],
    	['-built-in-libraries',quote(arduinoBuiltinLib)],
    	['-libraries',quote(arduinoUserLib)],    	
    	['-fqbn=CocoMake7:avr:cocomake'],
    	['-ide-version=10609'],
    	['-build-path',quote(arduinoBuiltPath)],
    	['-warnings=none'],
    	['-prefs=build.warn_data_percentage=75'],
    	['-verbose'],
    	[quote(arduinoScriptPath)]
    ]


	var arrayLength = build_opt.length;
	var command = "";

	for (var i = 0; i < arrayLength; i++) {
	    build_opt[i] = build_opt[i].join(' ');
	}

    var build_command = arduinoBuilderPath + ' ' + build_opt.join(' ');


    cocoServer.compilerBusy = 1;

    if (!fileExists(tmpScriptDir))
    {
		fs.mkdirSync(tmpScriptDir);
    }


    if(!fileExists(tmpCompileDir))
    {
		fs.mkdirSync(tmpCompileDir);
    }


    fs.writeFileSync(tmpScript, code);

	sendProgress({process: 'compile', progress:0});

    var child = exec(build_command);
    
	child.stdout.on('data', function(data) {
		var m;	 

		if ((m = cocoServer.compileProgressRe.exec(data)) !== null) {
		    if (m.index === cocoServer.compileProgressRe.lastIndex) {
		        cocoServer.compileProgressRe.lastIndex++;
		    }
			sendProgress({process: 'compile', progress:m[1]});
		}else{
			sendConsole(data);
		}

	});

	child.on('close', function(code) {
		sendProgress({process: 'compile', progress:100});
        cocoServer.compilerBusy = 0;
	    fun(code);
	});

}



var processIPCMsg = function(event, count, data) {	

	var command = data['command'];
	var params = data['params'];
	var response = {};

	switch (command) {
		case 'compile':
			if (cocoServer.compilerBusy) break;			
			cocoCompileCode(params, function(){
				response['compile'] = 'done';
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
  mainWindow.webContents.send('statusipc', param)
}

var sendConsole = function(data)
{
  var param = {};
  param['command'] = 'console';
  param['params'] = data;
  mainWindow.webContents.send('statusipc', param)
}


var sendProgress = function(data)
{
  var param = {};
  param['command'] = 'progress';
  param['params'] = data;
  mainWindow.webContents.send('statusipc', param)
}

app.on('ready', () => {

	mainWindow = new BrowserWindow({
	  height: 768,
	  width: 1024,
      minHeight: 637,
  	  minWidth: 816
	});

  // globalShortcut.register('CommandOrControl+T', () => {
  //   mainWindow.webContents.executeJavaScript("CocoBlockly.toggleSidebar()")
  // })

  // globalShortcut.register('CommandOrControl+U', () => {
  //   mainWindow.webContents.executeJavaScript("CocoBlockly.upload()")
  // })

  // globalShortcut.register('CommandOrControl+O', () => {
  //   mainWindow.webContents.executeJavaScript("CocoBlockly.openFile()")
  // })

  mainWindow.loadURL('file://' + __dirname + '/index.html');
  setTimeout(function(){
	  // sendConsole('dada');  	
  }, 2000)
});


app.on('will-quit', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})
