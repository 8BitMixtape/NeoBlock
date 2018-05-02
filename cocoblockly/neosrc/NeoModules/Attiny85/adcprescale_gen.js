Blockly.Arduino['NeoLib_adcprescale'] = function(block) {

var division_factor = get_field_value(block, 'DIVISION_FACTOR');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

// var pin = get_field_value(block, 'PIN');

//add declaration
// Blockly.Arduino.addDeclaration("NeoLib_adcprescale", fix_newline(``));

//add setup
// Blockly.Arduino.addSetup('NeoLib_adcprescale', fix_newline(``));

var code = "ADCSRA |= ";

switch (division_factor) {
    case "2":
        code += '_BV(ADPS0);';
        break;
    case "4":
        code += '_BV(ADPS1);';        
        break;
    case "8":
        code += '_BV(ADPS1)|_BV(ADPS0);';
        break;
    case "16":
        code += '_BV(ADPS2);';        
        break;
    case "32":
        code += '_BV(ADPS2)|_BV(ADPS0);';        
        break;
    case "64":
        code += '_BV(ADPS2)|_BV(ADPS1);';     
        break
    case "128":
        code += '_BV(ADPS2)|_BV(ADPS1)|_BV(ADPS0);';     
        break        
    default:
        break;
}

return code + "\n";

};

