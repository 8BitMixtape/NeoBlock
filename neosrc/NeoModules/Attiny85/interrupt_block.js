/*

    //block interface
    this.appendDummyInput()
    .appendField("NeoOneLiner count ")
    .appendField(new Blockly.FieldTextInput("0"), "NeoOneLiner_COUNT");

    //read
    get_field_value(block, "NeoOneLiner_COUNT")

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

Blockly.Blocks['NeoLib_interrupt'] = {
    init: function() {
        this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
            .appendField("Interrupt Handler")
            .appendField(new Blockly.FieldDropdown([["ADC", "ADC_vect"],["TIMER1_COMPA","TIMER1_COMPA"], ["TIMER1_COMPB", "TIMER1_COMPB"], ["TIMER0_COMPA", "TIMER0_COMPA"], ["TIMER0_COMPB", "TIMER0_COMPB"], ["TIMER1_OVF", "TIMER1_OVF"], ["TIMER0_OVF", "TIMER0_OVF"], ["INT0", "INT0"], ["PCINT0","PCINT0"]]), "INTERRUPT")
            this.appendStatementInput("INTERRUPT_STATEMENT")

        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);

        // this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
        // this.setHelpUrl('http://arduino.cc/en/Reference/Millis');        
    }
  };