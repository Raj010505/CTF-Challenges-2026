# Exact Player Distribution Plan

This file tells you exactly what to give players.

## Folder to Distribute
Create and give this zip to players:
- chakravyuha_player_bundle.zip

Inside zip:
- README.txt
- logs/latest.log
- mods/jei-11.6.0.jar (benign)
- mods/sodium-fabric-0.5.3.jar (benign)
- mods/cloth-config-11.1.118.jar (benign)
- mods/ender-optimizer-1.4.2.jar (TARGET)
- resourcepacks/ender_ui.zip (benign)

## Important
Only one target file should contain the real flag path:
- mods/ender-optimizer-1.4.2.jar

All other files are noise/theme.

## README.txt Content (Player-facing)
You are investigating unstable Ender behavior in a modded arena setup.
One recently added optimization module appears suspicious.
Find the hidden vault phrase used by the rogue villager engineer.
Submit in CTF flag format.

## logs/latest.log Content (Player-facing)
[21:07:11] [Render thread/INFO]: Loading 4 mods...
[21:07:12] [Render thread/INFO]: EnderOptimizer initialized
[21:07:12] [Render thread/WARN]: Gate I synchronized
[21:07:12] [Render thread/WARN]: Gate II synchronized
[21:07:12] [Render thread/ERROR]: Gate III unstable, fallback to portal.dat
[21:07:13] [Render thread/INFO]: Native guard unavailable, using Java path

This intentionally pushes players toward Gate III and portal.dat.

## Target Jar Internal Layout
ender-optimizer-1.4.2.jar
- META-INF/MANIFEST.MF
- META-INF/services/net.minecraft.launchwrapper.ITweaker
- a/b/c/k.class
- a/b/c/m.class
- a/b/c/q.class
- a/b/c/z.class
- assets/ender_core/portal.dat
- assets/ender_core/runes.tbl
- native/WinGuard.dll (decoy)

## Decoy Placement Rules
- Put fake flags in 3 places:
1. String constant in a/b/c/m.class
2. assets/ender_core/runes.tbl
3. README comment inside jar

Examples decoys:
- CH4KR4X2{fake_portal_key}
- CH4KR4X2{n0t_th3_r34l_0n3}
- FLAG{old_event_flag_do_not_use}

## Real Flag Storage Rule
Do not store plain real flag string in any single location.
Store as transformed chunks requiring:
- key reconstruction from code
- blob decrypt from portal.dat
- permutation reorder

## Organizer Validation
Before release, test by solving from player zip only.
If solve requires organizer-only source files, the package is invalid.
