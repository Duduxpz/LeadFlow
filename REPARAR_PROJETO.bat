@echo off
setlocal enabledelayedexpansion

echo ==========================================
echo    REPARADOR AUTOMATICO - LEADFLOW
echo ==========================================
echo.

:: 1. Instalar dependencias
echo [1/4] Instalando dependencias (isso pode demorar)...
call npm install
if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERRO] Falha ao instalar dependencias. Verifique se o Node.js esta instalado.
    pause
    exit /b %ERRORLEVEL%
)

:: 2. Configurar .env do Backend
echo [2/4] Configurando arquivos de ambiente...
if not exist "apps\backend\.env" (
    echo DATABASE_URL="COLE_SUA_URL_DO_NEON_AQUI" > apps\backend\.env
    echo JWT_SECRET="leadflow-secret-key-change-this-in-production" >> apps\backend\.env
    echo PORT=3000 >> apps\backend\.env
    echo [AVISO] Arquivo .env criado em apps/backend/.env
)

:: 3. Configurar .env do Frontend
if not exist "apps\frontend\.env.local" (
    echo NEXT_PUBLIC_API_URL="http://localhost:3000" > apps\frontend\.env.local
    echo [AVISO] Arquivo .env.local criado em apps/frontend/.env.local
)

:: 4. Tentar rodar build para testar
echo [3/4] Testando build do projeto...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo.
    echo [AVISO] O build falhou. Isso geralmente acontece se a DATABASE_URL nao estiver configurada.
)

echo.
echo ==========================================
echo    RESUMO DO QUE FAZER AGORA:
echo ==========================================
echo 1. Abra o arquivo: apps/backend/.env
echo 2. Apague "COLE_SUA_URL_DO_NEON_AQUI" e cole sua URL do Neon.tech.
echo 3. Salve o arquivo.
echo 4. No terminal, digite: npm run dev
echo.
echo O site estara em: http://localhost:3002
echo ==========================================
pause
