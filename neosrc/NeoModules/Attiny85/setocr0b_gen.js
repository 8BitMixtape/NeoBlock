Blockly.Arduino['NeoLib_setOCR0B'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

var OCR0B = get_field_value_atomic(block, 'OCR0B');

var code = `
OCR0B = `+OCR0B+`;`

//add code
return code;

};

