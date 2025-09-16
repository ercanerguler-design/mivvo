# Vercel Environment Variables Setup Script for Windows
# Run this to set up environment variables on Vercel

Write-Host "🚀 Setting up Vercel Environment Variables for MIVVO..." -ForegroundColor Green

# Check if Vercel CLI is installed
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

Write-Host "Setting NEXTAUTH_SECRET for production..." -ForegroundColor Cyan
vercel env add NEXTAUTH_SECRET production --value "6N/YlPjj5eSbRzhiU68DVA8QrPfOanWeo+O5QrfrNco="

Write-Host "Setting NEXTAUTH_URL for production..." -ForegroundColor Cyan
vercel env add NEXTAUTH_URL production --value "https://mivvo-puce.vercel.app"

Write-Host "Setting NEXTAUTH_SECRET for preview..." -ForegroundColor Cyan
vercel env add NEXTAUTH_SECRET preview --value "6N/YlPjj5eSbRzhiU68DVA8QrPfOanWeo+O5QrfrNco="

Write-Host "Setting NEXTAUTH_URL for preview..." -ForegroundColor Cyan
vercel env add NEXTAUTH_URL preview --value "https://mivvo-puce.vercel.app"

Write-Host "✅ Environment variables setup complete!" -ForegroundColor Green
Write-Host "📝 Don't forget to set your database and OAuth credentials in Vercel dashboard!" -ForegroundColor Yellow

# Display current environment variables
Write-Host "`nCurrent environment variables:" -ForegroundColor Magenta
vercel env ls