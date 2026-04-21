# CHAKRAVYUHA - Minecraft Reverse Engineering CTF Challenge

## Core Theme
- Challenge name: CHAKRAVYUHA: The Ender Mod Labyrinth
- Category: Reverse Engineering
- Difficulty: Hard (but solvable in 2-5 hours by strong RE players)
- Final flag: CH4KR4X2{3nd3r_m0d_r3v_P0D5}
- Setting: A suspicious Minecraft modpack where one "performance mod" secretly contains layered anti-analysis logic.

## Player Story
A rogue villager engineer shipped an "Ender Optimization Patch" into a tournament modpack.
The patch causes weird behavior and references "Chakravyuha Gates" in logs.
Players must reverse the mod and recover the hidden vault phrase.

## Learning Objectives
- Static reverse of Java bytecode (jar/class inspection)
- Resource extraction and format triage
- Defeating simple anti-debug/anti-VM checks
- Multi-stage decoding pipeline
- Distinguishing decoy flags from real validation logic

## Difficulty Controls
To keep it hard but fair:
- Use 5+ fake flags in strings/resources.
- Add 3 decoy validation functions.
- Split key material across code + resources + arithmetic reconstruction.
- Gate final output behind deterministic runtime checks (time-seeded branch avoided).
- Ensure every step has at least one concrete artifact clue.

## Challenge Architecture (Organizer)
1. Player receives a zip with:
- A fake Minecraft profile folder.
- Several benign mods.
- One target mod jar: ender-optimizer-1.4.2.jar
- A launcher log file with subtle clues.
- A README with story only (no technical hints).

2. Inside target jar:
- Obfuscated classes in package a.b.c.*
- assets/ender_core/portal.dat (encrypted blob)
- META-INF/services entry with suspicious class name
- native/WinGuard.dll decoy (unused but intimidating)

3. Real solve path:
- Find class with log string "Gate III unstable".
- Recover gate key builder across 3 methods.
- Decrypt portal.dat -> stage2 byte array.
- Stage2 reconstructs final string using index permutation.
- Validate against checksum routine.

4. Final output in code path:
- print("Vault Open: " + flag)

## Suggested Scoring
- 500 initial points
- Dynamic decay to 250

## Hints (Optional Release)
Hint 1 (easy): "The true path starts in logs, not in assets."
Hint 2 (medium): "Ignore native artifacts unless referenced from bytecode."
Hint 3 (hard): "One key is not stored directly; it is assembled from constants and bit operations."

## Fairness Checklist
- No brute force required.
- No internet dependency.
- No kernel/driver tricks.
- No random seeds that change answer.
- Works offline on Windows/Linux.

## What Makes It Super Hard Yet Solvable
- Hard: layered indirection, fake branches, decoys, obfuscated names.
- Solvable: every layer leaves a deterministic clue chain and recoverable transforms.
