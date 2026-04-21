Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot

if (-not (Get-Command gcc -ErrorAction SilentlyContinue)) {
  throw "gcc not found. Install WSL/MinGW and ensure gcc is available."
}

gcc -O0 -fno-stack-protector -no-pie vuln.c -o vuln.exe
Write-Host "Built .\\bin\\vuln.exe for local Windows debugging"
