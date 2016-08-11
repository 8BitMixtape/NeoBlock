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
  }
};


Blockly.Blocks['coco_synth_setupvoice'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("CocoSynth Setup voice");
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
        .appendField("CocoSynth set voice")
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
        .appendField("CocoSynth set voice")
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
        .appendField("CocoSynth set voice")
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
        .appendField("CocoSynth set voice")
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
        .appendField("CocoSynth set voice")
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
        .appendField("CocoSynth set voice")
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
        .appendField("CocoSynth trigger voice");
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
        .appendField("CocoSynth trigger voice");
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
        .appendField("Cocosynth Voice")
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
        .appendField("CocoSynth delay");
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

Blockly.Blocks['cocosynth_interval_function'] = {

  init: function() {

    this.appendDummyInput()
        .appendField("CocoSynth Interval timer name")
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