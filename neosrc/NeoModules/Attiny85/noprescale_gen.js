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

