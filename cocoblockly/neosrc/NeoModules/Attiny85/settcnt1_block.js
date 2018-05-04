Blockly.Blocks['NeoLib_setTCNT1'] = {
    init: function() {
        this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
            .appendField("Timer1 Set TCNT1");
        this.appendValueInput('OCR0A');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);

    }
  };