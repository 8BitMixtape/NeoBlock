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

