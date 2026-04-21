# Challenge Name
Chakravyuha: Nether Pod Escape // Hard Mode

## Category
Reverse Engineering

## Difficulty
Easy-Medium (compiled handout)

## Theme
Minecraft fortress pod control system with hidden relay output.

## Final Flag
CH4KR4X2{P0D5_vm_r3v_3sc4p3}

## Exact File To Give Players
Give only this file:
- release_player/chakravyuha_kernel.exe

Do NOT give source files, pyc, build scripts, or organizer walkthrough.

## Player Prompt (Suggested)
"You found a corrupted fortress pod controller binary. Extract the real relay flag."

## Behavior Summary
- Binary asks for a pod key.
- Wrong key prints ACCESS DENIED and a small hint.
- Correct key prints ACCESS GRANTED and reveals flag.
- A decoy flag-like string exists in binary data.

## Why This Version Is Harder
- Players cannot directly read Python source.
- Distribution is single EXE artifact.
- Logic is class-based and packaged by PyInstaller.
- Real flag is stream-XOR encrypted and decoded at runtime.

## Organizer Validation
Expected unlock key: NETHER_POD

Quick local check:
```
cmd /c "echo NETHER_POD|release_player\chakravyuha_kernel.exe"
```

Expected output contains:
```
ACCESS GRANTED
CH4KR4X2{P0D5_vm_r3v_3sc4p3}
```
