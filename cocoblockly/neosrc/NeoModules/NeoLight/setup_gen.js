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

