/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Arduino Time functions.
 *     The arduino built in functions syntax can be found in
 *     http://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Blocks.coco');
goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.coco.HUE = 140;



Blockly.Blocks['cocokey_sendkeystroke'] = {
  /**
   * Elapsed time in milliseconds block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Millis');
    this.setColour(Blockly.Blocks.coco.HUE);
    this.appendValueInput('COCOKEY_STROKE')
        .appendField("CocoKeyboard single keystroke");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);

  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.LARGE_NUMBER;
  }
};




Blockly.Blocks['cocokey_delay'] = {
  /**
   * Elapsed time in milliseconds block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Millis');
    this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
        .appendField("CocoKeyboard delay");
    this.appendValueInput('COCOKEY_DELAY')
        .appendField("milliseconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);

  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.LARGE_NUMBER;
  }
};



Blockly.Blocks['cocokey_print'] = {
  /**
   * Elapsed time in milliseconds block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Millis');
    this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
        .appendField("CocoKeyboard print");
    this.appendValueInput('COCOKEY_PRINT')
        .appendField("string");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);

  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.LARGE_NUMBER;
  }
};


Blockly.Blocks['cocokey_update'] = {
  /**
   * Elapsed time in milliseconds block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Millis');
    this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
        .appendField("CocoKeyboard update");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
  }
};



Blockly.Blocks['cocomidi_sendnote'] = {
  /**
   * Elapsed time in milliseconds block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Millis');
    this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
        .appendField("CocoMidi send note");


    this.appendDummyInput()
        .appendField("Note")
        .appendField(
            new Blockly.FieldDropdown(
                [['On', 'MIDI_NOTEON'],
                 ['Off', 'MIDI_NOTEOFF']
                 ]
                 ),
            'COCOMIDI_STATE');
            this.appendValueInput('COCOMIDI_CHAN')
        .appendField("channel");


    this.appendValueInput('COCOMIDI_VEL')
        .appendField("velocity");


    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
  }
};

Blockly.Blocks['cocomidi_sendnote_var'] = {
  /**
   * Elapsed time in milliseconds block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Millis');
    this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
        .appendField("CocoMidi send note");


    this.appendDummyInput()
            this.appendValueInput('COCOMIDI_STATE')
        .appendField("Note");
            this.appendValueInput('COCOMIDI_CHAN')
        .appendField("channel");

            this.appendValueInput('COCOMIDI_VEL')
        .appendField("velocity");


    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
  }
};

Blockly.Blocks['cocomidi_sendcchires'] = {
  /**
   * Elapsed time in milliseconds block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Millis');
    this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
        .appendField("CocoMidi send high res cc");
            this.appendValueInput('COCOMIDI_VALUE')
        .appendField("value");
            this.appendValueInput('COCOMIDI_CHAN')
        .appendField("channel");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
  }
};

Blockly.Blocks['cocomidi_delay'] = {
  /**
   * Elapsed time in milliseconds block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Millis');
    this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
        .appendField("CocoMidi delay");
    this.appendValueInput('COCOMIDI_DELAY')
        .appendField("milliseconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);

  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.LARGE_NUMBER;
  }
};


Blockly.Blocks['cocomidi_update'] = {
  /**
   * Elapsed time in milliseconds block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Millis');
    this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
        .appendField("CocoMidi update");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
  }
};


Blockly.Blocks['cocomidi_note_state'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["midi note ON", "MIDI_NOTEON"], ["midi note OFF", "MIDI_NOTEOFF"]]), "MIDI_NOTE_STATE");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['cocomidi_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("if there is new incoming midi message");
    this.appendStatementInput("COCOMIDI_DOREAD")
        .setCheck(null);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
        this.setColour(20);
   this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['cocomidi_message'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["midi message value", "value"], ["midi message key", "key"],  ["midi message command", "command"]]), "MIDI_MESSAGE");
    this.setInputsInline(false);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Blocks['cocomake_singlechar'] = {
  /**
   * Block for text value.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendDummyInput()
        .appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput(''), 'TEXT')
        .appendField(this.newQuote_(false));
    this.setOutput(true, Blockly.Types.TEXT.output);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    // Text block is trivial.  Use tooltip of parent block if it exists.
    this.setTooltip(function() {
      var parent = thisBlock.getParent();
      return (parent && parent.getInputsInline() && parent.tooltip) ||
          Blockly.Msg.TEXT_TEXT_TOOLTIP;
    });
  },
  /**
   * Create an image of an open or closed quote.
   * @param {boolean} open True if open quote, false if closed.
   * @return {!Blockly.FieldImage} The field image of the quote.
   * @this Blockly.Block
   * @private
   */
  newQuote_: function(open) {
    if (open == this.RTL) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  },
  /** @return {!string} Type of the block, text block always a string. */
  getBlockType: function() {
    return Blockly.Types.TEXT;
  }
};


Blockly.Blocks['cocotouch_touched'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("after capacitive sensore measurement done do");
    this.appendStatementInput("COCOTOUCH_DOTOUCHED")
        .setCheck(null);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
        this.setColour(20);
   this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.Blocks['coco_interval_function'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("timer name")
        .appendField(new Blockly.FieldTextInput("default"), "TIMER_NAME");
    this.appendDummyInput()
        .appendField("every")

    this.appendValueInput('TIMER_INTERVAL')
        .appendField("milliseconds");
            this.setInputsInline(true);
    this.appendDummyInput()
        .appendField("do")

    this.appendStatementInput("DO_BLOCKS")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
  validate: function () {
    var name = Blockly.Procedures.findLegalName(
        this.getFieldValue('TIMER_NAME'), this);
    this.setFieldValue(name, 'TIMER_NAME');
  },
  getProcedureDef: function() {
    return [this.getFieldValue('TIMER_NAME'), {}, false];
  }
};


Blockly.Blocks['coco_synth_setupvoice'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("NeoSynth Setup voice");
    this.appendDummyInput()
        .appendField("setup for voice channel")
        .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), "COCO_VOICE");
    this.appendDummyInput()
        .appendField("set waveform to")
        .appendField(new Blockly.FieldDropdown([["Sine", "SINE"], ["Triangle", "TRIANGLE"], ["Square", "SQUARE"], ["Sawtooth", "SAW"], ["Ramp", "RAMP"], ["Noise", "NOISE"]]), "COCO_WAVEFORM")
    this.appendDummyInput()
        .appendField("set envelope to")
        .appendField(new Blockly.FieldDropdown([["ENV0", "ENVELOPE0"], ["ENV1", "ENVELOPE1"], ["ENV2", "ENVELOPE2"], ["ENV3", "ENVELOPE3"]]), "COCO_ENVELOPE");
    this.appendDummyInput()
        .appendField("set pitch to ")
        .appendField(new Blockly.FieldTextInput("0"), "COCO_PITCH");
    this.appendDummyInput()
        .appendField("set length to ")
        .appendField(new Blockly.FieldTextInput("0"), "COCO_LENGTH");
    this.appendDummyInput()
        .appendField("set mod to ")
        .appendField(new Blockly.FieldTextInput("64"), "COCO_MOD")
        .appendField("( set to 64 for no modulation)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setColour(290);
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Blocks['coco_synth_setmod'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("NeoSynth set voice")
        .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), "COCO_VOICE");
    this.appendValueInput("COCO_MOD")
        .setCheck(null)
        .appendField("modulation to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['coco_synth_setmod_field'] = {
  init: function() {
    this.appendValueInput("NAME")
        .appendField("NeoSynth set voice")
    this.appendValueInput("COCO_MOD")
        .setCheck(null)
        .appendField("modulation to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Blocks['coco_synth_setpitch'] = {
  init: function() {
    this.appendValueInput("NAME")
        .appendField("NeoSynth set voice")
    this.appendValueInput("COCO_MOD")
        .setCheck(null)
        .appendField("pitch to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['coco_synth_setlength'] = {
  init: function() {
    this.appendValueInput("NAME")
        .appendField("NeoSynth set voice")
    this.appendValueInput("COCO_MOD")
        .setCheck(null)
        .appendField("length to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['coco_synth_setwave_field'] = {
  init: function() {
    this.appendValueInput("NAME")
        .appendField("NeoSynth set voice")
    this.appendDummyInput("COCO_MOD")
        .appendField("wave to")
        .appendField(new Blockly.FieldDropdown([["Sine", "SINE"], ["Triangle", "TRIANGLE"], ["Square", "SQUARE"], ["Sawtooth", "SAW"], ["Ramp", "RAMP"], ["Noise", "NOISE"]]), "COCO_WAVEFORM")

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['coco_synth_setenvelope_field'] = {
  init: function() {
    this.appendValueInput("NAME")
        .appendField("NeoSynth set voice")
    this.appendDummyInput("COCO_MOD")
        .appendField("envelope to")
        .appendField(new Blockly.FieldDropdown([["ENV0", "ENVELOPE0"], ["ENV1", "ENVELOPE1"], ["ENV2", "ENVELOPE2"], ["ENV3", "ENVELOPE3"]]), "COCO_ENVELOPE");

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['coco_synth_trigger'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("NeoSynth trigger voice");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setColour(65);
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['coco_synth_miditrigger'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("NeoSynth trigger voice");
    this.appendValueInput("NOTE")
        .setCheck(null)
        .appendField("midi note");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setColour(65);
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['coco_synth_voice'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("NeoSynth Voice")
        .appendField(new Blockly.FieldDropdown([["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"]]), "COCO_VOICE");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Blocks['coco_synth_delay'] = {
  /**
   * Elapsed time in milliseconds block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Millis');
    this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
        .appendField("NeoSynth delay");
    this.appendValueInput('COCOKEY_DELAY')
        .appendField("milliseconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);

  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.LARGE_NUMBER;
  }
};

Blockly.Blocks['NeoSynth_interval_function'] = {

  init: function() {

    this.appendDummyInput()
        .appendField("NeoSynth Interval timer name")
        .appendField(new Blockly.FieldTextInput("default"), "TIMER_NAME");
    this.appendDummyInput()
        .appendField("every")

    this.appendValueInput('TIMER_INTERVAL')
            this.setInputsInline(true);
    this.appendDummyInput()
        .appendField("milliseconds do")

    this.appendStatementInput("DO_BLOCKS")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['coco_delayms'] = {
  /**
   * Elapsed time in milliseconds block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Millis');
    this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
        .appendField("delay");
    this.appendValueInput('COCOMIDI_DELAY')
        .appendField("milliseconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);

  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.LARGE_NUMBER;
  }
};

Blockly.Blocks['coco_delayus'] = {
  /**
   * Elapsed time in milliseconds block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Millis');
    this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
        .appendField("delay");
    this.appendValueInput('COCOMIDI_DELAY')
        .appendField("microseconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);

  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.LARGE_NUMBER;
  }
};


Blockly.Blocks['coco_readpullup'] = {
  /**
   * Elapsed time in milliseconds block definition
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/Millis');
    this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
        .appendField("read pullup");
    this.appendDummyInput()
        .appendField("digital pin")
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'PIN');        
    this.setInputsInline(true);
    // this.setPreviousStatement(true, null);
    // this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
    this.setOutput(true, Blockly.Types.BOOLEAN.output);

  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.BOOLEAN;
  }
};


Blockly.Blocks['cocoutil_peakdetect'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("if peak detector")
        .appendField(new Blockly.FieldTextInput("default"), "COCO_NAME");
    this.appendDummyInput()
        .appendField("detected peak from")        
    this.appendValueInput('COCO_VALUE')

    this.appendDummyInput()
        .appendField("do");        
    this.appendStatementInput("COCO_DO")
        .setCheck(null);        
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
        this.setColour(20);
            this.setInputsInline(true);

   this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  },
  validate: function () {
    var name = Blockly.Procedures.findLegalName(
        this.getFieldValue('COCO_NAME'), this);
    this.setFieldValue(name, 'COCO_NAME');
  },
  getProcedureDef: function() {
    return [this.getFieldValue('COCO_NAME'), {}, false];
  }
};


Blockly.Blocks['cocoutil_getvelocity'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get velocity")
        .appendField(new Blockly.FieldTextInput("default"), "COCO_NAME");
    this.appendDummyInput()
        .appendField("from")        
    this.appendValueInput('COCO_VALUE')
    this.setOutput(true, Blockly.Types.NUMBER.output);

      
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
        this.setColour(20);
            this.setInputsInline(true);

   // this.setPreviousStatement(true, null);
    // this.setNextStatement(true, null);
  },
    getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};


Blockly.Blocks['cocoutil_getmova'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get moving average ")
        .appendField(new Blockly.FieldTextInput("coco_mova_1"), "COCO_NAME");
    this.appendDummyInput()
        .appendField("constant")        
    this.appendValueInput('COCO_MA')
    this.appendDummyInput()
        .appendField("from")     
    this.appendValueInput('COCO_VALUE')

    this.setOutput(true, Blockly.Types.NUMBER.output);

      
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
        this.setColour(20);
            this.setInputsInline(true);

   // this.setPreviousStatement(true, null);
    // this.setNextStatement(true, null);
  },
    getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
};


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

Blockly.Blocks['NeoLib_adcauto'] = {
  init: function() {
      this.setColour(Blockly.Blocks.coco.HUE);
      this.appendDummyInput()
          .appendField("Attiny85 ADC Autotrigger");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);

      // this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
      // this.setHelpUrl('http://arduino.cc/en/Reference/Millis');        
  }
};
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

Blockly.Blocks['NeoLib_aden'] = {
  init: function() {
      this.setColour(Blockly.Blocks.coco.HUE);
      this.appendDummyInput()
          .appendField("Attiny85 ADC Enable");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);

      // this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
      // this.setHelpUrl('http://arduino.cc/en/Reference/Millis');        
  }
};
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

Blockly.Blocks['NeoLib_enableint'] = {
  init: function() {
      this.setColour(Blockly.Blocks.coco.HUE);
      this.appendDummyInput()
          .appendField("Attiny85 Enable ADC Interrupt");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);

      // this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
      // this.setHelpUrl('http://arduino.cc/en/Reference/Millis');        
  }
};
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

Blockly.Blocks['NeoLib_adcprescale'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Setup ADC Prescale");
      this.appendDummyInput()
          .appendField("Division Factor")
          .appendField(new Blockly.FieldDropdown([["2", "2"], ["4", "4"], ["8", "8"], ["16", "16"], ["32", "32"], ["64", "64"], ["128", "128"]]), "DIVISION_FACTOR");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip('');
      this.setColour(290);
      this.setHelpUrl('http://www.example.com/');
    }
  };
  
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

Blockly.Blocks['NeoLib_admuxadc'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Set ADMUX Adc");
      this.appendDummyInput()
          .appendField("Select ADC Port")
          .appendField(new Blockly.FieldDropdown([["ADC1/POT1", "ADC1"], ["ADC2/POT2", "ADC2"], ["ADC3/AUDIOIN", "ADC3"]]), "ADC_CHANNEL");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip('');
      this.setColour(290);
      this.setHelpUrl('http://www.example.com/');
    }
  };
  
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

Blockly.Blocks['NeoLib_disableusi'] = {
  init: function() {
      this.setColour(Blockly.Blocks.coco.HUE);
      this.appendDummyInput()
          .appendField("Attiny85 Disable USI");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);

      // this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
      // this.setHelpUrl('http://arduino.cc/en/Reference/Millis');        
  }
};
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

Blockly.Blocks['NeoLib_enablepll'] = {
  init: function() {
      this.setColour(Blockly.Blocks.coco.HUE);
      this.appendDummyInput()
          .appendField("Timer B/1 Enable PLL");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);

      // this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
      // this.setHelpUrl('http://arduino.cc/en/Reference/Millis');        
  }
};
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

Blockly.Blocks['NeoLib_noprescale'] = {
  init: function() {
      this.setColour(Blockly.Blocks.coco.HUE);
      this.appendDummyInput()
          .appendField("Attiny85 No Processor Prescale");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);

      // this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
      // this.setHelpUrl('http://arduino.cc/en/Reference/Millis');        
  }
};
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
Blockly.Blocks['NeoLib_setOCR1B'] = {
    init: function() {
        this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
            .appendField("Timer1 Set OCR1B");
        this.appendValueInput('OCR0A');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);

    }
  };
Blockly.Blocks['NeoLib_setTCNT0'] = {
    init: function() {
        this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
            .appendField("Timer0 Set TCNT0");
        this.appendValueInput('OCR0A');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);

    }
  };
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

Blockly.Blocks['NeoLib_startadc'] = {
  init: function() {
      this.setColour(Blockly.Blocks.coco.HUE);
      this.appendDummyInput()
          .appendField("Attiny85 Start ADC Conversion");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);

      // this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
      // this.setHelpUrl('http://arduino.cc/en/Reference/Millis');        
  }
};
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

Blockly.Blocks['NeoLib_TCNT0'] = {
  /**
   * Block for reading an analogue input.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogRead');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField("Read TCNT0");
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_ANALOGREAD_TIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'analogPins');
  }
};
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

Blockly.Blocks['NeoLib_TCNT1'] = {
  /**
   * Block for reading an analogue input.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogRead');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField("Read TCNT1");
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_ANALOGREAD_TIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'analogPins');
  }
};
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
          .appendField("Setup TIMER A/0");

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
          .appendField("Setup Comparator A");

      
            
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

Blockly.Blocks['NeoLib_resetpre'] = {
  init: function() {
      this.setColour(Blockly.Blocks.coco.HUE);
      this.appendDummyInput()
          .appendField("Attiny85 Reset Timer Prescaler");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);

      // this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
      // this.setHelpUrl('http://arduino.cc/en/Reference/Millis');        
  }
};
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

Blockly.Blocks['NeoLib_timsk'] = {
    init: function() {
      this.appendDummyInput()
      .appendField("Timer/Counter A/0 Interrupt");

          this.appendDummyInput()
          .appendField("Timer A/0");
          
          this.appendDummyInput()
          .appendField("OCF0A Compare Match A Interrupt")
          .appendField(new Blockly.FieldDropdown([
              ["Disable", "0"], 
              ["Enable/", "1"]       
            ]), "TIMER0A_MATCH");        

            this.appendDummyInput()
            .appendField("OCF0B Compare Match B Interrupt")
            .appendField(new Blockly.FieldDropdown([
                ["Disable", "0"], 
                ["Enable", "1"]       
              ]), "TIMER0B_MATCH");                 

            this.appendDummyInput()
            .appendField("Overflow Interrupt Enable")
            .appendField(new Blockly.FieldDropdown([
                ["Disable", "0"], 
                ["Enable", "1"]       
            ]), "TOIE0");                 

      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip('');
      this.setColour(290);
      this.setHelpUrl('http://www.example.com/');
    }
  };
  
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

Blockly.Blocks['NeoLib_callfunc'] = {
    init: function() {
        this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
            .appendField("NeoBlock do Custom Function")
            .appendField(new Blockly.FieldTextInput("default"), "USER_FORMULA");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);

        // this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
        // this.setHelpUrl('http://arduino.cc/en/Reference/Millis');        
    }
  };
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

Blockly.Blocks['NeoLib_fastanalogread'] = {
  /**
   * Block for reading an analogue input.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/AnalogRead');
    this.setColour(Blockly.Blocks.io.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_ANALOGREAD + " (FAST)")
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.analogPins), 'PIN');
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_ANALOGREAD_TIP);
  },
  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(this, 'PIN', 'analogPins');
  }
};
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

Blockly.Blocks['NeoLight_setrgb'] = {
    init: function() {
        this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
            .appendField("NeoLight Set RGB");

        this.appendValueInput('NEOLIGHT_IDX')
        .appendField("Led Index");

        this.appendValueInput('NEOLIGHT_R')
        .appendField("R");

        this.appendValueInput('NEOLIGHT_G')
        .appendField("G");

        this.appendValueInput('NEOLIGHT_B')
        .appendField("B");
        

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);

        // this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
        // this.setHelpUrl('http://arduino.cc/en/Reference/Millis');        
    }
  };
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

Blockly.Blocks['NeoLight_setup'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("NeoLight Setup");

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

Blockly.Blocks['NeoLight_sync'] = {
    init: function() {
        this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
            .appendField("NeoLight Sync");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);

        // this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
        // this.setHelpUrl('http://arduino.cc/en/Reference/Millis');        
    }
  };
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

Blockly.Blocks['NeoOneLiner_formula'] = {
    init: function() {
        this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
            .appendField("NeoOneLiner Formula")
            .appendField(new Blockly.FieldTextInput("default"), "USER_FORMULA");

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);

        // this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
        // this.setHelpUrl('http://arduino.cc/en/Reference/Millis');        
    }
  };
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

Blockly.Blocks['NeoOneLiner_setup'] = {
    init: function() {
        this.setColour(Blockly.Blocks.coco.HUE);
        this.appendDummyInput()
            .appendField("NeoOneLiner Setup");
            this.appendStatementInput("NEOONELINER_FORMULA")

        this.setInputsInline(true);
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);

        // this.setTooltip(Blockly.Msg.ARD_TIME_DELAY_TIP);
        // this.setHelpUrl('http://arduino.cc/en/Reference/Millis');        
    }
  };