var CocoBlockly = CocoBlockly || {};

const {app, dialog} = require('electron').remote
var remote = require('electron').remote;
var fs = remote.require('fs')

const Configstore = remote.require('configstore');
const conf = new Configstore("cocoblock");

CocoBlockly.code = "";

CocoBlockly.config = {
  showSidebar : 1,
  currentMode : 'block',
  currentFile : '_blank',
  defaultTitle: 'CocoBlock for CocoMake7',
  modified: 0,
  newFile: 0,
  linter: []
}

CocoBlockly.PREV_ARDUINO_CODE_ = ""
CocoBlockly.PREV_XML_CODE_ = ""

CocoBlockly.quit = function()
{
  app.quit();
}

CocoBlockly.saveSettings = function()
{
    var newpath = document.getElementById("txt-arduino-path").value;
    conf.set('arduinopath', newpath)
    CocoBlockly.ipcSetPath(newpath);
}

CocoBlockly.ipc = {};
CocoBlockly.ipc.ipcRenderer = require('electron').ipcRenderer
CocoBlockly.ipc.globalCounter = 0

CocoBlockly.ipc.ipcRenderer.on('statusipc', (event, message) => {
  CocoBlockly.ipc.processIpcBroadcast(message)
})

CocoBlockly.ipc.processIpcBroadcast = function(data)
{ 
var command = data['command'];
var params = data['params'];

switch (command) {
  case 'openfile':
  CocoBlockly.openFile();
  break;    
  case 'saveasfile':
  CocoBlockly.saveAsFile();  
  break;  
  case 'savefile':
  CocoBlockly.saveFile();  
  break;  
  case 'upload':
  CocoBlockly.upload();  
  break; 
  case 'togsidebar':
  CocoBlockly.toggleSidebar();  
  break; 

  case 'linter':

    CocoBlockly.CodeMirror.operation(function(){
      for (var i = 0; i < CocoBlockly.config.linter.length; ++i)
        CocoBlockly.CodeMirror.removeLineWidget(CocoBlockly.config.linter[i]);
      CocoBlockly.config.linter.length = 0;
    })

    for (var i = 0; i < params.length; ++i) {
      var err = params[i];
      var msg = document.createElement("div");
      // var icon = msg.appendChild(document.createElement("span"));
      // icon.innerHTML = "!!";
      // icon.className = "lint-error-icon";
      msg.appendChild(document.createTextNode(err.desc));
      msg.className = "lint-error";
      CocoBlockly.config.linter.push(CocoBlockly.CodeMirror.addLineWidget(err.line - 1, msg, {coverGutter: false, noHScroll: true}));
    }



    break;
  case 'console':
    CocoBlockly.CodeMirrorConsole.replaceRange(params, {line: Infinity});
    CocoBlockly.CodeMirrorConsole.setCursor(CocoBlockly.CodeMirrorConsole.lastLine());
    break;
  case 'progress':

    if (params.process === 'compile')
    {
      if (typeof(CocoBlockly.notify) === 'undefined' || params.progress === 0)
      {
        CocoBlockly.notify = $.notify('<strong>Compiling</strong> please wait...', {
          allow_dismiss: false,
          showProgressbar: true,
          delay: 0,
          type: 'warning'
        });
      }else{
        CocoBlockly.notify.update({'type': 'warning', 'progress': params.progress});
        CocoBlockly.notify.close();
      }

      if(params.error === 'true')
      {
        $.notify('<strong>Error</strong> compile, check code view',{type: 'danger'})
      }

    }

    if (params.process === 'upload_replug')
    {
        CocoBlockly.upload_replug = $.notify({
          message: "Please replug CocoMake7",
        },{
          delay: 10000,
          showProgressbar: true,
          allow_dismiss: false
        });
    }

    if (params.process === 'upload_replug_done')
    {
        CocoBlockly.upload_replug.close();
        CocoBlockly.notifyupload = $.notify({message: "Upload done.."}, {delay : 500});
    }

    break;
  default:
    break;
}
}

CocoBlockly.ipc.sendBasicIpc = function(cmd, fun)
{
 var localCallCounter = ++CocoBlockly.ipc.globalCounter;
 CocoBlockly.ipc.ipcRenderer.once('done-ipc' + localCallCounter, function (event, data) {
     fun ( data );
 });
 CocoBlockly.ipc.ipcRenderer.send('do-ipc', {count: localCallCounter, command: cmd});
}


CocoBlockly.ipc.sendParam = function (cmd, param, fun)
{
  var command = {command: cmd};
  command.params = param;
  CocoBlockly.ipc.sendBasicIpc(command, fun);
}

CocoBlockly.ipcUploadCode = function(code, fun)
{
  CocoBlockly.ipc.sendParam('upload', '', fun);
}

CocoBlockly.ipcCompileCode = function(code, fun)
{
  CocoBlockly.ipc.sendParam('compile', code, fun);
}

CocoBlockly.ipcSetTitle = function(title)
{
  CocoBlockly.ipc.sendParam('settitle', title, function(){});
}

CocoBlockly.ipcSetPath = function(path)
{
  CocoBlockly.ipc.sendParam('setpath', {arduinopath: path}, function(){});
}


CocoBlockly.upload = function()
{
  CocoBlockly.CodeMirrorConsole.getDoc().setValue("");
  CocoBlockly.ipcCompileCode(CocoBlockly.code, function(status){
    if(status.compile === 'done')
    {
       $.notify("Compile succeed..",{type: 'success'})
      CocoBlockly.CodeMirrorConsole.getDoc().setValue("");
      CocoBlockly.ipc.sendParam('upload', '', function(){
        console.log('upload done..');
      });      
    }else{
       $.notify("Upload aborted..")
    }
  });
}

CocoBlockly.compile = function()
{
  CocoBlockly.CodeMirrorConsole.getDoc().setValue("");
  CocoBlockly.ipcCompileCode(CocoBlockly.code, function(status){
    if(status.compile === 'done') $.notify("Compile succeed..",{type: 'success'})
  });
}

CocoBlockly.setDocTitle = function(docname)
{
      CocoBlockly.ipcSetTitle(docname + ' - ' + CocoBlockly.config.defaultTitle)
}

CocoBlockly.setDefTitle = function(docname)
{
      CocoBlockly.ipcSetTitle('Untitled.cblock - ' + CocoBlockly.config.defaultTitle)
}

CocoBlockly.openFile = function() {
  
  var file = dialog.showOpenDialog({
    title: "Open CocoBlock file",
    defaultPath: "",
    filters: [
      {name: 'CocoBlock', extensions: ['cblock']},
    ]
  });
  
  var filename = file[0];
  
  fs.readFile(filename, 'utf8', function (err,xml_data) {
  
    if (err) {
      return console.log(err);
    }
    CocoBlockly.config.newFile = 1

    CocoBlockly.workspace.clear();
    var xml = Blockly.Xml.textToDom(xml_data);
    Blockly.Xml.domToWorkspace(CocoBlockly.workspace, xml);
    // $.notify("File loaded..")

    CocoBlockly.config.currentFile = filename;
    CocoBlockly.setDocTitle(filename)
  });

}

CocoBlockly.newFile = function() {
    CocoBlockly.config.currentFile = '_blank'
    CocoBlockly.config.newFile = 1
    CocoBlockly.config.modified = 0
    CocoBlockly.workspace.clear();
    CocoBlockly.setDefTitle();
}

CocoBlockly.exportFile = function() {
    var filename = dialog.showSaveDialog({
    title: "Save as Arduino File",
    defaultPath: "",
    filters: [
      {name: 'Arduino .ino', extensions: ['ino']},
    ]
  });

  var export_info = ""
  
  if (CocoBlockly.config.currentFile !== '_blank')
  {
     export_info = "// CocoMake7 code exported from " + CocoBlockly.config.currentFile + "\n\n"
  }

  fs.writeFileSync(filename, export_info + CocoBlockly.code);
  $.notify("Code export done..")
}

CocoBlockly.saveFile = function() {
  if (CocoBlockly.config.currentFile !== '_blank')
  {
      fs.writeFileSync(CocoBlockly.config.currentFile, CocoBlockly.xml);
      $.notify("File updated..")
      CocoBlockly.setDocTitle(CocoBlockly.config.currentFile)
      CocoBlockly.config.modified = 0
  }else{
    CocoBlockly.saveAsFile();
  }

}

CocoBlockly.saveAsFile = function() {
  var filename = dialog.showSaveDialog({
    title: "Save as CocoBlock file",
    defaultPath: "",
    filters: [
      {name: 'CocoBlock', extensions: ['cblock']},
    ]
  });

  fs.writeFileSync(filename, CocoBlockly.xml);
  $.notify("File saved..")

  CocoBlockly.config.currentFile = filename
  CocoBlockly.config.modified = 0

  CocoBlockly.setDocTitle(filename)
}

CocoBlockly.isRunningElectron = function() {
  return navigator.userAgent.toLowerCase().indexOf('cocoblock') > -1;
};

CocoBlockly.clearWorkspace = function() {
    CocoBlockly.workspace.clear();
}

CocoBlockly.executeBlockCode = function() {
  var code = Blockly.Arduino.workspaceToCode(CocoBlockly.workspace);
  console.log('play');
}
        
CocoBlockly.generateCode = function(event) {
  var arduinoCode = Blockly.Arduino.workspaceToCode(CocoBlockly.workspace)
  var xmlCode = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(CocoBlockly.workspace))

  CocoBlockly.code = arduinoCode;
  CocoBlockly.xml  = xmlCode;

  CocoBlockly.CodeMirrorXML.getDoc().setValue(xmlCode)

  if (xmlCode !== CocoBlockly.PREV_XML_CODE_)
  {
    if (CocoBlockly.config.currentFile !== '_blank')
    {
      if(CocoBlockly.config.newFile === 1)
      {
        CocoBlockly.config.newFile = 0;
      }else{
        CocoBlockly.setDocTitle('* ' + CocoBlockly.config.currentFile)
        CocoBlockly.config.modified = 1;
      }

    }
    CocoBlockly.PREV_XML_CODE_ = CocoBlockly.xml
  }

  if (arduinoCode !== CocoBlockly.PREV_ARDUINO_CODE_)
  {
    CocoBlockly.CodeMirror.getDoc().setValue(CocoBlockly.code)
    CocoBlockly.CodeMirrorPreview.getDoc().setValue(CocoBlockly.code)
    CocoBlockly.PREV_ARDUINO_CODE_ = CocoBlockly.code
  }

  return arduinoCode;
}


CocoBlockly.prompt = function(message, opt_defaultInput, opt_callback)
{
 var prompt_alert = alertify.prompt( 
    'CocoBlock', message, opt_defaultInput, 
    function(evt, val){
      opt_callback(val)
    },
    function(){}
  )

 prompt_alert.set({
    'pinnable': false,
    'modal': false,
    'transition' : 'fade',
    'oncancel' : function(){}
  });

}


CocoBlockly.hideSidebar = function()
{
  document.getElementById("simulator").style.display = "none";
  Blockly.svgResize(CocoBlockly.workspace);
}

CocoBlockly.showSidebar = function()
{
  document.getElementById("simulator").style.display = "block";
  Blockly.svgResize(CocoBlockly.workspace);
}

CocoBlockly.toggleSidebar = function()
{
  if (CocoBlockly.config.currentMode === 'block')
  {    
    if (CocoBlockly.config.showSidebar)
    {
      CocoBlockly.config.showSidebar = 0;
      document.body.className = "";
    }else{
      CocoBlockly.config.showSidebar = 1;
      document.body.className = "simulator";
    }
    Blockly.svgResize(CocoBlockly.workspace);    
  }
  
  CocoBlockly.CodeMirrorPreview.refresh()
}

CocoBlockly.tabClick = function(clickedName) {
  
  CocoBlockly.config.currentMode = 'nonblock';

  if (clickedName == 'blocks') {
    CocoBlockly.config.currentMode = 'block';
    CocoBlockly.workspace.setVisible(true);
    document.getElementById("pane-blocks").className = "tab-pane active";
    document.getElementById("pane-xml").className = "tab-pane";    
    document.getElementById("pane-code").className = "tab-pane";
    document.getElementById("pane-console").className = "tab-pane";

    if (CocoBlockly.config.showSidebar)
    {
      document.body.className = "simulator";
    }
  }

  if (clickedName == 'code') {
    CocoBlockly.workspace.setVisible(false);
    document.getElementById("pane-blocks").className = "tab-pane";
    document.getElementById("pane-xml").className = "tab-pane";    
    document.getElementById("pane-code").className = "tab-pane active";
    document.getElementById("pane-console").className = "tab-pane";

    document.body.className = "";

  }

  if (clickedName == 'xml') {
    CocoBlockly.workspace.setVisible(false);
    document.getElementById("pane-blocks").className = "tab-pane";
    document.getElementById("pane-code").className = "tab-pane";
    document.getElementById("pane-xml").className = "tab-pane active";
    document.getElementById("pane-console").className = "tab-pane";

    document.body.className = "";
  }


  if (clickedName == 'console') {
    CocoBlockly.workspace.setVisible(false);
    document.getElementById("pane-blocks").className = "tab-pane";
    document.getElementById("pane-code").className = "tab-pane";
    document.getElementById("pane-xml").className = "tab-pane";
    document.getElementById("pane-console").className = "tab-pane active";

    document.body.className = "";
  }

};


CocoBlockly.setProgressBar = function(value) {
  $('.progress-bar').css('width', value+'%').attr('aria-valuenow', value);
}

CocoBlockly.initAll = function() {


    CocoBlockly.toolBox = document.getElementById('ArduBlocklyToolbox');
    
    CocoBlockly.workspace = Blockly.inject('blocklyDiv',
    {
        css: false,
        toolbox: CocoBlockly.toolBox,
        media: 'blockly/',
            grid: {
                spacing: 25,
                length: 3,
                colour: "#ddd",
                snap: !0
            },
            zoom: {
                controls: !0,
                wheel: !1,
                startScale: 1,
                maxScale: 3,
                minScale: .3,
                scaleSpeed: 1.2
            },
            trashcan: true
    });

    // var xml = Blockly.Xml.textToDom(xml_text);
    var defaultBlocks = document.getElementById('CocoBlockInitial');
    Blockly.Xml.domToWorkspace(CocoBlockly.workspace, defaultBlocks);

    CocoBlockly.CodeMirror = CodeMirror.fromTextArea(document.getElementById("codeDiv"), 
    {
      lineNumbers: true,
      lineWrapping: true,
      readOnly: true,
      mode: "text/x-c++src"
    });


    CocoBlockly.CodeMirrorPreview = CodeMirror.fromTextArea(document.getElementById("codePreviewDiv"), 
    {
      lineNumbers: true,
      lineWrapping: true,
      readOnly: true,
      mode: "text/x-c++src"
    });


    CocoBlockly.CodeMirrorXML = CodeMirror.fromTextArea(document.getElementById("xmlCodeDiv"), 
    {
      lineNumbers: true,
      lineWrapping: true,
      readOnly: true,
      mode: "application/xml"
    });

    CocoBlockly.CodeMirrorConsole = CodeMirror.fromTextArea(document.getElementById("consoleDiv"), 
    {
      lineNumbers: true,
      lineWrapping: true,
      readOnly: true,
      mode: "application/xml"
    });
                              
    CocoBlockly.workspace.addChangeListener(CocoBlockly.generateCode);

    document.getElementById("btn-mode-blocks").onclick = function(){CocoBlockly.tabClick('blocks')};
    document.getElementById("btn-mode-code").onclick = function(){CocoBlockly.tabClick('code')};
    document.getElementById("btn-mode-xml").onclick = function(){CocoBlockly.tabClick('xml')};
    document.getElementById("btn-mode-console").onclick = function(){CocoBlockly.tabClick('console')};
    document.getElementById("btn-mode-compile").onclick = function(){CocoBlockly.compile()};
    document.getElementById("btn-mode-upload").onclick = function(){CocoBlockly.upload()};


    var svgresize = function() {
        Blockly.svgResize(CocoBlockly.workspace);
    }

    Split(['#main', '#simulator'], {
        sizes: [71, 29],
        minSize: 200,
        onDragEnd: svgresize
    });


    // Original signature: function(message, opt_defaultInput, opt_callback)
    Blockly.prompt = CocoBlockly.prompt;

    CocoBlockly.newFile();
    
    document.getElementById("txt-arduino-path").value = conf.get('arduinopath')        

}
