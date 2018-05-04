Blockly.Arduino['NeoLib_timera'] = function(block) {

// var waverform_mode = get_field_value(block, 'WAVEFORM_MODE');
// var compare_mode = get_field_value(block, 'COMPARE_MODE');
var clock_select = get_field_value(block, 'CLOCK_SELECT');

//add declaration
Blockly.Arduino.addDeclaration("NeoLib_bitwrite", fix_newline(`
#define bitRead(value, bit) (((value) >> (bit)) & 0x01)
#define bitSet(value, bit) ((value) |= (1UL << (bit)))
#define bitClear(value, bit) ((value) &= ~(1UL << (bit)))
#define bitWrite(value, bit, bitvalue) (bitvalue ? bitSet(value, bit) : bitClear(value, bit))
`));

//add setup
// Blockly.Arduino.addSetup('NeoLib_adcprescale', fix_newline(``));

var get_bitwrite = function(reg_temp, selection){    
    if (selection === 'default') return "";
    var tmp = ""
    var waveform = reg_temp.registers[selection];
    for (let i = 0; i <  waveform.length; i++) {
         tmp = tmp + 'bitWrite('+ register_template.reg_address[i]  +','+ register_template.reg_param[i] +','+ waveform[i] +')\n';
    }
    return tmp
}
  
var registers = [];
var code = "";

var register_template = {
    reg_address: ['TCCR0B', 'TCCR0A', 'TCCR0A'],
    reg_param: ['WGM02', 'WGM01', 'WGM00'],
    registers: {
        0: [0,0,0],
        1: [0,0,1],
        2: [0,1,0],
        3: [0,1,1],
        4: [1,0,0],
        5: [1,0,1],
        6: [1,1,0],
        7: [1,1,1]
    }
}

code = code + get_bitwrite(register_template, get_field_value(block, 'WAVEFORM_MODE'))

register_template = {
    reg_address: ['TCCR0A', 'TCCR0A'],
    reg_param: ['COM0A1', 'COM0A0'],
    registers: {
        0: [0,0],
        1: [0,1],
        2: [1,0],
        3: [1,1]
    }
}

code = code + get_bitwrite(register_template, get_field_value(block, 'COMPARE_MODE_A'))


register_template = {
    reg_address: ['TCCR0A', 'TCCR0A'],
    reg_param: ['COM0B1', 'COM0B0'],
    registers: {
        0: [0,0],
        1: [0,1],
        2: [1,0],
        3: [1,1]
    }
}

code = code + get_bitwrite(register_template, get_field_value(block, 'COMPARE_MODE_B'))


register_template = {
    reg_address: ['TCCR0B', 'TCCR0B', 'TCCR0B'],
    reg_param: ['CS02', 'CS01', 'CS00'],
    registers: {
        0: [0,0,0],
        1: [0,0,1],
        2: [0,1,0],
        3: [0,1,1],
        4: [1,0,0],
        5: [1,0,1],
        6: [1,1,0],
        7: [1,1,1]
    }
}

code = code + get_bitwrite(register_template, get_field_value(block, 'CLOCK_SELECT'))


return code + "\n";

};

