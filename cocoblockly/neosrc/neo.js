var NeoBlockly = NeoBlockly || {};

const {app, dialog} = require('electron').remote
var remote = require('electron').remote;
var fs = remote.require('fs')
var path = remote.require('path')

const Configstore = remote.require('configstore');
const conf = new Configstore("NeoBlock");

NeoBlockly.code = "";

NeoBlockly.config = {
  showSidebar : 1,
  currentMode : 'block',
  currentFile : '_blank',
  defaultTitle: 'NeoBlock for CocoMake7',
  modified: 0,
  compiled: 0,
  newFile: 0,
  linter: []
}

NeoBlockly.PREV_ARDUINO_CODE_ = ""
NeoBlockly.PREV_XML_CODE_ = ""

NeoBlockly.quit = function()
{
  app.quit();
}

NeoBlockly.saveSettings = function()
{
    var newpath = document.getElementById("txt-arduino-path").value;
    conf.set('arduinopath', newpath)
    NeoBlockly.ipcSetPath(newpath);
}

NeoBlockly.ipc = {};
NeoBlockly.ipc.ipcRenderer = require('electron').ipcRenderer
NeoBlockly.ipc.globalCounter = 0

NeoBlockly.ipc.ipcRenderer.on('statusipc', (event, message) => {
  NeoBlockly.ipc.processIpcBroadcast(message)
})

NeoBlockly.ipc.processIpcBroadcast = function(data)
{ 
var command = data['command'];
var params = data['params'];

switch (command) {
  case 'openfile':
  NeoBlockly.openFile();
  break;    
  case 'saveasfile':
  NeoBlockly.saveAsFile();  
  break;  
  case 'savefile':
  NeoBlockly.saveFile();  
  break;  
  case 'upload':
  NeoBlockly.upload();  
  break; 
  case 'togsidebar':
  NeoBlockly.toggleSidebar();  
  break; 

  case 'linter':

    NeoBlockly.CodeMirror.operation(function(){
      for (var i = 0; i < NeoBlockly.config.linter.length; ++i)
        NeoBlockly.CodeMirror.removeLineWidget(NeoBlockly.config.linter[i]);
      NeoBlockly.config.linter.length = 0;
    })

    for (var i = 0; i < params.length; ++i) {
      var err = params[i];
      var msg = document.createElement("div");
      // var icon = msg.appendChild(document.createElement("span"));
      // icon.innerHTML = "!!";
      // icon.className = "lint-error-icon";
      msg.appendChild(document.createTextNode(err.desc));
      msg.className = "lint-error";
      NeoBlockly.config.linter.push(NeoBlockly.CodeMirror.addLineWidget(err.line - 1, msg, {coverGutter: false, noHScroll: true}));
    }



    break;
  case 'console':
    NeoBlockly.CodeMirrorConsole.replaceRange(params, {line: Infinity});
    NeoBlockly.CodeMirrorConsole.setCursor(NeoBlockly.CodeMirrorConsole.lastLine());
    break;
  case 'progress':

    if (params.process === 'compile')
    {
      if (typeof(NeoBlockly.notify) === 'undefined' || params.progress === 0)
      {
        NeoBlockly.notify = $.notify('<strong>Compiling</strong> please wait...', {
          allow_dismiss: false,
          showProgressbar: true,
          delay: 0,
          type: 'warning'
        });
      }else{
        NeoBlockly.notify.update({'type': 'warning', 'progress': params.progress});
        NeoBlockly.notify.close();
      }

      if(params.error === 'true')
      {
        $.notify('<strong>Error</strong> compile, check code view',{type: 'danger'})
      }

    }

    if (params.process === 'upload_replug')
    {
        NeoBlockly.upload_replug = $.notify({
          message: "Please replug CocoMake7",
        },{
          delay: 10000,
          showProgressbar: true,
          allow_dismiss: false
        });
    }

    if (params.process === 'upload_replug_done')
    {
        NeoBlockly.upload_replug.close();
        NeoBlockly.notifyupload = $.notify({message: "Upload done.."}, {delay : 500});
    }

    break;
  default:
    break;
}
}

NeoBlockly.ipc.sendBasicIpc = function(cmd, fun)
{
 var localCallCounter = ++NeoBlockly.ipc.globalCounter;
 NeoBlockly.ipc.ipcRenderer.once('done-ipc' + localCallCounter, function (event, data) {
     fun ( data );
 });
 NeoBlockly.ipc.ipcRenderer.send('do-ipc', {count: localCallCounter, command: cmd});
}


NeoBlockly.ipc.sendParam = function (cmd, param, fun)
{
  var command = {command: cmd};
  command.params = param;
  NeoBlockly.ipc.sendBasicIpc(command, fun);
}

NeoBlockly.ipcUploadCode = function(code, fun)
{
  NeoBlockly.ipc.sendParam('upload', '', fun);
}

NeoBlockly.ipcCompileCode = function(code, fun)
{
  NeoBlockly.ipc.sendParam('compile', code, fun);
}

NeoBlockly.ipcSetTitle = function(title)
{
  NeoBlockly.ipc.sendParam('settitle', title, function(){});
}

NeoBlockly.ipcSetPath = function(path)
{
  NeoBlockly.ipc.sendParam('setpath', {arduinopath: path}, function(){});
}


NeoBlockly.upload = function()
{
  if(NeoBlockly.config.compiled) {
      NeoBlockly.ipc.sendParam('upload', '', function(){
        console.log('upload done..');
      }); 

      return    
  }

  NeoBlockly.CodeMirrorConsole.getDoc().setValue("");
  NeoBlockly.ipcCompileCode(NeoBlockly.code, function(status){
    if(status.compile === 'done')
    {
      NeoBlockly.config.compiled = 1;
       $.notify("Compile succeed..",{type: 'success'})
      NeoBlockly.CodeMirrorConsole.getDoc().setValue("");
      NeoBlockly.ipc.sendParam('upload', '', function(){
        console.log('upload done..');
      });      
    }else{
       $.notify("Upload aborted..")
    }
  });
}

NeoBlockly.compile = function()
{
  NeoBlockly.CodeMirrorConsole.getDoc().setValue("");
  NeoBlockly.ipcCompileCode(NeoBlockly.code, function(status){
    if(status.compile === 'done') {
      $.notify("Compile succeed..",{type: 'success'})
      NeoBlockly.config.compiled = 1;
    }
  });
}

NeoBlockly.setDocTitle = function(docname)
{
      NeoBlockly.ipcSetTitle(docname + ' - ' + NeoBlockly.config.defaultTitle)
}

NeoBlockly.setDefTitle = function(docname)
{
      NeoBlockly.ipcSetTitle('Untitled.cblock - ' + NeoBlockly.config.defaultTitle)
}

NeoBlockly.openFile = function() {
  
  var file = dialog.showOpenDialog({
    title: "Open NeoBlock file",
    defaultPath: "",
    filters: [
      {name: 'NeoBlock', extensions: ['cblock']},
    ]
  });

  if (typeof(file) !== 'undefined')
  {
    var filename = file[0];

    fs.readFile(filename, 'utf8', function (err,xml_data) {
    
      if (err) {
        return console.log(err);
      }
      NeoBlockly.config.newFile = 1

      NeoBlockly.workspace.clear();
      var xml = Blockly.Xml.textToDom(xml_data);
      Blockly.Xml.domToWorkspace(NeoBlockly.workspace, xml);
      // $.notify("File loaded..")

      NeoBlockly.config.currentFile = filename;
      NeoBlockly.setDocTitle(filename)
    });    
  }
}

NeoBlockly.newFile = function() {
    NeoBlockly.config.currentFile = '_blank'
    NeoBlockly.config.newFile = 1
    NeoBlockly.config.modified = 0
    NeoBlockly.workspace.clear();
    NeoBlockly.setDefTitle();
}

NeoBlockly.exportFile = function() {
    var filename = dialog.showSaveDialog({
    title: "Save as Arduino File",
    defaultPath: "",
    filters: [
      {name: 'Arduino .ino', extensions: ['ino']},
    ]
  });

  var export_info = ""
  
  if (NeoBlockly.config.currentFile !== '_blank')
  {
     export_info = "// CocoMake7 code exported from " + NeoBlockly.config.currentFile + "\n\n"
  }

  fs.writeFileSync(filename, export_info + NeoBlockly.code);
  $.notify("Code export done..")
}

NeoBlockly.saveFile = function() {
  if (NeoBlockly.config.currentFile !== '_blank')
  {
      fs.writeFileSync(NeoBlockly.config.currentFile, NeoBlockly.xml);
      $.notify("File updated..")
      NeoBlockly.setDocTitle(NeoBlockly.config.currentFile)
      NeoBlockly.config.modified = 0
  }else{
    NeoBlockly.saveAsFile();
  }

}

NeoBlockly.saveAsFile = function() {
  var filename = dialog.showSaveDialog({
    title: "Save as NeoBlock file",
    defaultPath: "",
    filters: [
      {name: 'NeoBlock', extensions: ['cblock']},
    ]
  });
  if(typeof(filename) !== 'undefined')
  {
    fs.writeFileSync(filename, NeoBlockly.xml);
    $.notify("File saved..")
    NeoBlockly.config.currentFile = filename
    NeoBlockly.config.modified = 0
    NeoBlockly.setDocTitle(filename)
  }
}

NeoBlockly.isRunningElectron = function() {
  return navigator.userAgent.toLowerCase().indexOf('NeoBlock') > -1;
};

NeoBlockly.clearWorkspace = function() {
    NeoBlockly.workspace.clear();
}

NeoBlockly.executeBlockCode = function() {
  var code = Blockly.Arduino.workspaceToCode(NeoBlockly.workspace);
  console.log('play');
}
        
NeoBlockly.generateCode = function(event) {
  var arduinoCode = Blockly.Arduino.workspaceToCode(NeoBlockly.workspace)
  var xmlCode = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(NeoBlockly.workspace))

  NeoBlockly.code = arduinoCode;
  NeoBlockly.xml  = xmlCode;

  NeoBlockly.CodeMirrorXML.getDoc().setValue(xmlCode)

  if (xmlCode !== NeoBlockly.PREV_XML_CODE_)
  {
    if (NeoBlockly.config.currentFile !== '_blank')
    {
      if(NeoBlockly.config.newFile === 1)
      {
        NeoBlockly.config.newFile = 0;
      }else{
        NeoBlockly.setDocTitle('* ' + NeoBlockly.config.currentFile)
        NeoBlockly.config.modified = 1;
      }

    }
    NeoBlockly.PREV_XML_CODE_ = NeoBlockly.xml
  }

  if (arduinoCode !== NeoBlockly.PREV_ARDUINO_CODE_)
  {
    NeoBlockly.config.compiled = 0;
    NeoBlockly.CodeMirror.getDoc().setValue(NeoBlockly.code)
    NeoBlockly.CodeMirrorPreview.getDoc().setValue(NeoBlockly.code)
    NeoBlockly.PREV_ARDUINO_CODE_ = NeoBlockly.code
  }

  return arduinoCode;
}


NeoBlockly.prompt = function(message, opt_defaultInput, opt_callback)
{
 var prompt_alert = alertify.prompt( 
    'NeoBlock', message, opt_defaultInput, 
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


NeoBlockly.hideSidebar = function()
{
  document.getElementById("simulator").style.display = "none";
  Blockly.svgResize(NeoBlockly.workspace);
}

NeoBlockly.showSidebar = function()
{
  document.getElementById("simulator").style.display = "block";
  Blockly.svgResize(NeoBlockly.workspace);
}

NeoBlockly.toggleSidebar = function()
{
  if (NeoBlockly.config.currentMode === 'block')
  {    
    if (NeoBlockly.config.showSidebar)
    {
      NeoBlockly.config.showSidebar = 0;
      document.body.className = "";
    }else{
      NeoBlockly.config.showSidebar = 1;
      document.body.className = "simulator";
    }
    Blockly.svgResize(NeoBlockly.workspace);    
  }
  
  NeoBlockly.CodeMirrorPreview.refresh()
}

NeoBlockly.tabClick = function(clickedName) {
  
  NeoBlockly.config.currentMode = 'nonblock';

  if (clickedName == 'blocks') {
    NeoBlockly.config.currentMode = 'block';
    NeoBlockly.workspace.setVisible(true);
    document.getElementById("pane-blocks").className = "tab-pane active";
    document.getElementById("pane-xml").className = "tab-pane";    
    document.getElementById("pane-code").className = "tab-pane";
    document.getElementById("pane-console").className = "tab-pane";

    if (NeoBlockly.config.showSidebar)
    {
      document.body.className = "simulator";
    }
  }

  if (clickedName == 'code') {
    NeoBlockly.workspace.setVisible(false);
    document.getElementById("pane-blocks").className = "tab-pane";
    document.getElementById("pane-xml").className = "tab-pane";    
    document.getElementById("pane-code").className = "tab-pane active";
    document.getElementById("pane-console").className = "tab-pane";

    document.body.className = "";

  }

  if (clickedName == 'xml') {
    NeoBlockly.workspace.setVisible(false);
    document.getElementById("pane-blocks").className = "tab-pane";
    document.getElementById("pane-code").className = "tab-pane";
    document.getElementById("pane-xml").className = "tab-pane active";
    document.getElementById("pane-console").className = "tab-pane";

    document.body.className = "";
  }


  if (clickedName == 'console') {
    NeoBlockly.workspace.setVisible(false);
    document.getElementById("pane-blocks").className = "tab-pane";
    document.getElementById("pane-code").className = "tab-pane";
    document.getElementById("pane-xml").className = "tab-pane";
    document.getElementById("pane-console").className = "tab-pane active";

    document.body.className = "";
  }

};


NeoBlockly.setProgressBar = function(value) {
  $('.progress-bar').css('width', value+'%').attr('aria-valuenow', value);
}


NeoBlockly.blocks = {}

NeoBlockly.blocks.domCreateToolCat = function(id,name)
{
     var xml_cat = document.createElement('category')
      xml_cat.setAttribute("id", id);
      xml_cat.setAttribute("name", name); 
      return xml_cat;
}


NeoBlockly.blocks.domCreateXMLBlock = function(block_name, block_file)
{
  // console.log(block_file)
    var block_string = fs.readFileSync(block_file)
    var new_block = Blockly.Xml.textToDom(block_string).firstElementChild;
    // console.log(new_block)
    var toolBoxCat = NeoBlockly.blocks.domCreateToolCat(block_name, block_name)
    toolBoxCat.appendChild(new_block)
    return toolBoxCat;
}



NeoBlockly.blocks.fileExists = function(filePath) {
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
  
NeoBlockly.blocks.loadBlocksFromDir = function(board_dir)
{
  var block_dir = (app.getPath('userData') + path.sep + "Blocks" )

  if (!NeoBlockly.blocks.fileExists(block_dir))
  {
    fs.mkdirSync(block_dir);
  }

  var toolBoxCustomCat = NeoBlockly.blocks.domCreateToolCat("Custom Blocks", "Custom Blocks")

  if(!NeoBlockly.blocks.fileExists(block_dir)) return toolBoxCustomCat

  var block_dir_array = fs.readdirSync(block_dir);
  var block_dir_array_length = block_dir_array.length
  //iterate ./Blocks/*
  for (var i = 0; i < block_dir_array_length; i++) {
      var block_category_currentdir = block_dir_array[i];
      if (block_category_currentdir === '.DS_Store') continue;
      var toolBoxSubCat = NeoBlockly.blocks.domCreateToolCat(block_category_currentdir, block_category_currentdir)
      // console.log(' ', block_category_currentdir)
      // //iterate file inside ./Blocks/*/*
      var block_file_array = fs.readdirSync( block_dir + path.sep + block_category_currentdir )
      for (var j = 0; j < block_file_array.length; j++) {
        var current_block_file = block_file_array[j]
        // console.log('  ', current_block_file)
        var new_block_dom = NeoBlockly.blocks.domCreateXMLBlock(current_block_file, block_dir + path.sep + block_category_currentdir + path.sep + current_block_file)
        toolBoxSubCat.appendChild(new_block_dom)
      }
      toolBoxCustomCat.appendChild(toolBoxSubCat)
  }

  return toolBoxCustomCat

}  

NeoBlockly.initAll = function() {


    NeoBlockly.toolBox = Blockly.Xml.textToDom(NeoBlockly.toolboxStr);

    var custom_block_dom = NeoBlockly.blocks.loadBlocksFromDir();
    if(custom_block_dom.childElementCount > 0)
    {
      NeoBlockly.toolBox.insertBefore(custom_block_dom, NeoBlockly.toolBox.firstElementChild)
    }
    

    NeoBlockly.workspace = Blockly.inject('blocklyDiv',
    {
        css: false,
        toolbox: NeoBlockly.toolBox,
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
    var defaultBlocks = document.getElementById('NeoBlockInitial');
    Blockly.Xml.domToWorkspace(NeoBlockly.workspace, defaultBlocks);

    NeoBlockly.CodeMirror = CodeMirror.fromTextArea(document.getElementById("codeDiv"), 
    {
      lineNumbers: true,
      lineWrapping: true,
      readOnly: false,
      mode: "text/x-c++src"
    });


    NeoBlockly.CodeMirrorPreview = CodeMirror.fromTextArea(document.getElementById("codePreviewDiv"), 
    {
      lineNumbers: true,
      lineWrapping: true,
      readOnly: false,
      mode: "text/x-c++src"
    });


    NeoBlockly.CodeMirrorXML = CodeMirror.fromTextArea(document.getElementById("xmlCodeDiv"), 
    {
      lineNumbers: true,
      lineWrapping: true,
      readOnly: false,
      mode: "application/xml"
    });

    NeoBlockly.CodeMirrorConsole = CodeMirror.fromTextArea(document.getElementById("consoleDiv"), 
    {
      lineNumbers: true,
      lineWrapping: true,
      readOnly: false,
      mode: "application/xml"
    });
                              
    NeoBlockly.workspace.addChangeListener(NeoBlockly.generateCode);

    document.getElementById("btn-mode-blocks").onclick = function(){NeoBlockly.tabClick('blocks')};
    document.getElementById("btn-mode-code").onclick = function(){NeoBlockly.tabClick('code')};
    document.getElementById("btn-mode-xml").onclick = function(){NeoBlockly.tabClick('xml')};
    document.getElementById("btn-mode-console").onclick = function(){NeoBlockly.tabClick('console')};
    document.getElementById("btn-mode-compile").onclick = function(){NeoBlockly.compile()};
    document.getElementById("btn-mode-upload").onclick = function(){NeoBlockly.upload()};


    var svgresize = function() {
        Blockly.svgResize(NeoBlockly.workspace);
    }

    Split(['#main', '#simulator'], {
        sizes: [71, 29],
        minSize: 200,
        onDragEnd: svgresize
    });


    // Original signature: function(message, opt_defaultInput, opt_callback)
    Blockly.prompt = NeoBlockly.prompt;

    NeoBlockly.newFile();
    
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

NeoBlockly.updater = {};
NeoBlockly.updater.files = [
  {name: "NeoBlock", local: "neosrc/NeoBlock/NeoBlock.js", url: "https://cocomake7.github.io/NeoBlockly/neosrc/NeoBlock/NeoBlock.js", type: "js"},
  {name: "NeoGen", local: "neosrc/NeoBlock/NeoGen.js", url: "https://cocomake7.github.io/NeoBlockly/neosrc/NeoBlock/NeoGen.js", type: "js"}
]

NeoBlockly.updater.blockNeedUpdate = function(name, url, fun)
{
  if (typeof(conf.get(name)) === 'undefined')
  {
    fun()
  }else{
    NeoBlockly.updater.checkUpdateBlock(name, url, function(file){
    if(file.needupdate)
    {
      console.log(name, ' need update')
      fun()
    }
    })
  }
}

NeoBlockly.updater.updateBlock = function(file_name, url)
{
  NeoBlockly.updater.getUpdatedBlock(file_name, url, function(resp){
    console.log(file_name, ' updated')
    $.notify(file_name + ' updated')
    conf.set(file_name, resp)
  })
}

NeoBlockly.updater.updateNow = function()
{
    for (var i = 0; i < NeoBlockly.updater.files.length; ++i)
    {
      var name = NeoBlockly.updater.files[i].name;
      var url = NeoBlockly.updater.files[i].url;      
      NeoBlockly.updater.blockNeedUpdate(name, url, function(){
        NeoBlockly.updater.updateBlock(name, url);
      })
    }
}


NeoBlockly.updater.checkUpdateBlock = function(file_name, file_url, fun)
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

NeoBlockly.updater.getUpdatedBlock = function(file_name, file_url, fun)
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

