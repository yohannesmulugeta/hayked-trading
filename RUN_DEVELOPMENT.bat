@echo off
setlocal
cd /d "%~dp0"
if not exist node_modules (
  echo Installing project packages...
  call npm install
  if errorlevel 1 goto :error
)
call npm run dev
exit /b 0
:error
echo.
echo npm could not install the project. Reinstall the current Node.js LTS version and try again.
pause
