# CHAKRAVYUHA Challenge (Actual Build)

This folder contains the real challenge implementation, not only planning docs.

## What is included
- Obfuscated-style Java classes in src/main/java/a/b/c
- Real encrypted payload in assets/ender_core/portal.dat
- Rune table + decoys
- Target jar build script
- Player bundle zip build script

## Build steps
1. Install Python 3 and JDK 17+.
2. Run: powershell -ExecutionPolicy Bypass -File .\build_challenge.ps1
3. Run: powershell -ExecutionPolicy Bypass -File .\make_player_bundle.ps1

## Verify solve path (organizer)
Run: python .\\tools\\verify_solution.py

Expected output includes:
- Recovered: CH4KR4X2{3nd3r_m0d_r3v_P0D5}
- Checksum match: True

Output files:
- dist/ender-optimizer-1.4.2.jar
- dist/chakravyuha_player_bundle.zip

## Solve sanity check
If you run the jar entrypoint class, final output should include:
CH4KR4X2{3nd3r_m0d_r3v_P0D5}
