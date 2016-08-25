
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

var addJsScriptTag = function(script_str)
{
  var loader = document.createElement("script");
  loader.setAttribute("type", "text/javascript");
  loader.innerHTML = script_str;
  document.head.appendChild(loader);
}

var addJsScriptURLTag = function(url)
{
  var loader = document.createElement("script");
  loader.setAttribute("type", "text/javascript");
  loader.setAttribute("src", url);
  loader.innerHTML = url;
  document.head.appendChild(loader);
}

var addXMLScriptTag = function(id, xml_content)
{
  var loader = document.createElement("xml");
  loader.setAttribute("id", id);
  loader.innerHTML = xml_content;
  document.body.appendChild(loader);
}

CocoBlockly.updater = {};
CocoBlockly.updater.files = [
  {name: "cocoblock", local: "cocojs/cocoblock/cocoblock.js", url: "https://cocomake7.github.io/cocoblockly/cocojs/cocoblock/cocoblock.js", type: "js"},
  {name: "cocogen", local: "cocojs/cocoblock/cocogen.js", url: "https://cocomake7.github.io/cocoblockly/cocojs/cocoblock/cocogen.js", type: "js"}
]

CocoBlockly.updater.blockNeedUpdate = function(name, url, fun)
{
  if (typeof(conf.get(name)) === 'undefined')
  {
    fun()
  }else{
    CocoBlockly.updater.checkUpdateBlock(name, url, function(file){
    if(file.needupdate)
    {
      console.log(name, ' need update')
      fun()
    }
    })
  }
}

CocoBlockly.updater.updateBlock = function(file_name, url)
{
  CocoBlockly.updater.getUpdatedBlock(file_name, url, function(resp){
    console.log(file_name, ' updated')
    $.notify(file_name + ' updated')
    conf.set(file_name, resp)
  })
}

CocoBlockly.updater.updateNow = function()
{
    for (var i = 0; i < CocoBlockly.updater.files.length; ++i)
    {
      var name = CocoBlockly.updater.files[i].name;
      var url = CocoBlockly.updater.files[i].url;      
      CocoBlockly.updater.blockNeedUpdate(name, url, function(){
        CocoBlockly.updater.updateBlock(name, url);
      })
    }
}


CocoBlockly.updater.checkUpdateBlock = function(file_name, file_url, fun)
{
  var dateReq = new XMLHttpRequest();
  dateReq.onreadystatechange = function() {

  if (dateReq.readyState === 4) {
      if (dateReq.status === 200) {
              // // we already have the cache
              if (dateReq.getResponseHeader("Last-Modified") == conf.get(file_name).time) {
                  try {
                    fun({needupdate: false})
                  } catch(e) { // if something goes wrong
                    fun({needupdate: true})
                  }
              } else{
                // we have not
                  fun({needupdate: true})
              } 
          } else 
            fun({needupdate: true})
      }
  }

  dateReq.open("HEAD", file_url  + "?" + new Date().getTime()  , true);
  dateReq.send(null);
}

CocoBlockly.updater.getUpdatedBlock = function(file_name, file_url, fun)
{
  var builtReq = new XMLHttpRequest();

  builtReq.addEventListener('progress', function(e) {
        var complete = Math.round((e.loaded / 2500000) * 150);      
      }, false);

  builtReq.onreadystatechange = function() {
      if (builtReq.readyState === 4) {
          if (builtReq.status === 200) {
              try{
                  // console.log(builtReq.responseText)
                  var resp = {content: builtReq.responseText, time: builtReq.getResponseHeader("Last-Modified"), url: file_url};
                  // conf.set(file_name, resp)
                  fun(resp)
              }catch(e){
                  console.log(e);
              }
          } else {
              // alert("An error occured while loading the app. Retry later or mail us at info@pingendo.com");
          }
      }
  };
  builtReq.open("GET", file_url + "?" + new Date().getTime() , true);
  builtReq.send(null);

}

