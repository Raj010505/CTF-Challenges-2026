Param(
    [switch]$SkipCompile
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

Write-Host "[1/4] Generating encrypted challenge payload..."
python .\tools\generate_payload.py

if ($SkipCompile) {
    Write-Host "SkipCompile enabled. Sources and resources are ready."
    exit 0
}

$javac = Get-Command javac -ErrorAction SilentlyContinue
$jar = Get-Command jar -ErrorAction SilentlyContinue
if (-not $javac -or -not $jar) {
    Write-Host "JDK tools not found (javac/jar)."
    Write-Host "Install JDK 17+ and rerun build_challenge.ps1"
    exit 1
}

$buildDir = Join-Path $root "build"
$classesDir = Join-Path $buildDir "classes"
$jarOut = Join-Path $root "dist\ender-optimizer-1.4.2.jar"

if (Test-Path $buildDir) {
    Remove-Item -Recurse -Force $buildDir
}
New-Item -ItemType Directory -Path $classesDir | Out-Null
New-Item -ItemType Directory -Path (Join-Path $root "dist") -Force | Out-Null

Write-Host "[2/4] Compiling Java sources..."
$javaFiles = Get-ChildItem -Path ".\src\main\java" -Filter *.java -Recurse | ForEach-Object { $_.FullName }
& javac -g:none -encoding UTF-8 -d $classesDir $javaFiles

Write-Host "[3/4] Copying resources..."
Copy-Item -Recurse -Force ".\src\main\resources\*" $classesDir

$manifest = Join-Path $buildDir "MANIFEST.MF"
@"
Manifest-Version: 1.0
Main-Class: a.b.c.k
"@ | Set-Content -Encoding ASCII $manifest

Write-Host "[4/4] Building target jar..."
& jar cfm $jarOut $manifest -C $classesDir .

Write-Host "Built: $jarOut"
