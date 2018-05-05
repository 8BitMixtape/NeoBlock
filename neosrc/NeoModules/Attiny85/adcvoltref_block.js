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

    //block interface

    this.appendValueInput("NAME")
        .appendField("NeoSynth set voice")
    this.appendValueInput("COCO_MOD")
        .setCheck(null)
        .appendField("modulation to");
        
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    
    //modulation input inline
    this.setInputsInline(true);
        
    //read
    get_field_value_atomic(block, "COCO_MOD")

*/

Blockly.Blocks['NeoLib_adcvoltref'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Setup ADC Voltage Reference");
      this.appendDummyInput()
          .appendField("Voltage Reference")
          .appendField(new Blockly.FieldDropdown([["VCC used as Voltage Reference, disconnected from PB0 (AREF).", "0"], 
                                                  ["External Voltage Reference at PB0 (AREF) pin, Internal Voltage Reference turned off.", "1"], 
                                                  ["Internal 1.1V Voltage Reference.", "2"], 
                                                  ["Internal 2.56V Voltage Reference without external bypass capacitor, disconnected from PB0 (AREF)(1).", "3"], 
                                                  ["Internal 2.56V Voltage Reference with external bypass capacitor at PB0 (AREF) pin(1).", "4"]
                                                ]), "DIVISION_FACTOR");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip('');
      this.setColour(290);
      this.setHelpUrl('http://www.example.com/');
    }
  };
  