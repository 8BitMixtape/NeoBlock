Blockly.Arduino['NeoLib_timerb'] = function(block) {

var division_factor = get_field_value(block, 'DIVISION_FACTOR');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

// var pin = get_field_value(block, 'PIN');

//add declaration
// Blockly.Arduino.addDeclaration("NeoLib_adcprescale", fix_newline(``));

//add setup
// Blockly.Arduino.addSetup('NeoLib_adcprescale', fix_newline(``));

var code = "ADMUX |= ";

switch (division_factor) {
    case "0":
        code += '0;';
        break;
    case "1":
        code += '_BV(REFS0);';        
        break;
    case "2":
        code += '_BV(REFS1);';
        break;
    case "3":
        code += '_BV(REFS2)|_BV(REFS1);';        
        break;   
    case "4":
        code += '_BV(REFS2)|_BV(REFS1)|_BV(REFS0);';        
        break;         
    default:
        break;
}

return code + "\n";

};

