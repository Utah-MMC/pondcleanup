# Setup script to add killnode function to PowerShell profile

$profilePath = $PROFILE.CurrentUserAllHosts
$profileDir = Split-Path -Parent $profilePath

# Create profile directory if it doesn't exist
if (-not (Test-Path $profileDir)) {
    New-Item -ItemType Directory -Path $profileDir -Force | Out-Null
}

# Function to add
$function = @'
function killnode {
    Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
    if ($?) {
        Write-Host "All Node.js processes have been terminated." -ForegroundColor Green
    } else {
        Write-Host "No Node.js processes found." -ForegroundColor Yellow
    }
}
'@

# Check if function already exists
if (Test-Path $profilePath) {
    $content = Get-Content $profilePath -Raw
    if ($content -notmatch 'function killnode') {
        Add-Content -Path $profilePath -Value "`n$function"
        Write-Host "killnode function added to your PowerShell profile." -ForegroundColor Green
    } else {
        Write-Host "killnode function already exists in your PowerShell profile." -ForegroundColor Yellow
    }
} else {
    # Create new profile with the function
    Set-Content -Path $profilePath -Value $function
    Write-Host "PowerShell profile created with killnode function." -ForegroundColor Green
}

Write-Host "`nTo use killnode, either:" -ForegroundColor Cyan
Write-Host "1. Restart your PowerShell terminal, or" -ForegroundColor Cyan
Write-Host "2. Run: . `$PROFILE" -ForegroundColor Cyan
Write-Host "`nThen you can type 'killnode' to stop all Node.js processes." -ForegroundColor Cyan

