Blockly.Arduino['NeoLib_interrupt'] = function(block) {

    var statements_do_blocks = Blockly.Arduino.statementToCode(block, 'INTERRUPT_STATEMENT');
    var division_factor = get_field_value(block, 'INTERRUPT');

    var block_include = ``
    
    var block_declaration = ``
    

    //add include
    // Blockly.Arduino.addInclude("NeoOneLiner", fix_newline(block_include));
    
    //add declaration
    // Blockly.Arduino.addDeclaration("NeoOneLiner_crgb", fix_newline(block_declaration));
    
    //add setup
    // Blockly.Arduino.addSetup("NeoOneLiner", fix_newline(setup));
    
    //code
var code = `
ISR(`+division_factor+`)
{
`+ statements_do_blocks +`
}
`;
    
Blockly.Arduino.addDeclaration("NeoLib_interrupt_" + division_factor , fix_newline(code));

    //add code
    return "";
    
    };
    
    