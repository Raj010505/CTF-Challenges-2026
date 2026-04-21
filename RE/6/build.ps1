$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

New-Item -ItemType Directory -Force -Path dist | Out-Null

javac -g:none -d dist src/ClientPatchGate.java

Write-Host 'Built:' (Resolve-Path 'dist/ClientPatchGate.class')
