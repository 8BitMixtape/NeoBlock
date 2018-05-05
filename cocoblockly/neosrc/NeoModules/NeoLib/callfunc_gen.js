Blockly.Arduino['NeoLib_callfunc'] = function(block) {

//get_field_value(block, 'NeoOneLiner_COUNT');
//get_field_value_atomic(block, 'NeoOneLiner_COUNT');

// var NeoOneLiner_R = get_field_value_atomic(block, 'NeoOneLiner_R');
// var NeoOneLiner_G = get_field_value_atomic(block, 'NeoOneLiner_G');
// var NeoOneLiner_B = get_field_value_atomic(block, 'NeoOneLiner_B');
// var NeoOneLiner_IDX = get_field_value_atomic(block, 'NeoOneLiner_IDX');

var formula = get_field_value(block, 'USER_FORMULA');

//add code
return formula;

};

