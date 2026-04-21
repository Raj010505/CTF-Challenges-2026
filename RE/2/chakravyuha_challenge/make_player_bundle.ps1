$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

$dist = Join-Path $root "dist"
$bundleRoot = Join-Path $dist "chakravyuha_player_bundle"
$mods = Join-Path $bundleRoot "mods"
$logs = Join-Path $bundleRoot "logs"
$resourcepacks = Join-Path $bundleRoot "resourcepacks"
$targetJar = Join-Path $dist "ender-optimizer-1.4.2.jar"
$zipOut = Join-Path $dist "chakravyuha_player_bundle.zip"

if (-not (Test-Path $targetJar)) {
    throw "Target jar not found at $targetJar. Run build_challenge.ps1 first."
}

if (Test-Path $bundleRoot) {
    Remove-Item -Recurse -Force $bundleRoot
}
if (Test-Path $zipOut) {
    Remove-Item -Force $zipOut
}

New-Item -ItemType Directory -Path $mods | Out-Null
New-Item -ItemType Directory -Path $logs | Out-Null
New-Item -ItemType Directory -Path $resourcepacks | Out-Null

@"
You are investigating unstable Ender behavior in a modded arena setup.
One recently added optimization module appears suspicious.
Find the hidden vault phrase used by the rogue villager engineer.
Submit in CTF flag format.
"@ | Set-Content -Encoding ASCII (Join-Path $bundleRoot "README.txt")

@"
[21:07:11] [Render thread/INFO]: Loading 4 mods...
[21:07:12] [Render thread/INFO]: EnderOptimizer initialized
[21:07:12] [Render thread/WARN]: Gate I synchronized
[21:07:12] [Render thread/WARN]: Gate II synchronized
[21:07:12] [Render thread/ERROR]: Gate III unstable, fallback to portal.dat
[21:07:13] [Render thread/INFO]: Native guard unavailable, using Java path
"@ | Set-Content -Encoding ASCII (Join-Path $logs "latest.log")

# Build tiny benign jars as noise.
$tempBenign = Join-Path $dist "temp_benign"
if (Test-Path $tempBenign) {
    Remove-Item -Recurse -Force $tempBenign
}
New-Item -ItemType Directory -Path $tempBenign | Out-Null
"benign" | Set-Content -Encoding ASCII (Join-Path $tempBenign "readme.txt")

$jarCmd = Get-Command jar -ErrorAction SilentlyContinue
if ($jarCmd) {
    Push-Location $tempBenign
    & jar cf (Join-Path $mods "jei-11.6.0.jar") .
    & jar cf (Join-Path $mods "sodium-fabric-0.5.3.jar") .
    & jar cf (Join-Path $mods "cloth-config-11.1.118.jar") .
    Pop-Location
} else {
    # Fallback: create placeholder files with jar names.
    "benign" | Set-Content -Encoding ASCII (Join-Path $mods "jei-11.6.0.jar")
    "benign" | Set-Content -Encoding ASCII (Join-Path $mods "sodium-fabric-0.5.3.jar")
    "benign" | Set-Content -Encoding ASCII (Join-Path $mods "cloth-config-11.1.118.jar")
}
Remove-Item -Recurse -Force $tempBenign

Copy-Item -Force $targetJar (Join-Path $mods "ender-optimizer-1.4.2.jar")
"optional resources" | Set-Content -Encoding ASCII (Join-Path $resourcepacks "ender_ui.zip")

Compress-Archive -Path (Join-Path $bundleRoot "*") -DestinationPath $zipOut
Write-Host "Created player bundle: $zipOut"
