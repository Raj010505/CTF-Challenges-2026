# Baby-Step Walkthrough (Detailed Solver Guide)

This is the exact walkthrough you can keep as organizer writeup.
You can release it post-CTF or as staged hints.

Target answer:
CH4KR4X2{3nd3r_m0d_r3v_P0D5}

## Step 0 - Setup Tools
Use:
- JADX (open jar, inspect classes/resources)
- Any hex viewer
- CyberChef or equivalent
- Python (optional) for quick decode script

## Step 1 - Identify Target File
From player bundle, inspect mods directory.
Ignore common known mods.
Focus on:
- ender-optimizer-1.4.2.jar

Reason: logs/latest.log mentions EnderOptimizer and Gate III instability.

## Step 2 - Read Log Clues First
Open logs/latest.log and note:
- Gate III unstable, fallback to portal.dat
- Native guard unavailable, using Java path

Inference:
- Real logic likely in Java classes, not native DLL.
- portal.dat is likely core encrypted payload.

## Step 3 - Open JAR in JADX
In resources, locate:
- assets/ender_core/portal.dat
- assets/ender_core/runes.tbl
- decoy native/WinGuard.dll

In code, locate class containing string:
- "Gate III unstable"

This class is the main execution route.

## Step 4 - Ignore Obfuscation Noise
You will see tiny class names like a/b/c/k etc.
Do not rename everything first.
Track by behavior:
- Which method loads portal.dat?
- Which method assembles byte[] key?
- Which method validates check/hash?

## Step 5 - Map the 3 Gates
Create notes:
- Gate I method returns int from constants and bit ops.
- Gate II method processes string arithmetic.
- Gate III method combines results and decrypts portal.dat.

Even if names are obfuscated, this flow is stable.

## Step 6 - Extract Key Material
From decompiled code, copy constants used for key bytes.
Also inspect runes.tbl use site.
Usually code does:
- read nibble values from runes.tbl
- combine with gate outputs
- produce 16-byte AES key and IV

Rebuild this exactly in a helper script.

## Step 7 - Decrypt portal.dat
Observe crypto mode and padding from code.
Expected in this design:
- AES-CBC
- PKCS5/PKCS7 padding

Feed ciphertext + derived key + IV.
Output should become stage payload text structure containing:
- perm array
- transformed chunk list
- check/hash

If output looks random, key or IV reconstruction is wrong.

## Step 8 - Decode Chunk Transforms
For each transformed chunk, reverse transform in proper order:
- Chunk 1: XOR 0x13
- Chunk 2: reverse string
- Chunk 3: ASCII shift -2
- Chunk 4: rotate left by 3 (inverse of right rotate)
- Chunk 5: reverse then base64 decode

Now you have 5 clean flag fragments.

## Step 9 - Apply Permutation Logic
Use perm array from payload to reorder character positions exactly as code does.
Do not guess ordering manually.
Replicate algorithm from class method.

Expected assembled output:
CH4KR4X2{3nd3r_m0d_r3v_P0D5}

## Step 10 - Verify with Checksum Function
Run recovered string through validation/check function from jar.
If true, flag is confirmed and not a decoy.

## Common Pitfalls
- Chasing WinGuard.dll decoy path.
- Taking fake CH4KR4X2 strings from constant pool.
- Reversing chunk transforms in wrong order.
- Forgetting permutation step.

## Mini Solve Script Outline
1. Parse constants from notes.
2. Build key and IV.
3. AES decrypt portal.dat.
4. Reverse transforms per chunk.
5. Apply permutation.
6. Print final flag and run checksum.

## Expected Final Submission
CH4KR4X2{3nd3r_m0d_r3v_P0D5}
