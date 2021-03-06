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

Blockly.Blocks['NeoLib_timsk1'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Timer/Counter B/1 Interrupt");
  
        this.appendDummyInput()
        .appendField("Output Compare A Interrupt Enable")
        .appendField(new Blockly.FieldDropdown([
            ["Disable", "0"], 
            ["Enable/", "1"]       
          ]), "TIMER1A_MATCH");        

          this.appendDummyInput()
          .appendField("Output Compare B Interrupt Enable")
          .appendField(new Blockly.FieldDropdown([
              ["Disable", "0"], 
              ["Enable", "1"]       
            ]), "TIMER1B_MATCH");                 

          this.appendDummyInput()
          .appendField("Overflow Interrupt Enable")
          .appendField(new Blockly.FieldDropdown([
              ["Disable", "0"], 
              ["Enable", "1"]       
          ]), "TOIE1");                 

      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip('');
      this.setColour(290);
      this.setHelpUrl('http://www.example.com/');
    }
  };
  