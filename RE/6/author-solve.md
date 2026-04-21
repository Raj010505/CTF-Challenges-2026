# Author Solve - Client Patch Gate

1. Decompile `ClientPatchGate.class`.
2. Identify arrays `K1`, `A`, `K2`, `B` and index order `PERM`.
3. For each position `i`, invert:

```text
A[i] = ((ch ^ K1[i]) + i*9) & 0xFF
B[i] = (((ch + K2[i]) & 0xFF) ^ (i*13)) & 0xFF
```

4. Recover each character and rebuild the token.
5. Verify the decoy checksum equals `34822`.

Recovered flag:

`CH4KR4X2{P0D5_cl13nt_h4ck}`
