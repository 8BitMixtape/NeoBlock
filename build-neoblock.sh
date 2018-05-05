cd cocoblockly
npm install
gulp xml
gulp

#osx
unzip arduino-1.8.4-macosx.zip "Arduino.app/Contents/Java/hardware/tools/*"
unzip arduino-1.8.4-macosx.zip "Arduino.app/Contents/Java/arduino-builder"
mv "Arduino.app/Contents/Java/hardware/tools" ./tools_osx
mv "Arduino.app/Contents/Java/arduino-builder" ./tools_osx
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
npm run buildwin
npm run buildlinux
ls -al
tar -czvf NeoBlock-linux-ia32.tar.gz NeoBlock-linux-ia32/
tar -czvf NeoBlock-darwin-x64.tar.gz NeoBlock-darwin-x64/
zip NeoBlock-win32-ia32.zip -r NeoBlock-win32-ia32/