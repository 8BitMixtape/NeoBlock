cp ./blockly/arduino_compressed.js ./cocoblockly/blockly/
cp ./blockly/blockly_compressed.js ./cocoblockly/blockly/
cp ./blockly/blocks_compressed.js ./cocoblockly/blockly/
cp ./blockly/msg/js/en.js ./cocoblockly/blockly/


rm -fr ./cocoblockly/blockly/blocks/arduino
rm -fr ./cocoblockly/blockly/generators/

mkdir -p ./cocoblockly/blockly/blocks/
mkdir -p ./cocoblockly/blockly/generators/arduino/


cp -r ./blockly/blocks/arduino ./cocoblockly/blockly/blocks
cp ./blockly/generators/arduino/* ./cocoblockly/blockly/generators/arduino/
cp -r ./blockly/generators/arduino.js ./cocoblockly/blockly/generators
