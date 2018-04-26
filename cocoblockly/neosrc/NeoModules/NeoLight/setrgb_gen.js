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

