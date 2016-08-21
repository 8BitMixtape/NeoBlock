
var CocoBlockly = CocoBlockly || {};

CocoBlockly.code = "";

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

CocoBlockly.tabClick = function(clickedName) {

  if (clickedName == 'blocks') {
    CocoBlockly.workspace.setVisible(true);
    document.getElementById("pane-blocks").className = "tab-pane active";
    document.getElementById("pane-xml").className = "tab-pane";    
    document.getElementById("pane-code").className = "tab-pane";
    document.getElementById("pane-console").className = "tab-pane";

    document.body.className = "simulator";
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
    if (params === '100'  ) {
      CocoBlockly.setProgressBar(0);
      //setTimeout(function(){CocoBlockly.setProgressBar(0); }, 250);
    }else {
      CocoBlockly.setProgressBar(params);              
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