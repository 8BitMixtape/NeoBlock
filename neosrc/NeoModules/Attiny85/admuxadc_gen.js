Blockly.Arduino['NeoLib_admuxadc'] = function(block) {

var division_factor = get_field_value(block, 'ADC_CHANNEL');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

// var pin = get_field_value(block, 'PIN');

//add declaration
Blockly.Arduino.addDeclaration("NeoLib_admuxadc", fix_newline(`
#define adc1 _BV(ADLAR) | _BV(MUX0) 
#define adc2 _BV(ADLAR) | _BV(MUX1) 
#define adc3 _BV(ADLAR) | _BV(MUX0) | _BV(MUX1)
`));

//add setup
// Blockly.Arduino.addSetup('NeoLib_admuxadc', fix_newline(``));

var code = "ADMUX = ";

switch (division_factor) {
    case "ADC1":
        code += 'adc1; //PB2-ADC1 pot1';
        break;
    case "ADC2":
        code += 'adc2; //PB4-ADC2 pot2';        
        break;
    case "ADC3":
        code += 'adc3; //PB3-ADC3 pot3';
        break;    
    default:
        break;
}

return code + "\n";

};

