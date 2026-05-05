#!/usr/bin/env pwsh

# Change to backend directory
Push-Location $PSScriptRoot

# Run prisma generate
Write-Host "Generating Prisma Client..." -ForegroundColor Cyan
npx prisma generate

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Prisma Client generated successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Error generating Prisma Client" -ForegroundColor Red
}

Pop-Location
