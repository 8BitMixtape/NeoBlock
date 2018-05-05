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

