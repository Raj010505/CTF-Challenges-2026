$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $root

$src = Join-Path $root 'release_src\chakravyuha_kernel.py'
$player = Join-Path $root 'release_player'

if (!(Test-Path $player)) {
    New-Item -ItemType Directory -Path $player | Out-Null
}

# 1) Build bytecode-only artifact
c:/python313/python.exe -m py_compile $src
$pyc = Get-ChildItem -Path (Join-Path $root 'release_src\__pycache__') -Filter 'chakravyuha_kernel*.pyc' | Select-Object -First 1
if ($null -eq $pyc) {
    throw 'pyc build failed.'
}
Copy-Item $pyc.FullName (Join-Path $player 'chakravyuha_kernel.pyc') -Force

# 2) Build one-file EXE artifact
c:/python313/python.exe -m PyInstaller --onefile --noconfirm --clean --distpath $player --workpath (Join-Path $root 'release_build\work') --specpath (Join-Path $root 'release_build') $src

Write-Host 'Build complete. Player artifacts:'
Get-ChildItem $player | Select-Object Name,Length | Format-Table -AutoSize
