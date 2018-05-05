Blockly.Arduino['NeoLib_setTCNT0'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

var OCR0A = get_field_value_atomic(block, 'OCR0A');

var code = `
TCNT0 = `+OCR0A+`;`

//add code
return code;

};

