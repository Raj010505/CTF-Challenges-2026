# Baby-Step Walkthrough (Organizer, EXE Handout)

This walkthrough assumes player receives only:
- release_player/chakravyuha_kernel.exe

Goal: recover the real flag from compiled binary.

---

## Step 1: Execute binary and observe behavior
Command:
```
release_player\chakravyuha_kernel.exe
```

Enter random key.
Observe:
- ACCESS DENIED
- hint: key length is 10

This tells players not to brute-force long secrets blindly.

---

## Step 2: Fast static triage with strings
Command:
```
strings release_player\chakravyuha_kernel.exe | findstr /I "CH4KR4X2 ACCESS DENIED GRANTED"
```

Expected finding:
- access messages appear
- one decoy flag-like string may appear

Important note for players:
- Do not submit first flag-looking string from strings output.

---

## Step 3: Unpack PyInstaller payload
Use pyinstxtractor-ng (or pyinstxtractor) on EXE.

Example command:
```
pyinstxtractor-ng release_player\chakravyuha_kernel.exe
```

Result:
- extracted folder with embedded python bytecode files
- locate module corresponding to challenge logic (chakravyuha_kernel.pyc)

---

## Step 4: Decompile pyc to source-like output
Use a Python decompiler compatible with your version (for example pylingual/decompyle tooling).

Goal:
- recover class logic
- identify key reconstruction routine
- identify flag decryption routine

Expected high-level logic:
1. runtime-generated unlock key
2. stream-based XOR decryption for flag

---

## Step 5: Recover unlock key
From recovered logic, key is generated from fixed VM cells using transform.

Recovered key:
```
NETHER_POD
```

---

## Step 6: Get final flag
Run binary again with key:
```
cmd /c "echo NETHER_POD|release_player\chakravyuha_kernel.exe"
```

Expected output:
```
ACCESS GRANTED
CH4KR4X2{P0D5_vm_r3v_3sc4p3}
```

---

## Alternative Solve Route (Dynamic)
If decompiler fails:
1. Run EXE in debugger.
2. Break near output calls after ACCESS GRANTED.
3. Inspect memory/string buffers after decrypt routine.
4. Extract final flag string.

---

## Common Player Mistakes
- Submitting decoy string found via plain strings.
- Assuming native C logic when binary is packed Python.
- Brute-forcing key despite 10-char structured transform.

---

## Admin Notes
- This file is organizer-only and should not be distributed.
- Official handout remains only release_player/chakravyuha_kernel.exe.
