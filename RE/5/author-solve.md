# Author Solve - POD5 Vault

1. Decompile `Pod5Vault.class` using JADX, CFR, FernFlower, or similar.
2. Find the `recoverExpected()` function.
3. Observe each character is reconstructed with:

```text
out[i] = ENC[i] ^ SPICE[i] ^ ((i * 11) & 0x7F)
```

4. Rebuild all chars to recover the flag.

Recovered flag:

`CH4KR4X2{P0D5_j4r_d3c0mp}`
