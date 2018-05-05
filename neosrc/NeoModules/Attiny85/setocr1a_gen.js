Blockly.Arduino['NeoLib_setOCR1A'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

var OCR0A = get_field_value_atomic(block, 'OCR0A');

var code = `
OCR1A = `+OCR0A+`;`

//add code
return code;

};

