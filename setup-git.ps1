# Git Setup Script for Rose Day Project
# Run this script after creating your GitHub repository

# Add Git to PATH for this session
$env:Path += ";C:\Program Files\Git\cmd"

# Configure Git (replace with your details)
Write-Host "Configuring Git..." -ForegroundColor Cyan
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Initialize repository
Write-Host "Initializing Git repository..." -ForegroundColor Cyan
git init

# Add all files
Write-Host "Adding files..." -ForegroundColor Cyan
git add .

# Create initial commit
Write-Host "Creating initial commit..." -ForegroundColor Cyan
git commit -m "Initial commit: Rose Day interactive website"

Write-Host "`nSetup complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Create a repository on GitHub (https://github.com/new)"
Write-Host "2. Copy the repository URL"
Write-Host "3. Run these commands (replace YOUR_USERNAME):"
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/rose-day-surprise.git"
Write-Host "   git branch -M main"
Write-Host "   git push -u origin main"
