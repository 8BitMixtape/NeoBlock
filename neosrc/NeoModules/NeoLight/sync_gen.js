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

