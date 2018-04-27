Blockly.Arduino['NeoOneLiner_formula'] = function(block) {

//get_field_value(block, 'NeoOneLiner_COUNT');
//get_field_value_atomic(block, 'NeoOneLiner_COUNT');

// var NeoOneLiner_R = get_field_value_atomic(block, 'NeoOneLiner_R');
// var NeoOneLiner_G = get_field_value_atomic(block, 'NeoOneLiner_G');
// var NeoOneLiner_B = get_field_value_atomic(block, 'NeoOneLiner_B');
// var NeoOneLiner_IDX = get_field_value_atomic(block, 'NeoOneLiner_IDX');

var formula = get_field_value(block, 'USER_FORMULA');

var block_include = `


`

var block_declaration = `

`

var setup = `


`

var code = `

`

//add include
Blockly.Arduino.addInclude("NeoOneLiner", fix_newline(block_include));

//add declaration
Blockly.Arduino.addDeclaration("NeoOneLiner_crgb", fix_newline(block_declaration));

//add setup
Blockly.Arduino.addSetup("NeoOneLiner", fix_newline(setup));


//add code
return code;

};

