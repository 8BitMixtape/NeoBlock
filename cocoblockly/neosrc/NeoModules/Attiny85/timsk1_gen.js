Blockly.Arduino['NeoLib_timsk1'] = function(block) {

var division_factor = get_field_value(block, 'DIVISION_FACTOR');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

// var pin = get_field_value(block, 'PIN');

//add declaration
// Blockly.Arduino.addDeclaration("NeoLib_adcprescale", fix_newline(``));

//add setup
// Blockly.Arduino.addSetup('NeoLib_adcprescale', fix_newline(``));

var get_bitwrite = function(reg_temp, selection){    
    if (selection === 'default') return "";
    var tmp = ""
    var waveform = reg_temp.registers[selection];
    for (let i = 0; i <  waveform.length; i++) {
         tmp = tmp + 'bitWrite('+ reg_temp.reg_address[i]  +','+ reg_temp.reg_param[i] +','+ waveform[i] +')\n';
    }
    return tmp
}
  

var code = "";



code = code + get_bitwrite({
    reg_address: ['TIMSK'],
    reg_param: ['OCIE0A'],
    registers: {
        0: [0],
        1: [1],
    }
}, get_field_value(block, 'TIMER1A_MATCH'))

code = code + get_bitwrite({
    reg_address: ['TIMSK'],
    reg_param: ['OCIE0B'],
    registers: {
        0: [0],
        1: [1],
    }
}, get_field_value(block, 'TIMER1B_MATCH'))

code = code + get_bitwrite({
    reg_address: ['TIMSK'],
    reg_param: ['TOIE1'],
    registers: {
        0: [0],
        1: [1],
    }
}, get_field_value(block, 'TOIE1'))



return code + "\n";

};

