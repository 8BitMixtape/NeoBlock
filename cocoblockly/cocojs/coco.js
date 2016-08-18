
var CocoBlockly = CocoBlockly || {};

CocoBlockly.executeBlockCode = function() {
  var code = Blockly.Arduino.workspaceToCode(CocoBlockly.workspace);
  console.log('play');
}
        
CocoBlockly.myUpdateFunction = function(event) {
  var doc = CocoBlockly.CodeMirror.getDoc();
  var code = Blockly.Arduino.workspaceToCode(CocoBlockly.workspace)
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
    document.getElementById("pane-midi").className = "tab-pane";

    document.body.className = "simulator";
  }

  if (clickedName == 'code') {
    CocoBlockly.workspace.setVisible(false);
    document.getElementById("pane-blocks").className = "tab-pane";
    document.getElementById("pane-xml").className = "tab-pane";    
    document.getElementById("pane-code").className = "tab-pane active";
    document.getElementById("pane-midi").className = "tab-pane";

    document.body.className = "";

  }

  if (clickedName == 'xml') {
    CocoBlockly.workspace.setVisible(false);
    document.getElementById("pane-blocks").className = "tab-pane";
    document.getElementById("pane-code").className = "tab-pane";
    document.getElementById("pane-xml").className = "tab-pane active";
    document.getElementById("pane-midi").className = "tab-pane";

    document.body.className = "";
  }


  if (clickedName == 'midi') {
    CocoBlockly.workspace.setVisible(false);
    document.getElementById("pane-blocks").className = "tab-pane";
    document.getElementById("pane-code").className = "tab-pane";
    document.getElementById("pane-xml").className = "tab-pane";
    document.getElementById("pane-midi").className = "tab-pane active";

    document.body.className = "";
  }

};


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
                              
    CocoBlockly.workspace.addChangeListener(CocoBlockly.myUpdateFunction);

    document.getElementById("btn-mode-blocks").onclick = function(){CocoBlockly.tabClick('blocks')};
    document.getElementById("btn-mode-code").onclick = function(){CocoBlockly.tabClick('code')};
    document.getElementById("btn-mode-xml").onclick = function(){CocoBlockly.tabClick('xml')};
    document.getElementById("btn-mode-midi").onclick = function(){CocoBlockly.tabClick('midi')};

    var svgresize = function() {
        Blockly.svgResize(CocoBlockly.workspace);
    }

    Split(['#main', '#simulator'], {
        sizes: [71, 29],
        minSize: 200,
        onDragEnd: svgresize
    });

});