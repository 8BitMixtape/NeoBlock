
var CocoBlockly = CocoBlockly || {};

const {dialog} = require('electron').remote
var remote = require('electron').remote;
var fs = remote.require('fs')

CocoBlockly.code = "";

CocoBlockly.config = {
  showSidebar : 1,
  currentMode : 'block',
  currentFile : ''
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
  
  CocoBlockly.workspace.clear();
  var xml = Blockly.Xml.textToDom(xml_data);
  Blockly.Xml.domToWorkspace(CocoBlockly.workspace, xml);
  $.notify("File loaded..")

  });

}


CocoBlockly.saveAsFile = function() {
  var file = dialog.showSaveDialog({
    title: "Save as CocoBlock file",
    defaultPath: "",
    filters: [
      {name: 'CocoBlock', extensions: ['cblock']},
    ]
  });


  var xmlDom = Blockly.Xml.workspaceToDom(CocoBlockly.workspace);
  var xmlText = Blockly.Xml.domToPrettyText(xmlDom);

  
  fs.writeFileSync(file, xmlText);

  $.notify("File saved..")

}

CocoBlockly.executeBlockCode = function() {
  var code = Blockly.Arduino.workspaceToCode(CocoBlockly.workspace);
  console.log('play');
}
        
CocoBlockly.myUpdateFunction = function(event) {
  var doc = CocoBlockly.CodeMirror.getDoc();
  var code = Blockly.Arduino.workspaceToCode(CocoBlockly.workspace)

  CocoBlockly.code = code;

  CocoBlockly.CodeMirror.getDoc().setValue(code)
  CocoBlockly.CodeMirrorPreview.getDoc().setValue(code)
  

  var xmlDom = Blockly.Xml.workspaceToDom(CocoBlockly.workspace);
  var xmlText = Blockly.Xml.domToPrettyText(xmlDom);


  CocoBlockly.CodeMirrorXML.getDoc().setValue(xmlText)


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

CocoBlockly.rpc = {};
CocoBlockly.rpc.socket = io("http://localhost:3000");
CocoBlockly.rpc.globalCounter = 0;

CocoBlockly.rpc.processRpcBroadcast = function(data)
{ 
var command = data['command'];
var params = data['params'];

switch (command) {
  case 'console':
    // console.log(params);
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
          delay: 0
        });
      }else{
        CocoBlockly.notify.update({'type': 'success', 'progress': params.progress});
        CocoBlockly.notify.close();
      }
    }

    // if (params.process === 'upload')
    // {
    //   if (typeof(CocoBlockly.notifyupload) === 'undefined' || params.progress === 0)
    //   {
    //     CocoBlockly.notifyupload = $.notify('<strong>Uploading</strong> Do not unplug CocoMake7', {
    //       allow_dismiss: false,
    //       showProgressbar: true,
    //       delay:0
    //     });
    //   }else{
    //     if (params.progress === 100) setTimeout(function(){CocoBlockly.notifyupload.close()}, 500)
    //     CocoBlockly.notifyupload.update({'type': 'success', 'progress': params.progress});
    //   }
    // }


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
        // CocoBlockly.upload_replug.close();
        CocoBlockly.notifyupload = $.notify({message: "Upload done.."}, {delay : 500});
    }

    break;
  default:
    break;
}
}

CocoBlockly.rpc.socket.on('statusRPC', function(msg){
  CocoBlockly.rpc.processRpcBroadcast(msg);
});

CocoBlockly.rpc.sendBasicRpc = function(command, fun)
{
 var localCallCounter = ++CocoBlockly.rpc.globalCounter;
 CocoBlockly.rpc.socket.once('doneRPC' + localCallCounter, function (data) {
     fun ( data );
 });
 CocoBlockly.rpc.socket.emit('doRPC', localCallCounter, command);
}

CocoBlockly.rpc.sendRpcParam = function (cmd, param, fun)
{
  var command = {command: cmd};
  command.params = param;
  CocoBlockly.rpc.sendBasicRpc(command, fun);
}

CocoBlockly.rpcUploadCode = function(code, fun)
{
  CocoBlockly.rpc.sendRpcParam('upload', '', fun);
}

CocoBlockly.rpcCompileCode = function(code, fun)
{
  CocoBlockly.rpc.sendRpcParam('compile', code, fun);
}

CocoBlockly.upload = function()
{
  CocoBlockly.CodeMirrorConsole.getDoc().setValue("");
  CocoBlockly.rpcCompileCode(CocoBlockly.code, function(){
    CocoBlockly.CodeMirrorConsole.getDoc().setValue("");
    CocoBlockly.rpc.sendRpcParam('upload', '', function(){
      console.log('upload done..');
    });
  });
}

CocoBlockly.compile = function()
{
  CocoBlockly.CodeMirrorConsole.getDoc().setValue("");
  CocoBlockly.rpcCompileCode(CocoBlockly.code, function(){
    console.log('compile done..');
  });
}


window.addEventListener('load', function load(event) {
    window.removeEventListener('load', load, false);
    // var toolBox =  Blockly.Xml.textToDom(Ardublockly.TOOLBOX_XML);
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
                              
    CocoBlockly.workspace.addChangeListener(CocoBlockly.myUpdateFunction);

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


});