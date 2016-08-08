
var CocoBlockly = CocoBlockly || {};

CocoBlockly.executeBlockCode = function() {
  var code = Blockly.Arduino.workspaceToCode(CocoBlockly.workspace);
  console.log('play');
}
        
CocoBlockly.myUpdateFunction = function(event) {
  var doc = CocoBlockly.CodeMirror.getDoc();
  CocoBlockly.CodeMirror.getDoc().setValue(Blockly.Arduino.workspaceToCode(CocoBlockly.workspace))
  CocoBlockly.CodeMirrorPreview.getDoc().setValue(Blockly.Arduino.workspaceToCode(CocoBlockly.workspace))

}

CocoBlockly.tabClick = function(clickedName) {

  if (clickedName == 'blocks') {
    CocoBlockly.workspace.setVisible(true);
    document.getElementById("pane-blocks").className = "tab-pane active";
    document.getElementById("pane-code").className = "tab-pane";
  }

  if (clickedName == 'code') {
    CocoBlockly.workspace.setVisible(false);
    document.getElementById("pane-blocks").className = "tab-pane";
    document.getElementById("pane-code").className = "tab-pane active";
  }
};


window.addEventListener('load', function load(event) {
    window.removeEventListener('load', load, false);
    // var toolBox =  Blockly.Xml.textToDom(Ardublockly.TOOLBOX_XML);
    CocoBlockly.toolBox = document.getElementById('ArduBlocklyToolbox');
    // var defaultBlocks = document.getElementById('blocklyDefault');

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
                              
    CocoBlockly.workspace.addChangeListener(CocoBlockly.myUpdateFunction);

    document.getElementById("btn-mode-blocks").onclick = function(){CocoBlockly.tabClick('blocks')};
    document.getElementById("btn-mode-code").onclick = function(){CocoBlockly.tabClick('code')};
    document.getElementById("btn-mode-xml").onclick = function(){CocoBlockly.tabClick('xml')};
});