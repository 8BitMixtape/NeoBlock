/*

    //block interface
    this.appendDummyInput()
    .appendField("NeoLight count ")
    .appendField(new Blockly.FieldTextInput("0"), "NEOLIGHT_COUNT");

    //read
    get_field_value(block, "NEOLIGHT_COUNT")

    //block interface
    this.appendDummyInput()
    .appendField("setup for voice channel")
    .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), "COCO_VOICE");

    //read
    get_field_value(block, "COCO_VOICE")

    //block interface
    this.appendValueInput("COCO_MOD")
    .setCheck(null)
    .appendField("modulation to");

    //read
    get_field_value_atomic(block, "COCO_MOD")

*/

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