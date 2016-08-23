const {app, BrowserWindow, globalShortcut} = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;

// var server = require('http').createServer();
// var io = require('socket.io')(server);
var io = require('socket.io')();

var exec = require('child_process').exec;



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
  console.log(exception);
});

var cocoUploadCode = function(fun) {

	var scriptName = "CocoTmp.ino";
    var tmpCompileDir = "/tmp/CocoTmpCompile";

    var uploadCmd = "/Users/xcorex/Documents/Arduino/hardware/CocoMake7/avr/tools/avrdude/macosx/avrdude -C/Users/xcorex/Documents/Arduino/hardware/CocoMake7/avr/tools/avrdude/macosx/avrdude.conf -pattiny85 -cusbasp -P/dev/cu.usbmodem1411 -b19200 -D -Uflash:w:" + tmpCompileDir + "/" + scriptName +  ".hex:i";

	sendToProgress({process: 'upload', progress:0});


    var child = exec(uploadCmd);

	child.stderr.on('data', function(data) {
        cocoServer.compilerBusy = 1;

        if (data.includes('Detecting CocoMidi')) {
			// sendToProgress('25');
			sendToProgress({process: 'upload', progress:25});
			// console.log("25");
		}   

        if (data.includes('Waiting for 10 seconds')) {
			sendToProgress({process: 'upload', progress:75});        	
			sendToProgress({process: 'upload_replug', progress:75});
			// console.log("75");
		}        

        if (data.includes('avrdude done.')) {
			sendToProgress({process: 'upload', progress:100});        	
			sendToProgress({process: 'upload_replug_done', progress:100});
			// console.log("100");
		}

		sendToConsole(data);
	});

	child.on('close', function() {
        cocoServer.compilerBusy = 0;		
		fun();
	});

}

var cocoCompileCode = function(code, fun) {

	var scriptName = "CocoTmp.ino";
    
    var tmpScriptDir = "/tmp/CocoTmp";
    var tmpScript = tmpScriptDir+path.sep+scriptName;

    var tmpCompileDir = "/tmp/CocoTmpCompile";
    var compileCmd = "/Users/xcorex/Downloads/Arduino-2.app/Contents/Java/arduino-builder -compile -logger=machine -hardware \"/Users/xcorex/Downloads/Arduino-2.app/Contents/Java/hardware\" -hardware \"/Users/xcorex/Library/Arduino15/packages\" -hardware \"/Users/xcorex/Documents/Arduino/hardware\" -tools \"/Users/xcorex/Downloads/Arduino-2.app/Contents/Java/tools-builder\" -tools \"/Users/xcorex/Downloads/Arduino-2.app/Contents/Java/hardware/tools/avr\" -tools \"/Users/xcorex/Library/Arduino15/packages\" -built-in-libraries \"/Users/xcorex/Downloads/Arduino-2.app/Contents/Java/libraries\" -libraries \"/Users/xcorex/Documents/Arduino/libraries\" -fqbn=CocoMake7:avr:cocomake -ide-version=10609 -build-path \"" + tmpCompileDir + "\" -warnings=none -prefs=build.warn_data_percentage=75 -verbose \"" + tmpScript + "\"";
    var uploadCmd = "/Users/xcorex/Documents/Arduino/hardware/CocoMake7/avr/tools/avrdude/macosx/avrdude -C/Users/xcorex/Documents/Arduino/hardware/CocoMake7/avr/tools/avrdude/macosx/avrdude.conf -pattiny85 -cusbasp -P/dev/cu.usbmodem1411 -b19200 -D -Uflash:w:" + tmpCompileDir + scriptName +  ".hex:i";

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

	sendToProgress({process: 'compile', progress:0});

    var child = exec(compileCmd);

    // console.log(compileCmd);

    
	child.stdout.on('data', function(data) {
		var m;	 

		if ((m = cocoServer.compileProgressRe.exec(data)) !== null) {
		    if (m.index === cocoServer.compileProgressRe.lastIndex) {
		        cocoServer.compileProgressRe.lastIndex++;
		    }
			sendToProgress({process: 'compile', progress:m[1]});
		}else{
			sendToConsole(data);
		}

	});

	child.on('close', function(code) {
	    console.log("compile done..");
		sendToProgress({process: 'compile', progress:100});
        cocoServer.compilerBusy = 0;
	    fun(code);
	});

}

var sendRpcResp = function(socket, callCounter, data) {
	socket.emit('doneRPC'+callCounter, data);
}


var sendBroadcast = function(data) {
	io.emit('statusRPC', data);
}

var sendToConsole = function(stdout) {
	var param = {};
	param['command'] = 'console';
	param['params'] = stdout;
	io.emit('statusRPC', param);
}

var sendToProgress = function(stdout) {
	var param = {};
	param['command'] = 'progress';
	param['params'] = stdout;
	io.emit('statusRPC', param);
}



var processRpcMsg = function(socket, callCounter, data) {	
	var command = data['command'];
	var params = data['params'];
	var response = {};

	switch (command) {
		case 'compile':
			if (cocoServer.compilerBusy) break;			
			cocoCompileCode(params, function(){
				response['compile'] = 'done';
				sendRpcResp(socket, callCounter, response);
			});
			break;
		case 'upload':
			if (cocoServer.compilerBusy) break;
			console.log("upload..");		
			cocoUploadCode(function(){
				sendToConsole("upload done..");
			})
			break;			
		default:
			break;
	}
}

io.on('connection', function(socket){
    socket.on('doRPC', function (callCounter, data) {
    		processRpcMsg(socket, callCounter, data);  
    });
});


io.origins('*:*'); //allow cors
io.listen(3000);

app.on('ready', () => {

	mainWindow = new BrowserWindow({
	  height: 768,
	  width: 1024,
      minHeight: 637,
  	  minWidth: 816
	});




  globalShortcut.register('CommandOrControl+T', () => {
    mainWindow.webContents.executeJavaScript("CocoBlockly.toggleSidebar()")
  })

  globalShortcut.register('CommandOrControl+U', () => {
    mainWindow.webContents.executeJavaScript("CocoBlockly.upload()")
  })

  globalShortcut.register('CommandOrControl+O', () => {
    mainWindow.webContents.executeJavaScript("CocoBlockly.openFile()")
  })

    // mainWindow.openDevTools();  
    mainWindow.loadURL('file://' + __dirname + '/index.html');

});


app.on('will-quit', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})
