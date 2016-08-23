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

	sendIPCProgress({process: 'upload', progress:0});


    var child = exec(uploadCmd);

	child.stderr.on('data', function(data) {
        cocoServer.compilerBusy = 1;

        if (data.includes('Detecting CocoMidi')) {
			// sendIPCProgress('25');
			sendIPCProgress({process: 'upload', progress:25});
			// console.log("25");
		}   

        if (data.includes('Waiting for 10 seconds')) {
			sendIPCProgress({process: 'upload', progress:75});        	
			sendIPCProgress({process: 'upload_replug', progress:75});
			// console.log("75");
		}        

        if (data.includes('AVR device initialized')) {
			sendIPCProgress({process: 'upload_replug_done', progress:100});
			// console.log("75");
		}    


        if (data.includes('avrdude done.')) {
			sendIPCProgress({process: 'upload', progress:100});        	
			// console.log("100");
		}

		sendIPCConsole(data);
	});

	child.on('close', function() {
        cocoServer.compilerBusy = 0;		
		fun();
	});

}

var cocoCompileCode = function(code, fun) {

	var arduinoAppPath = "/Users/xcorex/Downloads/Arduino-2.app";

	var scriptName = "CocoTmp.ino";
    
    var tmpScriptDir = "/tmp/CocoTmp";
    var tmpScript = tmpScriptDir+path.sep+scriptName;

    var tmpCompileDir = "/tmp/CocoTmpCompile";
    var compileCmd = arduinoAppPath + "/Contents/Java/arduino-builder -compile -logger=machine -hardware \"" + arduinoAppPath + "/Contents/Java/hardware\" -hardware \"/Users/xcorex/Library/Arduino15/packages\" -hardware \"/Users/xcorex/Documents/Arduino/hardware\" -tools \"" + arduinoAppPath +  "/Contents/Java/tools-builder\" -tools \"" + arduinoAppPath + "/Contents/Java/hardware/tools/avr\" -tools \"/Users/xcorex/Library/Arduino15/packages\" -built-in-libraries \"" + arduinoAppPath + "/Contents/Java/libraries\" -libraries \"/Users/xcorex/Documents/Arduino/libraries\" -fqbn=CocoMake7:avr:cocomake -ide-version=10609 -build-path \"" + tmpCompileDir + "\" -warnings=none -prefs=build.warn_data_percentage=75 -verbose \"" + tmpScript + "\"";

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

	sendIPCProgress({process: 'compile', progress:0});

    var child = exec(compileCmd);
    
	child.stdout.on('data', function(data) {
		var m;	 

		if ((m = cocoServer.compileProgressRe.exec(data)) !== null) {
		    if (m.index === cocoServer.compileProgressRe.lastIndex) {
		        cocoServer.compileProgressRe.lastIndex++;
		    }
			sendIPCProgress({process: 'compile', progress:m[1]});
		}else{
			sendIPCConsole(data);
		}

	});

	child.on('close', function(code) {
		sendIPCProgress({process: 'compile', progress:100});
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
				sendIPCConsole("upload done..");
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

var sendIPCConsole = function(data)
{
  var param = {};
  param['command'] = 'console';
  param['params'] = data;
  mainWindow.webContents.send('statusipc', param)
}


var sendIPCProgress = function(data)
{
  var param = {};
  param['command'] = 'progress';
  param['params'] = data;
  mainWindow.webContents.send('statusipc', param)
}



// require('electron').ipcRenderer.on('ping', (event, message) => {
//   console.log(message)  // Prints 'whoooooooh!'
// })


//io.origins('*:*'); //allow cors
//io.listen(3000);

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
	  // sendIPCConsole('dada');  	
  }, 2000)
});


app.on('will-quit', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})
