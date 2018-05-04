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

Blockly.Blocks['NeoLib_timerb'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Setup TIMER B/1");

          this.appendDummyInput()
          .appendField("Enable CTC")
          .appendField(new Blockly.FieldDropdown([
              ["Default", "default"], 
              ["CTC Disable", "0"], 
              ["CTC Enable", "1"]       
            ]), "CTC_ENABLE");        
            
            
            this.appendDummyInput()
            .appendField("Enable PWM A (OCR1A)")
            .appendField(new Blockly.FieldDropdown([
                ["Default", "default"],                 
                ["PWM Disable", "0"], 
                ["PWM Enable", "1"]       
              ]), "PWM_ENABLE");          
  
  

      this.appendDummyInput()
          .appendField("Comparator A Mode")
          .appendField(new Blockly.FieldDropdown([
              ["Default", "default"],               
              ["[norm] Timer/Counter Comparator A disconnected from output pin OC1A.", "0"], 
              ["[norm] Toggle the OC1A output line.", "1"], 
              ["[norm] Clear the OC1A output line.", "2"], 
              ["[norm] Set the OC1A output line.", "3"],
              ["[pwm] OC1x/_OC1x_ not connected.", "4"], 
              ["[pwm] OC1x cleared on compare match/_OC1x_ set on compare match", "5"], 
              ["[pwm] OC1x cleared on compare match/_OC1x_ not connected", "6"], 
              ["[pwm] OC1x Set on compare match/_OC1x_ not connected", "7"]                           
            ]), "COMPARATOR_MODE_NORMAL");       

        this.appendDummyInput()
            .appendField("Compare Output Mode")
            .appendField(new Blockly.FieldDropdown([
                ["Default", "default"],                 
                ["Normal port operation, OC0A/OC0B disconnected.", "0"], 
                ["Clear OC0A/OC0B on Compare Match, set OC0A/OC0B at BOTTOM (non-inverting mode)", "2"], 
                ["Set OC0A/OC0B on Compare Match, clear OC0A/OC0B at BOTTOM (inverting mode)", "3"]         
              ]), "COMPARE_MODE");
              
        this.appendDummyInput()
              .appendField("Timer/Counter1 Prescale")
              .appendField(new Blockly.FieldDropdown([
                  ["Default", "default"],                   
                  ["T/C1 stopped", "0"], 
                  ["PCK", "1"], 
                  ["PCK/2", "2"],
                  ["PCK/4", "3"],
                  ["PCK/8", "4"],
                  ["PCK/16", "5"],
                  ["PCK/32", "6"],
                  ["PCK/64", "7"], 
                  ["PCK/128", "8"],
                  ["PCK/256", "9"],
                  ["PCK/512", "10"],
                  ["PCK/1024", "11"],
                  ["PCK/2028", "12"],
                  ["PCK/4096", "13"],
                  ["PCK/8192", "14"],
                  ["PCK/16384", "15"],
                ]), "PRESCALE_SELECT");


                this.appendDummyInput()
                .appendField("Setup Comparator B");
      
            
                this.appendDummyInput()
                .appendField("Enable PWM B (OCR1B)")
                .appendField(new Blockly.FieldDropdown([
                    ["Default", "default"],                 
                    ["PWM Disable", "0"], 
                    ["PWM Enable", "1"]       
                  ]), "PWMB_ENABLE");          
      
                  this.appendDummyInput()
                  .appendField("Comparator B Mode")
                  .appendField(new Blockly.FieldDropdown([
                      ["Default", "default"],               
                      ["[norm] Timer/Counter Comparator A disconnected from output pin OC1A.", "0"], 
                      ["[norm] Toggle the OC1A output line.", "1"], 
                      ["[norm] Clear the OC1A output line.", "2"], 
                      ["[norm] Set the OC1A output line.", "3"],
                      ["[pwm] OC1x/_OC1x_ not connected.", "4"], 
                      ["[pwm] OC1x cleared on compare match/_OC1x_ set on compare match", "5"], 
                      ["[pwm] OC1x cleared on compare match/_OC1x_ not connected", "6"], 
                      ["[pwm] OC1x Set on compare match/_OC1x_ not connected", "7"]                           
                    ]), "COMPARATORB_MODE_NORMAL");       
        
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip('');
      this.setColour(290);
      this.setHelpUrl('http://www.example.com/');
    }
  };
  