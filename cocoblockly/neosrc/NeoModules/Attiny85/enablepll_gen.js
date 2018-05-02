Blockly.Arduino['NeoLib_enablepll'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

// var pin = get_field_value(block, 'PIN');

//add declaration
// Blockly.Arduino.addDeclaration("NeoLib_enablepll", fix_newline(``));

//add setup
// Blockly.Arduino.addSetup('NeoLib_enablepll', fix_newline(``));

//add code
var code = fix_newline(`
//START PLL ENABLE
PLLCSR |= (1 << PLLE);               // Enable PLL (64 MHz)
_delay_us(100);                      // Wait for a steady state
while (!(PLLCSR & (1 << PLOCK)));    // Ensure PLL lock: do nothing while the bit PLOCK in register PLLCSR is false
PLLCSR |= (1 << PCKE);               // Enable PLL as clock source for timer 1
//END PLL ENABLE
`)

return code;

};

