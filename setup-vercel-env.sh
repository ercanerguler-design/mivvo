#!/bin/bash

# Vercel Environment Variables Setup Script
# Run this to set up environment variables on Vercel

echo "🚀 Setting up Vercel Environment Variables for MIVVO..."

# Set NEXTAUTH_SECRET for production
vercel env add NEXTAUTH_SECRET production
echo "6N/YlPjj5eSbRzhiU68DVA8QrPfOanWeo+O5QrfrNco="

# Set NEXTAUTH_URL for production
vercel env add NEXTAUTH_URL production
echo "https://mivvo-puce.vercel.app"

# Set NEXTAUTH_SECRET for preview
vercel env add NEXTAUTH_SECRET preview
echo "6N/YlPjj5eSbRzhiU68DVA8QrPfOanWeo+O5QrfrNco="

# Set NEXTAUTH_URL for preview
vercel env add NEXTAUTH_URL preview
echo "https://mivvo-puce.vercel.app"

echo "✅ Environment variables setup complete!"
echo "📝 Don't forget to set your database and OAuth credentials!"