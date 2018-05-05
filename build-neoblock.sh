cd cocoblockly
npm install
gulp xml
gulp
npm run buildosx
npm run buildwin
npm run buildlinux
ls -al
tar -czvf NeoBlock-linux-ia32.tar.gz NeoBlock-linux-ia32/
tar -czvf NeoBlock-darwin-x64.tar.gz NeoBlock-darwin-x64/
zip NeoBlock-win32-ia32.zip -r NeoBlock-win32-ia32/