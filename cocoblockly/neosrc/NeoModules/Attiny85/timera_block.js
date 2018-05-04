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

Blockly.Blocks['NeoLib_timera'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Setup TIMERA/0");

      this.appendDummyInput()
          .appendField("Waveform Generation Mode")
          .appendField(new Blockly.FieldDropdown([
              ["Default", "default"], 
              ["Normal", "0"], 
              ["PWM, Phase Correct", "1"], 
              ["CTC", "2"], 
              ["Fast PWM", "3"], 
              ["PWM, Phase Correct", "5"],
              ["Fast PWM", "7"]              
            ]), "WAVEFORM_MODE");

        this.appendDummyInput()
            .appendField("Compare Output Mode A")
            .appendField(new Blockly.FieldDropdown([
                ["Default", "default"],                 
                ["Normal port operation, OC0A/OC0B disconnected.", "0"], 
                ["Clear OC0A/OC0B on Compare Match, set OC0A/OC0B at BOTTOM (non-inverting mode)", "2"], 
                ["Set OC0A/OC0B on Compare Match, clear OC0A/OC0B at BOTTOM (inverting mode)", "3"]         
              ]), "COMPARE_MODE_A");

              this.appendDummyInput()
              .appendField("Compare Output Mode B")
              .appendField(new Blockly.FieldDropdown([
                  ["Default", "default"],                 
                  ["Normal port operation, OC0A/OC0B disconnected.", "0"], 
                  ["Clear OC0A/OC0B on Compare Match, set OC0A/OC0B at BOTTOM (non-inverting mode)", "2"], 
                  ["Set OC0A/OC0B on Compare Match, clear OC0A/OC0B at BOTTOM (inverting mode)", "3"]         
                ]), "COMPARE_MODE_B");
              
                
        this.appendDummyInput()
              .appendField("Clock Select")
              .appendField(new Blockly.FieldDropdown([
                  ["Default", "default"],                   
                  ["No clock source (Timer/Counter stopped)", "0"], 
                  ["No prescaling", "1"], 
                  ["8 (From prescaler)", "2"],
                  ["64 (From prescaler)", "3"],
                  ["256 (From prescaler)", "4"],
                  ["1024 (From prescaler)", "5"],
                  ["External clock source on T0 pin. Clock on falling edge", "6"],
                  ["External clock source on T0 pin. Clock on rising edge.", "7"]
                ]), "CLOCK_SELECT");

      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip('');
      this.setColour(290);
      this.setHelpUrl('http://www.example.com/');
    }
  };
  