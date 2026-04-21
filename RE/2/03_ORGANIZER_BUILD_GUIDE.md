# Organizer Build Guide (Exact, Step-by-Step)

Goal: build one hard-but-solvable target jar that ultimately yields:
CH4KR4X2{3nd3r_m0d_r3v_P0D5}

## 1) Build Pipeline Summary
1. Create plain Java challenge logic.
2. Split flag into chunks and transform.
3. Encrypt stage payload into portal.dat.
4. Add decoy flags and dead branches.
5. Obfuscate names and package jar.
6. Assemble player zip with noise mods + logs.

## 2) Internal Logic Design (Deterministic)
Use these exact concepts:
- Gate I function returns integer checksum from constants.
- Gate II function extracts key fragment from string arithmetic.
- Gate III combines fragments and decrypts portal.dat.
- Stage2 data returns permuted char indexes.
- Final assembler returns flag.

Keep everything deterministic and machine-independent.

## 3) Flag Chunk Strategy
Use final flag:
CH4KR4X2{3nd3r_m0d_r3v_P0D5}

Chunk into 5 fragments:
- F1 = CH4K
- F2 = R4X2{
- F3 = 3nd3r_
- F4 = m0d_r3v_
- F5 = P0D5}

Apply these reversible transforms before embedding:
- F1: XOR each char with 0x13
- F2: reverse string
- F3: add +2 to ASCII each char
- F4: rotate right by 3 positions
- F5: base64 encode then reverse

Do not keep raw chunk literals in code comments.

## 4) Key Reconstruction (Code)
Construct AES key bytes indirectly:
- Part A from int constants and shifts.
- Part B from char arithmetic over "EnderPearl".
- Part C from nibble table in runes.tbl.

Final key length: 16 bytes.
Final IV length: 16 bytes.

## 5) portal.dat Generation
portal.dat should contain AES-CBC encrypted bytes of a JSON-like stage payload:
{
  "perm": [9,0,7,2,1,5,3,4,6,8,...],
  "chunks": ["<t1>","<t2>","<t3>","<t4>","<t5>"],
  "check": "b6f1a4..."
}

Where <t1..t5> are transformed fragments from Section 3.

## 6) Decoys and Anti-Analysis
Add controlled anti-analysis (not impossible):
- if username contains "analyst" then print fake clue.
- if debugger attached then switch to decoy check routine.
- leave fallback path reachable by static analysis.

Add 3 decoy methods:
- vaultOpenLegacy()
- decodeOldTournamentFlag()
- emergencyRunePath()

None should produce real flag.

## 7) Obfuscation
Use lightweight obfuscation only:
- Rename classes to single letters.
- Remove debug symbols.
- Keep one meaningful log line: "Gate III unstable".

Do not use virtualization/protectors that break fairness.

## 8) Packaging
Final target name:
- ender-optimizer-1.4.2.jar

Include:
- classes (obfuscated)
- assets/ender_core/portal.dat
- assets/ender_core/runes.tbl
- native/WinGuard.dll decoy

## 9) Player Bundle Assembly
Create:
- chakravyuha_player_bundle.zip

Add files exactly as in distribution doc.

## 10) Internal QA (Must Pass)
- QA1: Fresh analyst can solve in <= 5 hours.
- QA2: Intended path works with JADX + CyberChef + tiny Python helper.
- QA3: No accidental plain-text real flag anywhere.
- QA4: Real flag recovered is exactly:
CH4KR4X2{3nd3r_m0d_r3v_P0D5}
