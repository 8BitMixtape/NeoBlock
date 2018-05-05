Blockly.Arduino['NeoOneLiner_setup'] = function(block) {

//get_field_value(block, 'NeoOneLiner_COUNT');
//get_field_value_atomic(block, 'NeoOneLiner_COUNT');

// var NeoOneLiner_R = get_field_value_atomic(block, 'NeoOneLiner_R');
// var NeoOneLiner_G = get_field_value_atomic(block, 'NeoOneLiner_G');
// var NeoOneLiner_B = get_field_value_atomic(block, 'NeoOneLiner_B');
// var NeoOneLiner_IDX = get_field_value_atomic(block, 'NeoOneLiner_IDX');

var block_include = `
#include <avr/io.h>
#include <util/delay.h>
#include <avr/interrupt.h>
#include <avr/pgmspace.h>
#include <avr/power.h>
#include <WS2812.h>
`

var block_declaration = `
#define LEDCount 8
#define outputPin 0

WS2812 LED(LEDCount);
cRGB value;

#define SONGS_COUNT {{TOTAL_SONG}}

volatile unsigned long t; // long
volatile unsigned long u; // long
volatile uint8_t snd; // 0...255

volatile uint8_t pot1; // 0...255
volatile uint8_t pot2; // 0...255
volatile uint8_t pot3; // 0...255

volatile uint8_t songs = 0;

volatile uint8_t btn1_previous = 1;
volatile uint8_t btn2_previous = 1;

//ADMUX ADC

volatile uint8_t adc1 = _BV(ADLAR) | _BV(MUX0); //PB2-ADC1 pot1
volatile uint8_t adc2 = _BV(ADLAR) | _BV(MUX1); //PB4-ADC2 pot2
volatile uint8_t adc3 = _BV(ADLAR) | _BV(MUX0) | _BV(MUX1); //PB3-ADC3 pot3

#define ENTER_CRIT()    {byte volatile saved_sreg = SREG; cli()
#define LEAVE_CRIT()    SREG = saved_sreg;}

#define true 1
#define false 0

//start neolibcore

//button state
#define BUTTON_NORMAL 0
#define BUTTON_PRESS 1
#define BUTTON_RELEASE 2
#define BUTTON_HOLD 3

// HARDWARE CALIBRATION
#define Vbutton_releaseLevel  100
#define Vbutton_left          90
#define Vbutton_right         70
#define Vbutton_both          60
#define Vbutton_pressedLevel  Vbutton_left

#define Vcc                    37 // 3.7 V for LiPo
#define Vdiv 26 // measure max Voltage on Analog In

//CONSTANTS

#define BUTTON_NOTPRESSED   0
#define BUTTON_PRESSED      1
#define BUTTON_NONE         0
#define BUTTON_LEFT         1
#define BUTTON_RIGHT        2

uint8_t getButton(uint8_t pot_val)
{
  uint8_t  button = BUTTON_NONE;
  uint16_t pinVoltage;

  pinVoltage = pot_val;

  if ( pinVoltage < Vbutton_left  ) button = BUTTON_LEFT;
  if ( pinVoltage < Vbutton_right ) button = BUTTON_RIGHT;
  if ( pinVoltage < Vbutton_both  ) button = BUTTON_LEFT + BUTTON_RIGHT;

  return button;
}


uint8_t wasButtonPressed(uint8_t pot_val)
{
  static uint8_t buttonPressed    = false;
  static uint8_t buttonState      = 0;
  static uint8_t buttonValue      = BUTTON_NONE;
  static uint8_t buttonMaxValue   = 0;

  uint8_t        buttonReturnValue;
  uint16_t       pinVoltage;

  pinVoltage = pot_val;

  // hysteresis switch
  if ( pinVoltage > Vbutton_releaseLevel ) buttonPressed = false;
  if ( pinVoltage < Vbutton_pressedLevel ) buttonPressed = true;

  buttonReturnValue = BUTTON_NONE;

  switch ( buttonState )
  {
    case BUTTON_NOTPRESSED:
      {
        buttonMaxValue = 0;

        if ( buttonPressed )
        {
          buttonState = BUTTON_PRESSED;
        }
      }; break;

    case BUTTON_PRESSED:
      {
        if ( buttonPressed ) // find minimum volage level during button pressed period
        {
          buttonValue = BUTTON_NONE;

          if ( pinVoltage < Vbutton_both  ) buttonValue = BUTTON_LEFT + BUTTON_RIGHT;
          else if ( pinVoltage < Vbutton_right ) buttonValue =               BUTTON_RIGHT;
          else if ( pinVoltage < Vbutton_left  ) buttonValue = BUTTON_LEFT               ;

          if ( buttonValue > buttonMaxValue ) buttonMaxValue = buttonValue;

        } else
        {
          buttonState = BUTTON_NOTPRESSED;
          buttonReturnValue = buttonMaxValue;
        }
        ; break;

      }
  }

  return buttonReturnValue;
}

//end neolibcore

int h = 0;   //stores 0 to 614
byte steps = 15; //number of hues we skip in a 360 range per update

byte sat = 80;
byte val = 10;

void adc_init()
{
  ADCSRA |= _BV(ADIE); //adc interrupt enable
  ADCSRA |= _BV(ADEN); //adc enable
  ADCSRA |= _BV(ADATE); //auto trigger
  ADCSRA |= _BV(ADPS0) | _BV(ADPS1) | _BV(ADPS2); //prescale 128
  ADMUX  = adc3;
  ADCSRB = 0;
}

void adc_start()
{
  ADCSRA |= _BV(ADSC); //start adc conversion
}


void adc_init();
void adc_start();
void timer_init();
void Cycle();
int main(void);

void timer_init()
{
  //no prescale
  clock_prescale_set(clock_div_1);

  //PWM SOUND OUTPUT - FIX
  TCCR0A |= (1 << WGM00) | (1 << WGM01); //Fast pwm

  //TCCR0A |= (1<<WGM00) ; //Phase correct pwm
  //TCCR0A |= (1<<COM0A1); //Clear OC0A/OC0B on Compare Match when up-counting.
  TCCR0A |= (1 << COM0B1); //USE PB1 --> Clear OC0A/OC0B on Compare Match when up-counting.

  TCCR0B |= (1 << CS00); //no prescale

  //TIMER1 SOUND GENERATOR @ 44100hz
  //babygnusb attiny85 clock frequency = 16.5 Mhz

  //TIMER SETUP -- FIX
  TCCR1 |= _BV(CTC1); //clear timer on compare
  TIMSK |= _BV(OCIE1A); //activate compare interruppt
  TCNT1 = 0; //init count

  //TIMER FREQUENCY
  //TCCR1 |= _BV(CS10); // prescale 1
  //TCCR1 |= _BV(CS11); // prescale 2
  TCCR1 |= _BV(CS10) | _BV(CS12); // prescale 16
  //TCCR1 |= _BV(CS11)|_BV(CS12); // prescale 32
  //TCCR1 |= _BV(CS10)|_BV(CS11)|_BV(CS12); // prescale 64
  //TCCR1 |= _BV(CS13); // prescale 128
  //TCCR1 |= _BV(CS10) | _BV(CS13); // prescale 256

  //SAMPLE RATE - FIX
  OCR1C = 120; // (16500000/16)/8000 = 128
  //OCR1C = 45; // (16500000/16)/11025 = 93
  //OCR1C = 22; // (16500000/16)/22050 = 46
  //OCR1C = 23; // (16500000/16)/44100 = 23

  // babygnusb led pin
  DDRB |= (1 << PB1); //pin connected to led

}


void Cycle()
{
  //  value.SetHSV(h, sat, val);

  //  h = snd;
  //  if(h > 360)
  //  {
  //      h %= 360;
  //  }
}


ISR(TIMER1_COMPA_vect)
{
  //sound generator pwm out - FIX
  OCR0B = snd;
  t++;
}

ISR(ADC_vect)
{
  static uint8_t firstTime = 1;
  static uint8_t val;

  val = ADCH;

  if (firstTime == 1) {
    firstTime = 0;
  }
  else if (ADMUX  == adc1) {
    pot3 = val;
    ADMUX = adc2;
  }
  else if ( ADMUX == adc2) {
    pot2  = val;
    ADMUX = adc3;
  }
  else if ( ADMUX == adc3) {
    pot1  = val;
    ADMUX = adc1;
  }

}

int main(void)
{

  setup();

  unsigned int loop_timer = 0;
  unsigned int btn_timer = 0;

  while (1)
  {
    loop_timer++;
    btn_timer++;

    if (btn_timer > 2000)
    {
      uint8_t b = wasButtonPressed(pot3);
  
      if( b == BUTTON_LEFT                )   songs--   ;
      if( b == BUTTON_RIGHT               )   songs++   ;  

      if (songs > 7) songs = 0;
      btn_timer=0;
    }
    
    if (loop_timer > 10000)
    {
        for (uint8_t t = 0; t < 8; t++)
        {
            if(t == songs){
                value.b = 0; value.g = 5; value.r = 0; // RGB Value -> Blue
               LED.set_crgb_at(t, value);
            }else{
              value.b = 5; value.g = 0; value.r = 0; // RGB Value -> Blue
               LED.set_crgb_at(t, value);
            }
        }
        LED.sync();
      loop_timer = 0;
    }


    switch (songs)
    {
        {{FORMULA}}
    }

  } //end while
  return 0;
}

`

var setup = `
LED.setOutput(outputPin);
//  Cycle();

for (int i = 0; i < LEDCount; i++)
{
  value.b = 255; value.g = 0; value.r = 0; // RGB Value -> Blue
  LED.set_crgb_at(i, value);
}

// Sends the data to the LEDs
LED.sync();
timer_init();// initialize timer & Pwm
adc_init(); //init adc
sei(); //enable global interrupt
adc_start(); //start adc conversion

// run forever

songs = 0;
`


var firstChild = this.getChildren()[0];
var res = 0;
var resultArray = [];
var currentBlock = firstChild;

var mixtape = ""

while (currentBlock) {
  var formula = (get_field_value(currentBlock, 'USER_FORMULA'))  
  mixtape = mixtape + `case ` + res + `: snd = ` + formula + `; break;` + "\n\n";  
  currentBlock = currentBlock.getNextBlock();
  res = res + 1;
}

block_declaration = block_declaration.replace("{{TOTAL_SONG}}", res-1);
block_declaration = block_declaration.replace("{{FORMULA}}", mixtape);

//add include
Blockly.Arduino.addInclude("NeoOneLiner", fix_newline(block_include));

//add declaration
Blockly.Arduino.addDeclaration("NeoOneLiner_crgb", fix_newline(block_declaration));

//add setup
Blockly.Arduino.addSetup("NeoOneLiner", fix_newline(setup));

//code
var code = '';

//add code
return code;

};

