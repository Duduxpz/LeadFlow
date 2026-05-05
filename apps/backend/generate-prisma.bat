@echo off
cd /d "%~dp0"
echo Generating Prisma Client...
call npx prisma generate
if %ERRORLEVEL% equ 0 (
    echo ✅ Prisma Client generated successfully!
) else (
    echo ❌ Error generating Prisma Client
)
pause
