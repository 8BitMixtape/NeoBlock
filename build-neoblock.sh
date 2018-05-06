cd cocoblockly
npm install
gulp xml
gulp



mkdir toolchain
mkdir temp
mkdir -p toolchain/platform/8BitMixtape/hardware/avr/
wget https://raw.githubusercontent.com/8BitMixtape/8BitMixtape.github.io/master/boards/8bitmixtape-0.0.28.tar.gz
tar -zxvf 8bitmixtape-0.0.28.tar.gz -C temp
mv temp/avr toolchain/platform/8BitMixtape/hardware/avr/0.0.28

#osx
mkdir -p toolchain/tools_osx
wget https://downloads.arduino.cc/arduino-1.8.4-macosx.zip
unzip arduino-1.8.4-macosx.zip "Arduino.app/Contents/Java/hardware/*"
unzip arduino-1.8.4-macosx.zip "Arduino.app/Contents/Java/tools-builder/*"
unzip arduino-1.8.4-macosx.zip "Arduino.app/Contents/Java/libraries/*"
unzip arduino-1.8.4-macosx.zip "Arduino.app/Contents/Java/arduino-builder"
mv "Arduino.app/Contents/Java/hardware/hardware" ./toolchain/tools_osx
mv "Arduino.app/Contents/Java/tools-builder" ./toolchain/tools_osx
mv "Arduino.app/Contents/Java/arduino-builder" ./toolchain/tools_osx
mv "Arduino.app/Contents/Java/libraries" ./toolchain/libraries
rm -fr Arduino.app

#windows
#wget https://downloads.arduino.cc/arduino-1.8.4-windows.zip
#unzip arduino-1.8.4-windows.zip "arduino-1.8.4/arduino-builder.exe"
#unzip arduino-1.8.4-windows.zip "arduino-1.8.4/hardware/tools/*"
#mv arduino-1.8.4/hardware/tools ./tools_win
#mv arduino-1.8.4/arduino-builder.exe ./tools_win
#rm -fr arduino-1.8.4

#linux 64
#wget https://downloads.arduino.cc/arduino-1.8.4-linux64.tar.xz
#tar xf arduino-1.8.4-linux64.tar.xz
#mkdir tools_linux64
#mv arduino-1.8.4/arduino-builder  ./tools_linux64
#mv arduino-1.8.4/hardware/tools/*  ./tools_linux64

#linux 32
#wget https://downloads.arduino.cc/arduino-1.8.4-linux32.tar.xz
#tar xf arduino-1.8.4-linux32.tar.xz
#mkdir tools_linux32
#mv arduino-1.8.4/arduino-builder  ./tools_linux32
#mv arduino-1.8.4/hardware/tools/*  ./tools_linux32


npm run buildosx
#npm run buildwin
#npm run buildlinux

cp -r toolchain NeoBlock-darwin-x64/NeoBlock.app/Contents/Resources

#ls -al
#tar -czvf NeoBlock-linux-ia32.tar.gz NeoBlock-linux-ia32/
tar -czvf NeoBlock-darwin-x64.tar.gz NeoBlock-darwin-x64/

mkdir releases

mv NeoBlock-darwin-x64.tar.gz releases

#zip NeoBlock-win32-ia32.zip -r NeoBlock-win32-ia32/