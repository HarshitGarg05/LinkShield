@echo off
echo ========================================================
echo   LINK SHIELD - Deploy to Cloudflare Pages (100%% Free)
echo ========================================================
echo.

cd frontend

echo [*] Step 1: Building production frontend and edge functions...
call npm run build
if %errorlevel% neq 0 (
    echo [X] Build failed!
    pause
    exit /b %errorlevel%
)

echo.
echo [*] Step 2: Deploying to Cloudflare Pages...
echo [!] If this is your first time, Wrangler will open your browser to log in.
echo.

npx wrangler pages deploy dist --project-name=link-shield

echo.
echo ========================================================
echo   Deployment completed! 
echo ========================================================
pause
