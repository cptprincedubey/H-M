@echo off
echo.
echo ======================================
echo   H&M E-Commerce Project Starter
echo ======================================
echo.

echo Starting Backend Server...
start cmd /k "cd backend && npm install && npm start"

timeout /t 3

echo Starting Frontend Server...
start cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ======================================
echo   Servers Starting...
echo ======================================
echo.
echo Backend will be available at: http://localhost:5000
echo Frontend will be available at: http://localhost:5174
echo.
echo Wait 5-10 seconds for both servers to fully start.
echo Then open: http://localhost:5174
echo.
pause
