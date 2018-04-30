Blockly.Blocks['NeoLight_setup'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("NeoSynth Setup voice");

      this.appendDummyInput()
          .appendField("NeoLight count ")
          .appendField(new Blockly.FieldTextInput("0"), "NEOLIGHT_COUNT");

      this.appendDummyInput()
          .appendField("NeoLight pin ")
          .appendField(new Blockly.FieldTextInput("0"), "NEOLIGHT_PIN");
          

      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip('');
      this.setColour(290);
      this.setHelpUrl('http://www.example.com/');
    }
  };