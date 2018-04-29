Blockly.Arduino['NeoLib_fastanalogread'] = function(block) {

//get_field_value(block, 'NEOLIGHT_COUNT');
//get_field_value_atomic(block, 'NEOLIGHT_COUNT');

var pin = get_field_value(block, 'PIN');

var pinSetupCode = 'pinMode(' + pin + ', INPUT);';

//add declaration
Blockly.Arduino.addDeclaration("NeoLib_fastanalogread", fix_newline(`
int inline analogReadFast(byte ADCpin) 
{ byte ADCSRAoriginal = ADCSRA; 
  ADCSRA = (ADCSRA & B11111000) | 4; 
  int adc = analogRead(ADCpin);  
  ADCSRA = ADCSRAoriginal;
  return adc;
}
`));

//add setup
Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

//add code
var code = 'analogReadFast(' + pin + ')';

Blockly.Arduino.reservePin(block, pin, Blockly.Arduino.PinTypes.INPUT, 'Analogue Read');

Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

return [code, Blockly.Arduino.ORDER_ATOMIC];

};

