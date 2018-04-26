Blockly.Arduino['NeoLight_setup'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

var led_count = get_field_value(block, 'NEOLIGHT_COUNT');
var output_pin = get_field_value(block, 'NEOLIGHT_PIN');

var block_include = `
#include <WS2812.h>
`

var block_declaration = `
include <test2.h>
`

var setup = `

`

var code = `

`

//add setup
Blockly.Arduino.addSetup("NeoLight", setup);

//add include
Blockly.Arduino.addInclude("NeoLight", block_include);

//add declaration
Blockly.Arduino.addDeclaration("NeoLight", block_declaration);

//add code
return [code, Blockly.Arduino.ORDER_NONE];


};

