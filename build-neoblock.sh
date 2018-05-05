cd cocoblockly
npm install
gulp xml
gulp
npm run buildosx
npm run buildwin
ls -al
tar -czvf NeoBlock-darwin-x64
tar -czvf NeoBlock-darwin-x64.tar.gz NeoBlock-darwin-x64/
zip NeoBlock-win32-ia32.zip -r NeoBlock-win32-ia32/