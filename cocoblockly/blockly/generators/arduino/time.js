/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino code generator for the Time blocks.
 *     Arduino built-in function docs: http://arduino.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.Arduino.time');

goog.require('Blockly.Arduino');


/**
 * Code generator for the delay Arduino block.
 * Arduino code: loop { delay(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.Arduino['time_delay'] = function(block) {
  var delayTime = Blockly.Arduino.valueToCode(
      block, 'DELAY_TIME_MILI', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'delay(' + delayTime + ');\n';
  return code;
};

/**
 * Code generator for the delayMicroseconds block.
 * Arduino code: loop { delayMicroseconds(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.Arduino['time_delaymicros'] = function(block) {
  var delayTimeMs = Blockly.Arduino.valueToCode(
      block, 'DELAY_TIME_MICRO', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'delayMicroseconds(' + delayTimeMs + ');\n';
  return code;
};

/**
 * Code generator for the elapsed time in milliseconds block.
 * Arduino code: loop { millis() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
 Blockly.Arduino['time_millis'] = function(block) {
  var code = 'millis()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Code generator for the elapsed time in microseconds block.
 * Arduino code: loop { micros() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
 Blockly.Arduino['time_micros'] = function(block) {
  var code = 'micros()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Code generator for the wait forever (end of program) block
 * Arduino code: loop { while(true); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
 Blockly.Arduino['infinite_loop'] = function(block) {
  return 'while(true);\n';
};




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


