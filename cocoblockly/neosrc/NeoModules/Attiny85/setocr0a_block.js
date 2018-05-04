Blockly.Blocks['NeoLib_setOCR0A'] = {
    init: function() {
        this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
            .appendField("Timer0 Set OCR0A");
        this.appendValueInput('OCR0A');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);

    }
  };