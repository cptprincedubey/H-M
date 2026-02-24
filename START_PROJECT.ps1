# H&M E-Commerce Project Starter (PowerShell)

Write-Host ""
Write-Host "======================================"  -ForegroundColor Cyan
Write-Host "  H&M E-Commerce Project Starter"      -ForegroundColor Cyan
Write-Host "======================================"  -ForegroundColor Cyan
Write-Host ""

Write-Host "Starting Backend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm install; npm start"

Start-Sleep -Seconds 3

Write-Host "Starting Frontend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm install; npm run dev"

Write-Host ""
Write-Host "======================================"  -ForegroundColor Cyan
Write-Host "  Servers Starting..."                 -ForegroundColor Cyan
Write-Host "======================================"  -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend will be available at: http://localhost:5000" -ForegroundColor Yellow
Write-Host "Frontend will be available at: http://localhost:5174" -ForegroundColor Yellow
Write-Host ""
Write-Host "Wait 5-10 seconds for both servers to fully start." -ForegroundColor Yellow
Write-Host "Then open: http://localhost:5174" -ForegroundColor Yellow
Write-Host ""
pause
