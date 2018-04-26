
Blockly.Arduino['NeoLight_setup'] = function(block) {

  var get_block_value_atomic = function(block, value_name) {
      return Blockly.Arduino.valueToCode(block, value_name, Blockly.Arduino.ORDER_ATOMIC) || '0';
  }

  var led_count = get_block_value_atomic(block, 'NEOLIGHT_COUNT');
  var output_pin = get_block_value_atomic(block, 'NEOLIGHT_PIN');

  var block_include = `
  #include <WS2812.h>
  `;

  var block_declaration = `
  #define LEDCount '+ led_count +'\
  #define outputPin '+ output_pin +'\
  `;

  var code = ____include(esc('./setup_gen.txt'));

  //add include
  Blockly.Arduino.addInclude("NeoLight", block_include);
  
  //add declaration
  Blockly.Arduino.addDeclaration("NeoLight", block_declaration);

  //add code
  return [code, Blockly.Arduino.ORDER_NONE];
};

