@echo off
setlocal
cd /d "%~dp0"
start "" http://localhost:4173
where py >nul 2>nul
if %errorlevel%==0 (
  py -m http.server 4173 --directory dist
  goto :end
)
where python >nul 2>nul
if %errorlevel%==0 (
  python -m http.server 4173 --directory dist
  goto :end
)
echo Python was not found. Install Node.js LTS, then run: npm install ^&^& npm run dev
pause
:end
