Blockly.Blocks['NeoLib_setOCR0B'] = {
    init: function() {
        this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
            .appendField("Timer0 Set OCR0B");
        this.appendValueInput('OCR0B');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);

    }
  };