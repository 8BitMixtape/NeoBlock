Blockly.Blocks['NeoLib_setOCR1A'] = {
    init: function() {
        this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
            .appendField("Timer1 Set OCR1A");
        this.appendValueInput('OCR0A');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);

    }
  };