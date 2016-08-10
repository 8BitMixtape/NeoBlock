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
 '\nuint8_t note_off = 0;  '  + 
 '\nuint16_t offset_adc = 0;  '  + 
 '\n  '  + 
 '\nchar key[] = {\' \'};  '  + 
 '\nint keyTotal = 1;  '  + 
 '\n  '  + 
 '\nunsigned long previousMillis = 0; // will store last time LED was updated  '  + 
 '\n  '  + 
 '\nint keyCount = -1;  '  + 
 '\nint ledPin = PB0;  '  + 
 '\nint velocityThreshold = 80;  '  + 
 '\n  '  + 
 '\nint filtered_value = 0;  '  + 
 '\nuint8_t pin_queue = 0;  '  + 
 '\n  '  + 
 '\n//cocoTouch pin  '  + 
 '\n#define ADC_REF_PIN PB2  '  + 
 '\n#define ADC_SENSE_PIN PB4  '  + 
 '\n  '  + 
 '\nvoid usb_poll()  '  + 
 '\n{  '  + 
 '\n  usbPoll();  '  + 
 '\n}  ' ; 


var varSetup = 
 '\nCocoTouch.begin();  '  + 
 '\nCocoTouch.setAdcSpeed(4);  '  + 
 '\nCocoTouch.delay = 4;  '  + 
 '\n//TeenyTouchDusjagr.delay_cb = &delay;  '  + 
 '\nCocoTouch.usb_poll = &usb_poll;  '  + 
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

var declare = 'CocoSynth synth;\n'
+'\n//disable millis'
+'\n//make timer available for CocoSynth'
+'\nint main(void)'
+'\n{'
+'\n    //init();'
+'\n    setup();'
+'\n    for (;;)'
+'\n        loop();'
+'\n    return 0;'
+'\n}'


  Blockly.Arduino.addInclude('cocosynth', "#include <CocoSynth.h>");
  Blockly.Arduino.addDeclaration('cocosynth', declare);



  Blockly.Arduino.addSetup('cocosynth', 'synth.begin();', true);

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

Blockly.Arduino['cocosynth_interval_function'] = function(block) {
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
