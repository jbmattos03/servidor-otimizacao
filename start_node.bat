@echo off
REM Setup environment with FNM (Fast Node Manager)
powershell -Command ". $PROFILE; fnm use --install-if-missing 22"

REM Display Node.js and NPM versions
node -v
npm -v