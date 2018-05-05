/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino code generator for the Time blocks.
 *     Arduino built-in function docs: http://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Arduino.coco');
goog.require('Blockly.Arduino');


var get_field_value = function(block, value_name) {
  return block.getFieldValue(value_name);
}

var get_field_value_atomic = function(block, value_name) {
    return Blockly.Arduino.valueToCode(block, value_name, Blockly.Arduino.ORDER_ATOMIC) || '0';
}

var fix_newline = function(content) {
  if (content.charAt(0) === "\n")
  {
    return content.substr(1);
  }else{
    return content;
  }
}

 Blockly.Arduino['cocokey_sendkeystroke'] = function(block) {

  Blockly.Arduino.addInclude('cocokey', '#include <CocoKeyboard.h>');

  var keyStroke = Blockly.Arduino.valueToCode(block, 'COCOKEY_STROKE', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'CocoKeyboard.sendKeyStroke(' + keyStroke + ');\n';
  return code;
};



 Blockly.Arduino['cocokey_delay'] = function(block) {

  Blockly.Arduino.addInclude('cocokey', '#include <CocoKeyboard.h>');

  var keyStroke = Blockly.Arduino.valueToCode(block, 'COCOKEY_DELAY', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'CocoKeyboard.delay(' + keyStroke + ');\n';
  return code;
};


 Blockly.Arduino['cocokey_print'] = function(block) {

  Blockly.Arduino.addInclude('cocokey', '#include <CocoKeyboard.h>');

  var keyStroke = Blockly.Arduino.valueToCode(block, 'COCOKEY_PRINT', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'CocoKeyboard.print(' + keyStroke + ');\n';
  return code;
};


 Blockly.Arduino['cocokey_update'] = function(block) {
  Blockly.Arduino.addInclude('cocokey', '#include <CocoKeyboard.h>');
  var code = "CocoKeyboard.update();\n";
  return code;
};



 Blockly.Arduino['cocomidi_sendnote'] = function(block) {
  Blockly.Arduino.addInclude('cocomidi', '#include <CocoMidi.h>');
  Blockly.Arduino.addSetup('cocomidi', 'CocoMidi.init();\n', true);
  var varNoteState = block.getFieldValue('COCOMIDI_STATE');

  // var varNoteState = Blockly.Arduino.valueToCode(block, 'COCOMIDI_STATE', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var varNoteChan  = Blockly.Arduino.valueToCode(block, 'COCOMIDI_CHAN' , Blockly.Arduino.ORDER_ATOMIC) || '0';
  var varNoteVel   = Blockly.Arduino.valueToCode(block, 'COCOMIDI_VEL'  , Blockly.Arduino.ORDER_ATOMIC) || '0';

  var code = "CocoMidi.send(" + varNoteState + ',' + varNoteChan + ',' + varNoteVel +  ");\n";

  return code;
};


 Blockly.Arduino['cocomidi_sendnote_var'] = function(block) {
  Blockly.Arduino.addInclude('cocomidi', '#include <CocoMidi.h>');
  Blockly.Arduino.addSetup('cocomidi', 'CocoMidi.init();\n', true);
  var varNoteState = block.getFieldValue('COCOMIDI_STATE');

  var varNoteState = Blockly.Arduino.valueToCode(block, 'COCOMIDI_STATE', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var varNoteChan  = Blockly.Arduino.valueToCode(block, 'COCOMIDI_CHAN' , Blockly.Arduino.ORDER_ATOMIC) || '0';
  var varNoteVel   = Blockly.Arduino.valueToCode(block, 'COCOMIDI_VEL'  , Blockly.Arduino.ORDER_ATOMIC) || '0';

  var code = "CocoMidi.send(" + varNoteState + ',' + varNoteChan + ',' + varNoteVel +  ");\n";

  return code;
};


 Blockly.Arduino['cocomidi_sendcchires'] = function(block) {
  Blockly.Arduino.addInclude('cocomidi', '#include <CocoMidi.h>');
  Blockly.Arduino.addSetup('cocomidi', 'CocoMidi.init();\n', true);

  var varNoteValue = Blockly.Arduino.valueToCode(block, 'COCOMIDI_VALUE', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var varNoteChan  = Blockly.Arduino.valueToCode(block, 'COCOMIDI_CHAN' , Blockly.Arduino.ORDER_ATOMIC) || '0';

  var code = "CocoMidi.sendCCHires(" + varNoteValue + ',' + varNoteChan + ");\n";

  return code;
};


 Blockly.Arduino['cocomidi_delay'] = function(block) {

  Blockly.Arduino.addInclude('cocomidi', '#include <CocoMidi.h>');

  var keyStroke = Blockly.Arduino.valueToCode(block, 'COCOMIDI_DELAY', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'CocoMidi.delay(' + keyStroke + ');\n';
  return code;
};

 Blockly.Arduino['cocomidi_update'] = function(block) {
  Blockly.Arduino.addInclude('cocomidi', '#include <CocoMidi.h>');
  Blockly.Arduino.addSetup('cocomidi', 'CocoMidi.init();\n', true);

  var code = "CocoMidi.update();\n";
  return code;
};


Blockly.Arduino['cocomidi_note_state'] = function(block) {
  var dropdown_midi_note_state = block.getFieldValue('MIDI_NOTE_STATE');
  // TODO: Assemble JavaScript into code variable.
  var code = dropdown_midi_note_state;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Arduino.ORDER_NONE];
};


Blockly.Arduino['cocomidi_read'] = function(block) {

  var statements_do_blocks = Blockly.Arduino.statementToCode(block, 'COCOMIDI_DOREAD');

  Blockly.Arduino.addInclude('cocomidi', '#include <CocoMidi.h>');
  Blockly.Arduino.addSetup('cocomidi', 'CocoMidi.init();\n', true);


    Blockly.Arduino.addDeclaration("cocomidi_message", "MIDIMessage message;\n");
  // TODO: Assemble JavaScript into code variable.
  var code = "if (CocoMidi.read(&message)) {\n" + statements_do_blocks + "\n}\n"
  return code;
};


Blockly.Arduino['cocomidi_message'] = function(block) {
  
  Blockly.Arduino.addDeclaration("cocomidi_message", "MIDIMessage message;\n");

  var dropdown_midi_note_state = block.getFieldValue('MIDI_MESSAGE');
  // TODO: Assemble JavaScript into code variable.
  var code = 'message.' + dropdown_midi_note_state;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Arduino.ORDER_NONE];
};


Blockly.Arduino['cocomake_singlechar'] = function(block) {

  var string = block.getFieldValue('TEXT');

  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/\$/g, '\\$')
                 .replace(/'/g, '\\\'');
  var code = "'" + string + "'";

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino['cocotouch_touched'] = function(block) {

  var statements_do_blocks = Blockly.Arduino.statementToCode(block, 'COCOTOUCH_DOTOUCHED');


var varInclude = 
'#include <CocoTouch.h>' + 
'\n#include <CocoTouchFilterSettingDefault.h>';

var varDeclaration =  
 '\n//filter settings  '  + 
 '\nCocoTouchFilterSetting CocoFilter;  '  + 
 '\n  '  + 
 '\nint value = 0;  '  + 
 '\nint prevValue = 0;  '  + 
 '\nint velocityValue = 0;  '  + 
 '\nint prevVelocity =  0;  '  + 
 '\n  '  + 
 '\nuint16_t offset_adc = 0;  '  + 
 '\n  '  + 
 '\nunsigned long previousMillis = 0; // will store last time LED was updated  '  + 
 '\n  '  + 
 '\nint velocityThreshold = 80;  '  + 
 '\n  '  + 
 '\nint filtered_value = 0;  '  + 
 '\nuint8_t pin_queue = 0;  '  + 
 '\n  '  + 
 '\n//cocoTouch pin  '  + 
 '\n#define ADC_REF_PIN PB2  '  + 
 '\n#define ADC_SENSE_PIN PB4  '  + 
 '\n  '; 


var varSetup = 
 '\nCocoTouch.begin();  '  + 
 '\nCocoTouch.setAdcSpeed(4);  '  + 
 '\noffset_adc = CocoTouch.sense(ADC_SENSE_PIN, ADC_REF_PIN, 8 );  '  + 
 '\n' ; 

var varMaincode = 
 '\nif (millis() - previousMillis >= 5)   // 0% data loss  '  + 
 '\n{  '  + 
 '\n  filtered_value = CocoTouchFilter_get(&CocoFilter);  '  + 
 '\n  velocityValue = filtered_value - prevValue + 500;  '  + 
 '\n  prevValue = filtered_value;  '  + 
 '\n' + 
 '\n' + statements_do_blocks +
 '\n' + 
 '\n  previousMillis = millis();  '  + 
 '\n}  '  + 
 '\n'  + 
 '\nvalue = CocoTouch.sense(ADC_SENSE_PIN, ADC_REF_PIN, 7 ) - offset_adc;  '  + 
 '\nif (value > 0) CocoTouchFilter_put(&CocoFilter, value);  '  + 
 '\nprevVelocity = velocityValue;\n' ; 


  Blockly.Arduino.addInclude('cocotouch_include', varInclude);
  Blockly.Arduino.addDeclaration("cocotouch_declare", varDeclaration);
  Blockly.Arduino.addSetup('cocotouch_setup', varSetup, true);

  // TODO: Assemble JavaScript into code variable.
  var code = varMaincode;
  return code;
};


Blockly.Arduino['coco_interval_function'] = function(block) {
  var text_timer_name = block.getFieldValue('TIMER_NAME');
  var number_timer_interval = Blockly.Arduino.valueToCode(block, 'TIMER_INTERVAL', Blockly.Arduino.ORDER_ATOMIC) || '0';

  

  var statements_do_blocks = Blockly.Arduino.statementToCode(block, 'DO_BLOCKS');
  // TODO: Assemble JavaScript into code variable.

  Blockly.Arduino.addDeclaration(text_timer_name, 'unsigned long ' +  text_timer_name + '_lastTime;\n');
  var code = 'if (millis()- '+text_timer_name+'_lastTime >= ' + number_timer_interval + ')  {\n' + statements_do_blocks + ' ' + text_timer_name+'_lastTime = millis();\n' + '}\n';

  return code;
};


Blockly.Arduino['coco_synth_setupvoice'] = function(block) {
  var dropdown_coco_voice = block.getFieldValue('COCO_VOICE');
  var dropdown_coco_waveform = block.getFieldValue('COCO_WAVEFORM');
  var dropdown_coco_envelope = block.getFieldValue('COCO_ENVELOPE');
  var number_coco_pitch = block.getFieldValue('COCO_PITCH');
  var number_coco_length = block.getFieldValue('COCO_LENGTH');
  var number_coco_mod = block.getFieldValue('COCO_MOD');
  // TODO: Assemble Arduino into code variable.

var declare = `
NeoSynth synth;

//disable millis
//make timer available for NeoSynth
int main(void)
{
    //init();
ADC_PrescalerSelect( ADC_ARDUINO_PRESCALER );
ADC_Enable();
    setup();
    for (;;)
        loop();
    return 0;
}
`


  Blockly.Arduino.addInclude('NeoSynth', fix_newline(`
  #include <NeoSynth.h>
  #include "core_adc.h"
  `));

  Blockly.Arduino.addDeclaration('NeoSynth', fix_newline(declare));



  Blockly.Arduino.addSetup('NeoSynth', 'synth.begin();', true);

  var code = 'synth.setupVoice(' + dropdown_coco_voice + ',' + dropdown_coco_waveform + ',' + number_coco_pitch + ',' + dropdown_coco_envelope + ',' + number_coco_length + ',' + number_coco_mod + ');\n';
  return code;
};


Blockly.Arduino['coco_synth_setmod'] = function(block) {
  var dropdown_coco_voice = block.getFieldValue('COCO_VOICE');
  // var value_coco_mod = Blockly.Arduino.valueToCode(block, 'COCO_MOD', Blockly.Arduino.ORDER_ATOMIC || '0');

  var value_coco_mod = Blockly.Arduino.valueToCode(block, 'COCO_MOD', Blockly.Arduino.ORDER_ATOMIC) || '0';

  // TODO: Assemble Arduino into code variable.
  var code = 'synth.setMod(' + dropdown_coco_voice + ',' + value_coco_mod + ');\n';
  return code;
};

Blockly.Arduino['coco_synth_setmod_field'] = function(block) {
  var name = Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_ATOMIC) || '0';
  // var value_coco_mod = Blockly.Arduino.valueToCode(block, 'COCO_MOD', Blockly.Arduino.ORDER_ATOMIC || '0');

  var value_coco_mod = Blockly.Arduino.valueToCode(block, 'COCO_MOD', Blockly.Arduino.ORDER_ATOMIC) || '0';

  // TODO: Assemble Arduino into code variable.
  var code = 'synth.setMod(' + name + ',' + value_coco_mod + ');\n';
  return code;
};

Blockly.Arduino['coco_synth_setpitch'] = function(block) {
  var name = Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_ATOMIC) || '0';
  // var value_coco_mod = Blockly.Arduino.valueToCode(block, 'COCO_MOD', Blockly.Arduino.ORDER_ATOMIC || '0');

  var value_coco_mod = Blockly.Arduino.valueToCode(block, 'COCO_MOD', Blockly.Arduino.ORDER_ATOMIC) || '0';

  // TODO: Assemble Arduino into code variable.
  var code = 'synth.setPitch(' + name + ',' + value_coco_mod + ');\n';
  return code;
};

Blockly.Arduino['coco_synth_setlength'] = function(block) {
  var name = Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_ATOMIC) || '0';
  // var value_coco_mod = Blockly.Arduino.valueToCode(block, 'COCO_MOD', Blockly.Arduino.ORDER_ATOMIC || '0');

  var value_coco_mod = Blockly.Arduino.valueToCode(block, 'COCO_MOD', Blockly.Arduino.ORDER_ATOMIC) || '0';

  // TODO: Assemble Arduino into code variable.
  var code = 'synth.setLength(' + name + ',' + value_coco_mod + ');\n';
  return code;
};

Blockly.Arduino['coco_synth_setwave_field'] = function(block) {
  var name = Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_ATOMIC) || '0';
  // var value_coco_mod = Blockly.Arduino.valueToCode(block, 'COCO_MOD', Blockly.Arduino.ORDER_ATOMIC || '0');

  var dropdown_coco_waveform = block.getFieldValue('COCO_WAVEFORM');

  // TODO: Assemble Arduino into code variable.
  var code = 'synth.setWave(' + name + ',' + dropdown_coco_waveform + ');\n';
  return code;
};

Blockly.Arduino['coco_synth_setenvelope_field'] = function(block) {
  var name = Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_ATOMIC) || '0';
  // var value_coco_mod = Blockly.Arduino.valueToCode(block, 'COCO_MOD', Blockly.Arduino.ORDER_ATOMIC || '0');

  var dropdown_coco_waveform = block.getFieldValue('COCO_ENVELOPE');

  // TODO: Assemble Arduino into code variable.
  var code = 'synth.setEnvelope(' + name + ',' + dropdown_coco_waveform + ');\n';
  return code;
};

Blockly.Arduino['coco_synth_trigger'] = function(block) {
  var value_name = Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_ATOMIC) || '0';
  // TODO: Assemble Arduino into code variable.
  var code = 'synth.trigger(' + value_name + ');\n';
  return code;
};

Blockly.Arduino['coco_synth_miditrigger'] = function(block) {
  var value_name = Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var value_note = Blockly.Arduino.valueToCode(block, 'NOTE', Blockly.Arduino.ORDER_ATOMIC) || '0';

  // TODO: Assemble Arduino into code variable.
  var code = 'synth.mTrigger(' + value_name + ', ' + value_note +');\n';
  return code;
};

Blockly.Arduino['coco_synth_voice'] = function(block) {
  var dropdown_coco_voice = block.getFieldValue('COCO_VOICE');
  // TODO: Assemble JavaScript into code variable.
  var code = dropdown_coco_voice;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Arduino.ORDER_NONE];
};

 Blockly.Arduino['coco_synth_delay'] = function(block) {

  Blockly.Arduino.addInclude('cocokey', '#include <CocoKeyboard.h>');

  var keyStroke = Blockly.Arduino.valueToCode(block, 'COCOKEY_DELAY', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'synth.delay(' + keyStroke + ');\n';
  return code;
};

Blockly.Arduino['NeoSynth_interval_function'] = function(block) {
  var text_timer_name = block.getFieldValue('TIMER_NAME');
  var number_timer_interval = Blockly.Arduino.valueToCode(block, 'TIMER_INTERVAL', Blockly.Arduino.ORDER_ATOMIC) || '0';

  var statements_do_blocks = Blockly.Arduino.statementToCode(block, 'DO_BLOCKS');
  // TODO: Assemble JavaScript into code variable.

  Blockly.Arduino.addDeclaration(text_timer_name, 'unsigned long ' +  text_timer_name + '_lastTime;\n');
  var code = 'if (synth.millis()- '+text_timer_name+'_lastTime >= ' + number_timer_interval + ')  {\n' + statements_do_blocks + ' ' + text_timer_name+'_lastTime = synth.millis();\n' + '}\n';

  return code;
};


 Blockly.Arduino['coco_delayms'] = function(block) {

  // Blockly.Arduino.addInclude('avrutil', '#include <util/delay.h>');
  Blockly.Arduino.addInclude("cocoavrutil", "#include <util/delay.h>");

  var keyStroke = Blockly.Arduino.valueToCode(block, 'COCOMIDI_DELAY', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = '_delay_ms(' + keyStroke + ');\n';
  return code;
};


 Blockly.Arduino['coco_delayus'] = function(block) {

  // Blockly.Arduino.addInclude('avrutil', '#include <util/delay.h>');
  Blockly.Arduino.addInclude("cocoavrutil", "#include <util/delay.h>");

  var keyStroke = Blockly.Arduino.valueToCode(block, 'COCOMIDI_DELAY', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = '_delay_us(' + keyStroke + ');\n';
  return code;
};


 Blockly.Arduino['coco_readpullup'] = function(block) {

  var pin = block.getFieldValue('PIN');
  Blockly.Arduino.reservePin(
      block, pin, Blockly.Arduino.PinTypes.INPUT, 'Digital Read');

  var pinSetupCode = 'pinMode(' + pin + ', INPUT);\n  digitalWrite(' + pin + ', HIGH);';

  Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

  var code = 'digitalRead(' + pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];


};


Blockly.Arduino['cocoutil_peakdetect'] = function(block) {

  var statements_do_blocks = Blockly.Arduino.statementToCode(block, 'COCO_DO');
  var number_value_input = Blockly.Arduino.valueToCode(block, 'COCO_VALUE', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var peak_name = block.getFieldValue('COCO_NAME');

  Blockly.Arduino.addInclude('cocoutil_peak', '');
  Blockly.Arduino.addSetup('cocoutil_peak', '', true);

  var declare = '#define state_down 0'+
'\n#define state_up 1'+
'\n#define state_flat 2'

  var declare_var = '\n\nfloat '+peak_name+'_currValue = 0;'+
'\nfloat '+peak_name+'_prevValue = 0;'+
'\nint '+peak_name+'_currState = 0;'+
'\nint '+peak_name+'_prevState = state_flat;'

    Blockly.Arduino.addDeclaration("cocoutil_peakdetect", declare);
    Blockly.Arduino.addDeclaration("cocoutil_peakdetect" + peak_name, declare_var);

  // TODO: Assemble JavaScript into code variable.
  var code = '\n//peak detector code for ' + peak_name +
              '\ncurrValue = ' + number_value_input + ';' +
             '\n if (currValue > 0) {      '+
             '\n   if (currValue > prevValue) {'+
             '\n     currState = state_up;'+
             '\n   }else if (currValue < prevValue) {'+
             '\n     currState = state_down;'+
             '\n   }else{'+
             '\n     currState = state_flat;'+
             '\n   }     '+
             '\n   if ( currState == state_down && prevState == state_up)'+
             '\n   {'+
             '\n     '+ statements_do_blocks +
             '\n   }     '+
             '\n   prevState = currState;'+
             '\n   prevValue = currValue;'+
             '\n }'

  code = code.replace(/currValue/g, peak_name + '_currValue')           
  code = code.replace(/prevValue/g, peak_name + '_prevValue')           
  code = code.replace(/currState/g, peak_name + '_currState')           
  code = code.replace(/prevState/g, peak_name + '_prevState')           

  return code;
};




Blockly.Arduino['cocoutil_getvelocity'] = function(block) {

  var statements_do_blocks = Blockly.Arduino.statementToCode(block, 'COCO_DO');
  var number_value_input = Blockly.Arduino.valueToCode(block, 'COCO_VALUE', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var peak_name = block.getFieldValue('COCO_NAME');

  Blockly.Arduino.addInclude('cocoutil_peak', '');
  Blockly.Arduino.addSetup('cocoutil_peak', '', true);

  var declare_func =
'\int getvelocity(int value, int * prevValue)'+
'\n{'+
'\n  int velo = value - *prevValue;'+
'\n  *prevValue = value;'+
'\n  return velo;'+
'\n}'



    Blockly.Arduino.addDeclaration("cocoutil_velocity_" + peak_name, "int " + peak_name + "_prevValue;");

    Blockly.Arduino.addDeclaration("cocoutil_velocity", declare_func);


var code = "getvelocity(" + number_value_input + ", &" + peak_name + "_prevValue)";

  return [code, Blockly.Arduino.ORDER_NONE];
};


Blockly.Arduino['cocoutil_getmova'] = function(block) {

  var statements_do_blocks = Blockly.Arduino.valueToCode(block, 'COCO_VALUE', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var coco_ma_constant = Blockly.Arduino.valueToCode(block, 'COCO_MA', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var peak_name = block.getFieldValue('COCO_NAME');



  var declare_func = '\int get_moving_average(int value, float constant, int * accumulator)'+
'\n{'+
'\n*accumulator = (constant*value) + ((1-constant)* (*accumulator) );'+
'\n  return *accumulator;'+
'\n}'

  Blockly.Arduino.addDeclaration("cocoutil_mova", declare_func);

  Blockly.Arduino.addDeclaration("cocoutil_mova_" + peak_name, "int " + peak_name + "_accumulator;");



var code = "get_moving_average(" + statements_do_blocks + "," + coco_ma_constant + "," + " &" + peak_name + "_accumulator" + ")"
  return [code, Blockly.Arduino.ORDER_NONE];
};



Blockly.Arduino['NeoLib_adcauto'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

// var pin = get_field_value(block, 'PIN');

//add declaration
// Blockly.Arduino.addDeclaration("NeoLib_enablepll", fix_newline(``));

//add setup
// Blockly.Arduino.addSetup('NeoLib_enablepll', fix_newline(``));

//add code
var code = fix_newline(`
ADCSRA |= _BV(ADATE); //auto trigger
`)

return code;

};


Blockly.Arduino['NeoLib_aden'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

// var pin = get_field_value(block, 'PIN');

//add declaration
// Blockly.Arduino.addDeclaration("NeoLib_enablepll", fix_newline(``));

//add setup
// Blockly.Arduino.addSetup('NeoLib_enablepll', fix_newline(``));

//add code
var code = fix_newline(`
ADCSRA |= _BV(ADEN); //adc enable
`)

return code;

};


Blockly.Arduino['NeoLib_enableint'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

// var pin = get_field_value(block, 'PIN');

//add declaration
// Blockly.Arduino.addDeclaration("NeoLib_enablepll", fix_newline(``));

//add setup
// Blockly.Arduino.addSetup('NeoLib_enablepll', fix_newline(``));

//add code
var code = fix_newline(`
ADCSRA |= _BV(ADIE); //adc interrupt enable
`)

return code;

};


Blockly.Arduino['NeoLib_adcprescale'] = function(block) {

var division_factor = get_field_value(block, 'DIVISION_FACTOR');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

// var pin = get_field_value(block, 'PIN');

//add declaration
// Blockly.Arduino.addDeclaration("NeoLib_adcprescale", fix_newline(``));

//add setup
// Blockly.Arduino.addSetup('NeoLib_adcprescale', fix_newline(``));

var code = "ADCSRA |= ";

switch (division_factor) {
    case "2":
        code += '_BV(ADPS0);';
        break;
    case "4":
        code += '_BV(ADPS1);';        
        break;
    case "8":
        code += '_BV(ADPS1)|_BV(ADPS0);';
        break;
    case "16":
        code += '_BV(ADPS2);';        
        break;
    case "32":
        code += '_BV(ADPS2)|_BV(ADPS0);';        
        break;
    case "64":
        code += '_BV(ADPS2)|_BV(ADPS1);';     
        break
    case "128":
        code += '_BV(ADPS2)|_BV(ADPS1)|_BV(ADPS0);';     
        break        
    default:
        break;
}

return code + "\n";

};


Blockly.Arduino['NeoLib_adcvoltref'] = function(block) {

var division_factor = get_field_value(block, 'DIVISION_FACTOR');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

// var pin = get_field_value(block, 'PIN');

//add declaration
// Blockly.Arduino.addDeclaration("NeoLib_adcprescale", fix_newline(``));

//add setup
// Blockly.Arduino.addSetup('NeoLib_adcprescale', fix_newline(``));

var code = "ADMUX |= ";

switch (division_factor) {
    case "0":
        code += '0;';
        break;
    case "1":
        code += '_BV(REFS0);';        
        break;
    case "2":
        code += '_BV(REFS1);';
        break;
    case "3":
        code += '_BV(REFS2)|_BV(REFS1);';        
        break;   
    case "4":
        code += '_BV(REFS2)|_BV(REFS1)|_BV(REFS0);';        
        break;         
    default:
        break;
}

return code + "\n";

};


Blockly.Arduino['NeoLib_admuxadc'] = function(block) {

var division_factor = get_field_value(block, 'ADC_CHANNEL');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

// var pin = get_field_value(block, 'PIN');

//add declaration
Blockly.Arduino.addDeclaration("NeoLib_admuxadc", fix_newline(`
#define adc1 _BV(ADLAR) | _BV(MUX0) 
#define adc2 _BV(ADLAR) | _BV(MUX1) 
#define adc3 _BV(ADLAR) | _BV(MUX0) | _BV(MUX1)
`));

//add setup
// Blockly.Arduino.addSetup('NeoLib_admuxadc', fix_newline(``));

var code = "ADMUX = ";

switch (division_factor) {
    case "ADC1":
        code += 'adc1; //PB2-ADC1 pot1';
        break;
    case "ADC2":
        code += 'adc2; //PB4-ADC2 pot2';        
        break;
    case "ADC3":
        code += 'adc3; //PB3-ADC3 pot3';
        break;    
    default:
        break;
}

return code + "\n";

};


Blockly.Arduino['NeoLib_disableusi'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

// var pin = get_field_value(block, 'PIN');

//add declaration
// Blockly.Arduino.addDeclaration("NeoLib_disableusi", fix_newline(``));

//add setup
// Blockly.Arduino.addSetup('NeoLib_disableusi', fix_newline(``));

//add code
var code = fix_newline(`
PRR = (1 << PRUSI);                  //disable USI to save power as we are not using it`)

return code;

};


Blockly.Arduino['NeoLib_enablepll'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

// var pin = get_field_value(block, 'PIN');

//add declaration
// Blockly.Arduino.addDeclaration("NeoLib_enablepll", fix_newline(``));

//add setup
// Blockly.Arduino.addSetup('NeoLib_enablepll', fix_newline(``));

//add code
var code = fix_newline(`
//START PLL ENABLE
PLLCSR |= (1 << PLLE);               // Enable PLL (64 MHz)
_delay_us(100);                      // Wait for a steady state
while (!(PLLCSR & (1 << PLOCK)));    // Ensure PLL lock: do nothing while the bit PLOCK in register PLLCSR is false
PLLCSR |= (1 << PCKE);               // Enable PLL as clock source for timer 1
//END PLL ENABLE
`)

return code;

};


Blockly.Arduino['NeoLib_interrupt'] = function(block) {

    var statements_do_blocks = Blockly.Arduino.statementToCode(block, 'INTERRUPT_STATEMENT');
    var division_factor = get_field_value(block, 'INTERRUPT');

    var block_include = ``
    
    var block_declaration = ``
    

    //add include
    // Blockly.Arduino.addInclude("NeoOneLiner", fix_newline(block_include));
    
    //add declaration
    // Blockly.Arduino.addDeclaration("NeoOneLiner_crgb", fix_newline(block_declaration));
    
    //add setup
    // Blockly.Arduino.addSetup("NeoOneLiner", fix_newline(setup));
    
    //code
var code = `
ISR(`+division_factor+`)
{
`+ statements_do_blocks +`
}
`;
    
Blockly.Arduino.addDeclaration("NeoLib_interrupt_" + division_factor , fix_newline(code));

    //add code
    return "";
    
    };
    
    
Blockly.Arduino['NeoLib_noprescale'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

// var pin = get_field_value(block, 'PIN');

//add declaration
// Blockly.Arduino.addDeclaration("NeoLib_noprescale", fix_newline(``));

//add setup
// Blockly.Arduino.addSetup('NeoLib_noprescale', fix_newline(``));

//add code
var code = fix_newline(`clock_prescale_set(clock_div_1); //NO PROCESSOR PRESCALE\n`)

return code;

};


Blockly.Arduino['NeoLib_setOCR0A'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

var OCR0A = get_field_value_atomic(block, 'OCR0A');

var code = `
OCR0A = `+OCR0A+`;`

//add code
return code;

};


Blockly.Arduino['NeoLib_setOCR0B'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

var OCR0B = get_field_value_atomic(block, 'OCR0B');

var code = `
OCR0B = `+OCR0B+`;`

//add code
return code;

};


Blockly.Arduino['NeoLib_setOCR1A'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

var OCR0A = get_field_value_atomic(block, 'OCR0A');

var code = `
OCR1A = `+OCR0A+`;`

//add code
return code;

};


Blockly.Arduino['NeoLib_setOCR1B'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

var OCR0A = get_field_value_atomic(block, 'OCR0A');

var code = `
OCR1B = `+OCR0A+`;`

//add code
return code;

};


Blockly.Arduino['NeoLib_setTCNT0'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

var OCR0A = get_field_value_atomic(block, 'OCR0A');

var code = `
TCNT0 = `+OCR0A+`;`

//add code
return code;

};


Blockly.Arduino['NeoLib_setTCNT1'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

var OCR0A = get_field_value_atomic(block, 'OCR0A');

var code = `
TCNT1 = `+OCR0A+`;`

//add code
return code;

};


Blockly.Arduino['NeoLib_startadc'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

// var pin = get_field_value(block, 'PIN');

//add declaration
// Blockly.Arduino.addDeclaration("NeoLib_enablepll", fix_newline(``));

//add setup
// Blockly.Arduino.addSetup('NeoLib_enablepll', fix_newline(``));

//add code
var code = fix_newline(`
ADCSRA |= _BV(ADSC); //start adc conversion
`)

return code;

};


Blockly.Arduino['NeoLib_TCNT0'] = function(block) {

//add code
var code = 'TCNT0';

return [code, Blockly.Arduino.ORDER_ATOMIC];

};


Blockly.Arduino['NeoLib_TCNT1'] = function(block) {

//add code
var code = 'TCNT1';

return [code, Blockly.Arduino.ORDER_ATOMIC];

};


Blockly.Arduino['NeoLib_timera'] = function(block) {

// var waverform_mode = get_field_value(block, 'WAVEFORM_MODE');
// var compare_mode = get_field_value(block, 'COMPARE_MODE');
var clock_select = get_field_value(block, 'CLOCK_SELECT');

//add declaration
Blockly.Arduino.addDeclaration("NeoLib_bitwrite", fix_newline(`
#define bitRead(value, bit) (((value) >> (bit)) & 0x01)
#define bitSet(value, bit) ((value) |= (1UL << (bit)))
#define bitClear(value, bit) ((value) &= ~(1UL << (bit)))
#define bitWrite(value, bit, bitvalue) (bitvalue ? bitSet(value, bit) : bitClear(value, bit))
`));

//add setup
// Blockly.Arduino.addSetup('NeoLib_adcprescale', fix_newline(``));

var get_bitwrite = function(reg_temp, selection){    
    if (selection === 'default') return "";
    var tmp = ""
    var waveform = reg_temp.registers[selection];
    for (let i = 0; i <  waveform.length; i++) {
         tmp = tmp + 'bitWrite('+ register_template.reg_address[i]  +','+ register_template.reg_param[i] +','+ waveform[i] +');\n';
    }
    return tmp
}
  
var registers = [];
var code = "";

var register_template = {
    reg_address: ['TCCR0B', 'TCCR0A', 'TCCR0A'],
    reg_param: ['WGM02', 'WGM01', 'WGM00'],
    registers: {
        0: [0,0,0],
        1: [0,0,1],
        2: [0,1,0],
        3: [0,1,1],
        4: [1,0,0],
        5: [1,0,1],
        6: [1,1,0],
        7: [1,1,1]
    }
}

code = code + get_bitwrite(register_template, get_field_value(block, 'WAVEFORM_MODE'))

register_template = {
    reg_address: ['TCCR0A', 'TCCR0A'],
    reg_param: ['COM0A1', 'COM0A0'],
    registers: {
        0: [0,0],
        1: [0,1],
        2: [1,0],
        3: [1,1]
    }
}

code = code + get_bitwrite(register_template, get_field_value(block, 'COMPARE_MODE_A'))


register_template = {
    reg_address: ['TCCR0A', 'TCCR0A'],
    reg_param: ['COM0B1', 'COM0B0'],
    registers: {
        0: [0,0],
        1: [0,1],
        2: [1,0],
        3: [1,1]
    }
}

code = code + get_bitwrite(register_template, get_field_value(block, 'COMPARE_MODE_B'))


register_template = {
    reg_address: ['TCCR0B', 'TCCR0B', 'TCCR0B'],
    reg_param: ['CS02', 'CS01', 'CS00'],
    registers: {
        0: [0,0,0],
        1: [0,0,1],
        2: [0,1,0],
        3: [0,1,1],
        4: [1,0,0],
        5: [1,0,1],
        6: [1,1,0],
        7: [1,1,1]
    }
}

code = code + get_bitwrite(register_template, get_field_value(block, 'CLOCK_SELECT'))


return code + "\n";

};


Blockly.Arduino['NeoLib_timerb'] = function(block) {
    
    //add declaration
    Blockly.Arduino.addDeclaration("NeoLib_bitwrite", fix_newline(`
    #define bitRead(value, bit) (((value) >> (bit)) & 0x01)
    #define bitSet(value, bit) ((value) |= (1UL << (bit)))
    #define bitClear(value, bit) ((value) &= ~(1UL << (bit)))
    #define bitWrite(value, bit, bitvalue) (bitvalue ? bitSet(value, bit) : bitClear(value, bit))
    `));
    
    //add setup
    // Blockly.Arduino.addSetup('NeoLib_adcprescale', fix_newline(``));
    
    var get_bitwrite = function(reg_temp, selection){    
        if (selection === 'default') return "";
        var tmp = ""
        var waveform = reg_temp.registers[selection];
        for (let i = 0; i <  waveform.length; i++) {
             tmp = tmp + 'bitWrite('+ register_template.reg_address[i]  +','+ register_template.reg_param[i] +','+ waveform[i] +');\n';
        }
        return tmp
    }
      
    var registers = [];
    var code = "";
    
    var register_template = {
        reg_address: ['TCCR1'],
        reg_param: ['CTC1'],
        registers: {
            0: [0],
            1: [1],
        }
    }
    
    code = code + get_bitwrite(register_template, get_field_value(block, 'CTC_ENABLE'))
    
    var register_template = {
        reg_address: ['TCCR1'],
        reg_param: ['PWM1A'],
        registers: {
            0: [0],
            1: [1],
        }
    }
    
    code = code + get_bitwrite(register_template, get_field_value(block, 'PWM_ENABLE'))

    

    register_template = {
        reg_address: ['TCCR1', 'TCCR1'],
        reg_param: ['COM1A1', 'COM1A0'],
        registers: {
            0: [0,0],
            1: [0,1],
            2: [1,0],
            3: [1,1],
            4: [0,0],
            5: [0,1],
            6: [1,0],
            7: [1,1]            
        }
    }
    
    code = code + get_bitwrite(register_template, get_field_value(block, 'COMPARATOR_MODE_NORMAL'))

    
    register_template = {
        reg_address: ['GTCCR', 'GTCCR'],
        reg_param: ['COM1B1', 'COM1B0'],
        registers: {
            0: [0,0],
            1: [0,1],
            2: [1,0],
            3: [1,1],
            4: [0,0],
            5: [0,1],
            6: [1,0],
            7: [1,1]            
        }
    }
    
    code = code + get_bitwrite(register_template, get_field_value(block, 'COMPARATORB_MODE_NORMAL'))
    
    var register_template = {
        reg_address: ['GTCCR'],
        reg_param: ['PWM1B'],
        registers: {
            0: [0],
            1: [1],
        }
    }
    
    code = code + get_bitwrite(register_template, get_field_value(block, 'PWMB_ENABLE'))
    

    var register_template = {
        reg_address: ['TCCR1','TCCR1', 'TCCR1', 'TCCR1'],
        reg_param: ['CS13', 'CS12', 'CS11', 'CS10'],
        registers: {
            0: [0,0,0,0],
            1: [0,0,0,1],
            2: [0,0,1,0],
            3: [0,0,1,1],
            4: [0,1,0,0],
            5: [0,1,0,1],
            6: [0,1,1,0],
            7: [0,1,1,1],
            8: [1,0,0,0],
            9: [1,0,0,1],
            10: [1,0,1,0],
            11: [1,0,1,1],
            12: [1,1,0,0],
            13: [1,1,0,1],
            14: [1,1,1,0],
            15: [1,1,1,1]
        }
    }
    
    code = code + get_bitwrite(register_template, get_field_value(block, 'PRESCALE_SELECT'))
    
    return code + "\n";
    
    };
    
    
Blockly.Arduino['NeoLib_resetpre'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

// var pin = get_field_value(block, 'PIN');

//add declaration
// Blockly.Arduino.addDeclaration("NeoLib_enablepll", fix_newline(``));

//add setup
// Blockly.Arduino.addSetup('NeoLib_enablepll', fix_newline(``));

//add code
var code = fix_newline(`
GTCCR = _BV(PSR1); //reset the prescaler
`)

return code;

};


Blockly.Arduino['NeoLib_timsk1'] = function(block) {

var division_factor = get_field_value(block, 'DIVISION_FACTOR');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

// var pin = get_field_value(block, 'PIN');

//add declaration
// Blockly.Arduino.addDeclaration("NeoLib_adcprescale", fix_newline(``));

//add setup
// Blockly.Arduino.addSetup('NeoLib_adcprescale', fix_newline(``));

var get_bitwrite = function(reg_temp, selection){    
    if (selection === 'default') return "";
    var tmp = ""
    var waveform = reg_temp.registers[selection];
    for (let i = 0; i <  waveform.length; i++) {
         tmp = tmp + 'bitWrite('+ reg_temp.reg_address[i]  +','+ reg_temp.reg_param[i] +','+ waveform[i] +')\n';
    }
    return tmp
}
  

var code = "";



code = code + get_bitwrite({
    reg_address: ['TIMSK'],
    reg_param: ['OCIE1A'],
    registers: {
        0: [0],
        1: [1],
    }
}, get_field_value(block, 'TIMER1A_MATCH'))

code = code + get_bitwrite({
    reg_address: ['TIMSK'],
    reg_param: ['OCIE1B'],
    registers: {
        0: [0],
        1: [1],
    }
}, get_field_value(block, 'TIMER1B_MATCH'))

code = code + get_bitwrite({
    reg_address: ['TIMSK'],
    reg_param: ['TOIE1'],
    registers: {
        0: [0],
        1: [1],
    }
}, get_field_value(block, 'TOIE1'))



return code + "\n";

};


Blockly.Arduino['NeoLib_timsk'] = function(block) {

var division_factor = get_field_value(block, 'DIVISION_FACTOR');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

// var pin = get_field_value(block, 'PIN');

//add declaration
// Blockly.Arduino.addDeclaration("NeoLib_adcprescale", fix_newline(``));

//add setup
// Blockly.Arduino.addSetup('NeoLib_adcprescale', fix_newline(``));

var get_bitwrite = function(reg_temp, selection){    
    if (selection === 'default') return "";
    var tmp = ""
    var waveform = reg_temp.registers[selection];
    for (let i = 0; i <  waveform.length; i++) {
         tmp = tmp + 'bitWrite('+ reg_temp.reg_address[i]  +','+ reg_temp.reg_param[i] +','+ waveform[i] +')\n';
    }
    return tmp
}
  

var code = "";


code = code + get_bitwrite({
    reg_address: ['TIMSK'],
    reg_param: ['OCIE0A'],
    registers: {
        0: [0],
        1: [1],
    }
}, get_field_value(block, 'TIMER0A_MATCH'))

code = code + get_bitwrite({
    reg_address: ['TIMSK'],
    reg_param: ['OCIE0B'],
    registers: {
        0: [0],
        1: [1],
    }
}, get_field_value(block, 'TIMER0B_MATCH'))

code = code + get_bitwrite({
    reg_address: ['TIMSK'],
    reg_param: ['TOIE0'],
    registers: {
        0: [0],
        1: [1],
    }
}, get_field_value(block, 'TOIE0'))




return code + "\n";

};


Blockly.Arduino['NeoLib_callfunc'] = function(block) {

//get_field_value(block, 'NeoOneLiner_COUNT');
//get_field_value_atomic(block, 'NeoOneLiner_COUNT');

// var NeoOneLiner_R = get_field_value_atomic(block, 'NeoOneLiner_R');
// var NeoOneLiner_G = get_field_value_atomic(block, 'NeoOneLiner_G');
// var NeoOneLiner_B = get_field_value_atomic(block, 'NeoOneLiner_B');
// var NeoOneLiner_IDX = get_field_value_atomic(block, 'NeoOneLiner_IDX');

var formula = get_field_value(block, 'USER_FORMULA');

//add code
return formula;

};


Blockly.Arduino['NeoLib_fastanalogread'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

var pin = get_field_value(block, 'PIN');

var pinSetupCode = 'pinMode(' + pin + ', INPUT);';

//add declaration
Blockly.Arduino.addDeclaration("NeoLib_fastanalogread", fix_newline(`
int inline analogReadFast(byte ADCpin) 
{ byte ADCSRAoriginal = ADCSRA; 
  ADCSRA = (ADCSRA & B11111000) | 4; 
  int adc = analogRead(ADCpin);  
  ADCSRA = ADCSRAoriginal;
  return adc;
}
`));

//add setup
Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

//add code
var code = 'analogReadFast(' + pin + ')';

Blockly.Arduino.reservePin(block, pin, Blockly.Arduino.PinTypes.INPUT, 'Analogue Read');

Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

return [code, Blockly.Arduino.ORDER_ATOMIC];

};


Blockly.Arduino['NeoLight_setrgb'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

var NEOLIGHT_R = get_field_value_atomic(block, 'NEOLIGHT_R');
var NEOLIGHT_G = get_field_value_atomic(block, 'NEOLIGHT_G');
var NEOLIGHT_B = get_field_value_atomic(block, 'NEOLIGHT_B');
var NEOLIGHT_IDX = get_field_value_atomic(block, 'NEOLIGHT_IDX');

var block_include = `
#include <WS2812.h>
`

var block_declaration = `
cRGB value;
`

var setup = ``

var code = `
value.r = `+NEOLIGHT_R+`; value.g = `+NEOLIGHT_G+`; value.b = `+NEOLIGHT_B+`; // RGB Value -> Blue
LED.set_crgb_at(`+NEOLIGHT_IDX+`, value); // Set value at LED found at index 0
`

//add include
Blockly.Arduino.addInclude("NeoLight", fix_newline(block_include));

//add declaration
Blockly.Arduino.addDeclaration("NeoLight_crgb", fix_newline(block_declaration));

//add setup
Blockly.Arduino.addSetup("NeoLight", fix_newline(setup));

//add code
return code;

};


Blockly.Arduino['NeoLight_setup'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

var led_count = get_field_value(block, 'NEOLIGHT_COUNT');
var output_pin = get_field_value(block, 'NEOLIGHT_PIN');

var block_include = `
#include <WS2812.h>
`

var block_declaration = `
#define LEDCount ` + led_count + `
#define outputPin ` + output_pin + `

WS2812 LED(LEDCount); 
`

var setup = `
LED.setOutput(`+output_pin+`);
`

var code = ``

//add include
Blockly.Arduino.addInclude("NeoLight", fix_newline(block_include));

//add declaration
Blockly.Arduino.addDeclaration("NeoLight", fix_newline(block_declaration));

//add setup
Blockly.Arduino.addSetup("NeoLight", fix_newline(setup));

//add code
return code;

};


Blockly.Arduino['NeoLight_sync'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

var block_include = `
#include <WS2812.h>
`

var block_declaration = ``

var setup = ``

var code = `LED.sync();`

//add include
Blockly.Arduino.addInclude("NeoLight", fix_newline(block_include));

//add declaration
Blockly.Arduino.addDeclaration("NeoLight", fix_newline(block_declaration));

//add setup
Blockly.Arduino.addSetup("NeoLight", fix_newline(setup));

//add code
return code;

};


Blockly.Arduino['NeoOneLiner_formula'] = function(block) {

//get_field_value(block, 'NeoOneLiner_COUNT');
//get_field_value_atomic(block, 'NeoOneLiner_COUNT');

// var NeoOneLiner_R = get_field_value_atomic(block, 'NeoOneLiner_R');
// var NeoOneLiner_G = get_field_value_atomic(block, 'NeoOneLiner_G');
// var NeoOneLiner_B = get_field_value_atomic(block, 'NeoOneLiner_B');
// var NeoOneLiner_IDX = get_field_value_atomic(block, 'NeoOneLiner_IDX');

var formula = get_field_value(block, 'USER_FORMULA');

var block_include = `


`

var block_declaration = `

`

var setup = `


`

var code = `

`

//add include
Blockly.Arduino.addInclude("NeoOneLiner", fix_newline(block_include));

//add declaration
Blockly.Arduino.addDeclaration("NeoOneLiner_crgb", fix_newline(block_declaration));

//add setup
Blockly.Arduino.addSetup("NeoOneLiner", fix_newline(setup));


//add code
return code;

};


Blockly.Arduino['NeoOneLiner_setup'] = function(block) {

//get_field_value(block, 'NeoOneLiner_COUNT');
//get_field_value_atomic(block, 'NeoOneLiner_COUNT');

// var NeoOneLiner_R = get_field_value_atomic(block, 'NeoOneLiner_R');
// var NeoOneLiner_G = get_field_value_atomic(block, 'NeoOneLiner_G');
// var NeoOneLiner_B = get_field_value_atomic(block, 'NeoOneLiner_B');
// var NeoOneLiner_IDX = get_field_value_atomic(block, 'NeoOneLiner_IDX');

var block_include = `
#include <avr/io.h>
#include <util/delay.h>
#include <avr/interrupt.h>
#include <avr/pgmspace.h>
#include <avr/power.h>
#include <WS2812.h>
`

var block_declaration = `
#define LEDCount 8
#define outputPin 0

WS2812 LED(LEDCount);
cRGB value;

#define SONGS_COUNT {{TOTAL_SONG}}

volatile unsigned long t; // long
volatile unsigned long u; // long
volatile uint8_t snd; // 0...255

volatile uint8_t pot1; // 0...255
volatile uint8_t pot2; // 0...255
volatile uint8_t pot3; // 0...255

volatile uint8_t songs = 0;

volatile uint8_t btn1_previous = 1;
volatile uint8_t btn2_previous = 1;

//ADMUX ADC

volatile uint8_t adc1 = _BV(ADLAR) | _BV(MUX0); //PB2-ADC1 pot1
volatile uint8_t adc2 = _BV(ADLAR) | _BV(MUX1); //PB4-ADC2 pot2
volatile uint8_t adc3 = _BV(ADLAR) | _BV(MUX0) | _BV(MUX1); //PB3-ADC3 pot3

#define ENTER_CRIT()    {byte volatile saved_sreg = SREG; cli()
#define LEAVE_CRIT()    SREG = saved_sreg;}

#define true 1
#define false 0

//start neolibcore

//button state
#define BUTTON_NORMAL 0
#define BUTTON_PRESS 1
#define BUTTON_RELEASE 2
#define BUTTON_HOLD 3

// HARDWARE CALIBRATION
#define Vbutton_releaseLevel  100
#define Vbutton_left          90
#define Vbutton_right         70
#define Vbutton_both          60
#define Vbutton_pressedLevel  Vbutton_left

#define Vcc                    37 // 3.7 V for LiPo
#define Vdiv 26 // measure max Voltage on Analog In

//CONSTANTS

#define BUTTON_NOTPRESSED   0
#define BUTTON_PRESSED      1
#define BUTTON_NONE         0
#define BUTTON_LEFT         1
#define BUTTON_RIGHT        2

uint8_t getButton(uint8_t pot_val)
{
  uint8_t  button = BUTTON_NONE;
  uint16_t pinVoltage;

  pinVoltage = pot_val;

  if ( pinVoltage < Vbutton_left  ) button = BUTTON_LEFT;
  if ( pinVoltage < Vbutton_right ) button = BUTTON_RIGHT;
  if ( pinVoltage < Vbutton_both  ) button = BUTTON_LEFT + BUTTON_RIGHT;

  return button;
}


uint8_t wasButtonPressed(uint8_t pot_val)
{
  static uint8_t buttonPressed    = false;
  static uint8_t buttonState      = 0;
  static uint8_t buttonValue      = BUTTON_NONE;
  static uint8_t buttonMaxValue   = 0;

  uint8_t        buttonReturnValue;
  uint16_t       pinVoltage;

  pinVoltage = pot_val;

  // hysteresis switch
  if ( pinVoltage > Vbutton_releaseLevel ) buttonPressed = false;
  if ( pinVoltage < Vbutton_pressedLevel ) buttonPressed = true;

  buttonReturnValue = BUTTON_NONE;

  switch ( buttonState )
  {
    case BUTTON_NOTPRESSED:
      {
        buttonMaxValue = 0;

        if ( buttonPressed )
        {
          buttonState = BUTTON_PRESSED;
        }
      }; break;

    case BUTTON_PRESSED:
      {
        if ( buttonPressed ) // find minimum volage level during button pressed period
        {
          buttonValue = BUTTON_NONE;

          if ( pinVoltage < Vbutton_both  ) buttonValue = BUTTON_LEFT + BUTTON_RIGHT;
          else if ( pinVoltage < Vbutton_right ) buttonValue =               BUTTON_RIGHT;
          else if ( pinVoltage < Vbutton_left  ) buttonValue = BUTTON_LEFT               ;

          if ( buttonValue > buttonMaxValue ) buttonMaxValue = buttonValue;

        } else
        {
          buttonState = BUTTON_NOTPRESSED;
          buttonReturnValue = buttonMaxValue;
        }
        ; break;

      }
  }

  return buttonReturnValue;
}

//end neolibcore

int h = 0;   //stores 0 to 614
byte steps = 15; //number of hues we skip in a 360 range per update

byte sat = 80;
byte val = 10;

void adc_init()
{
  ADCSRA |= _BV(ADIE); //adc interrupt enable
  ADCSRA |= _BV(ADEN); //adc enable
  ADCSRA |= _BV(ADATE); //auto trigger
  ADCSRA |= _BV(ADPS0) | _BV(ADPS1) | _BV(ADPS2); //prescale 128
  ADMUX  = adc3;
  ADCSRB = 0;
}

void adc_start()
{
  ADCSRA |= _BV(ADSC); //start adc conversion
}


void adc_init();
void adc_start();
void timer_init();
void Cycle();
int main(void);

void timer_init()
{
  //no prescale
  clock_prescale_set(clock_div_1);

  //PWM SOUND OUTPUT - FIX
  TCCR0A |= (1 << WGM00) | (1 << WGM01); //Fast pwm

  //TCCR0A |= (1<<WGM00) ; //Phase correct pwm
  //TCCR0A |= (1<<COM0A1); //Clear OC0A/OC0B on Compare Match when up-counting.
  TCCR0A |= (1 << COM0B1); //USE PB1 --> Clear OC0A/OC0B on Compare Match when up-counting.

  TCCR0B |= (1 << CS00); //no prescale

  //TIMER1 SOUND GENERATOR @ 44100hz
  //babygnusb attiny85 clock frequency = 16.5 Mhz

  //TIMER SETUP -- FIX
  TCCR1 |= _BV(CTC1); //clear timer on compare
  TIMSK |= _BV(OCIE1A); //activate compare interruppt
  TCNT1 = 0; //init count

  //TIMER FREQUENCY
  //TCCR1 |= _BV(CS10); // prescale 1
  //TCCR1 |= _BV(CS11); // prescale 2
  TCCR1 |= _BV(CS10) | _BV(CS12); // prescale 16
  //TCCR1 |= _BV(CS11)|_BV(CS12); // prescale 32
  //TCCR1 |= _BV(CS10)|_BV(CS11)|_BV(CS12); // prescale 64
  //TCCR1 |= _BV(CS13); // prescale 128
  //TCCR1 |= _BV(CS10) | _BV(CS13); // prescale 256

  //SAMPLE RATE - FIX
  OCR1C = 120; // (16500000/16)/8000 = 128
  //OCR1C = 45; // (16500000/16)/11025 = 93
  //OCR1C = 22; // (16500000/16)/22050 = 46
  //OCR1C = 23; // (16500000/16)/44100 = 23

  // babygnusb led pin
  DDRB |= (1 << PB1); //pin connected to led

}


void Cycle()
{
  //  value.SetHSV(h, sat, val);

  //  h = snd;
  //  if(h > 360)
  //  {
  //      h %= 360;
  //  }
}


ISR(TIMER1_COMPA_vect)
{
  //sound generator pwm out - FIX
  OCR0B = snd;
  t++;
}

ISR(ADC_vect)
{
  static uint8_t firstTime = 1;
  static uint8_t val;

  val = ADCH;

  if (firstTime == 1) {
    firstTime = 0;
  }
  else if (ADMUX  == adc1) {
    pot3 = val;
    ADMUX = adc2;
  }
  else if ( ADMUX == adc2) {
    pot2  = val;
    ADMUX = adc3;
  }
  else if ( ADMUX == adc3) {
    pot1  = val;
    ADMUX = adc1;
  }

}

int main(void)
{

  setup();

  unsigned int loop_timer = 0;
  unsigned int btn_timer = 0;

  while (1)
  {
    loop_timer++;
    btn_timer++;

    if (btn_timer > 2000)
    {
      uint8_t b = wasButtonPressed(pot3);
  
      if( b == BUTTON_LEFT                )   songs--   ;
      if( b == BUTTON_RIGHT               )   songs++   ;  

      if (songs > 7) songs = 0;
      btn_timer=0;
    }
    
    if (loop_timer > 10000)
    {
        for (uint8_t t = 0; t < 8; t++)
        {
            if(t == songs){
                value.b = 0; value.g = 5; value.r = 0; // RGB Value -> Blue
               LED.set_crgb_at(t, value);
            }else{
              value.b = 5; value.g = 0; value.r = 0; // RGB Value -> Blue
               LED.set_crgb_at(t, value);
            }
        }
        LED.sync();
      loop_timer = 0;
    }


    switch (songs)
    {
        {{FORMULA}}
    }

  } //end while
  return 0;
}

`

var setup = `
LED.setOutput(outputPin);
//  Cycle();

for (int i = 0; i < LEDCount; i++)
{
  value.b = 255; value.g = 0; value.r = 0; // RGB Value -> Blue
  LED.set_crgb_at(i, value);
}

// Sends the data to the LEDs
LED.sync();
timer_init();// initialize timer & Pwm
adc_init(); //init adc
sei(); //enable global interrupt
adc_start(); //start adc conversion

// run forever

songs = 0;
`


var firstChild = this.getChildren()[0];
var res = 0;
var resultArray = [];
var currentBlock = firstChild;

var mixtape = ""

while (currentBlock) {
  var formula = (get_field_value(currentBlock, 'USER_FORMULA'))  
  mixtape = mixtape + `case ` + res + `: snd = ` + formula + `; break;` + "\n\n";  
  currentBlock = currentBlock.getNextBlock();
  res = res + 1;
}

block_declaration = block_declaration.replace("{{TOTAL_SONG}}", res-1);
block_declaration = block_declaration.replace("{{FORMULA}}", mixtape);

//add include
Blockly.Arduino.addInclude("NeoOneLiner", fix_newline(block_include));

//add declaration
Blockly.Arduino.addDeclaration("NeoOneLiner_crgb", fix_newline(block_declaration));

//add setup
Blockly.Arduino.addSetup("NeoOneLiner", fix_newline(setup));

//code
var code = '';

//add code
return code;

};

