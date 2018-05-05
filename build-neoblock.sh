cd cocoblockly
npm install
gulp
npm run buildosx
npm run buildwin
ls -al
tar -czvf NeoBlock-darwin-x64
tar -czvf NeoBlock-darwin-x64.tar.gz NeoBlock-darwin-x64/
tar -czvf NeoBlock-win32-x32.tar.gz NeoBlock-darwin-x64/