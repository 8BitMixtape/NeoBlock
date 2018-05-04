Blockly.Arduino['NeoLib_timerb'] = function(block) {
    
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
        reg_address: ['TCCR1'],
        reg_param: ['CTC1'],
        registers: {
            0: [0],
            1: [1],
        }
    }
    
    code = code + get_bitwrite(register_template, get_field_value(block, 'CTC_ENABLE'))
    
    var register_template = {
        reg_address: ['TCCR1'],
        reg_param: ['PWM1A'],
        registers: {
            0: [0],
            1: [1],
        }
    }
    
    code = code + get_bitwrite(register_template, get_field_value(block, 'PWM_ENABLE'))
    

    register_template = {
        reg_address: ['TCCR1', 'TCCR1'],
        reg_param: ['COM1A1', 'COM1A0'],
        registers: {
            0: [0,0],
            1: [0,1],
            2: [1,0],
            3: [1,1],
            4: [0,0],
            5: [0,1],
            6: [1,0],
            7: [1,1]            
        }
    }
    
    code = code + get_bitwrite(register_template, get_field_value(block, 'COMPARATOR_MODE_NORMAL'))
    

    var register_template = {
        reg_address: ['TCCR1','TCCR1', 'TCCR1', 'TCCR1'],
        reg_param: ['CS13', 'CS12', 'CS11', 'CS10'],
        registers: {
            0: [0,0,0,0],
            1: [0,0,0,1],
            2: [0,0,1,0],
            3: [0,0,1,1],
            4: [0,1,0,0],
            5: [0,1,0,1],
            6: [0,1,1,0],
            7: [0,1,1,1],
            8: [1,0,0,0],
            9: [1,0,0,1],
            10: [1,0,1,0],
            11: [1,0,1,1],
            12: [1,1,0,0],
            13: [1,1,0,1],
            14: [1,1,1,0],
            15: [1,1,1,1]
        }
    }
    
    code = code + get_bitwrite(register_template, get_field_value(block, 'PRESCALE_SELECT'))
    
    return code + "\n";
    
    };
    
    