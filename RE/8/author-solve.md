# Author Solve - Debug Mob Auth

## Intended path
1. Decompile `DebugMobAuth.class`.
2. Extract arrays `KEYS`, `E`, `F` and checksum target `26449`.
3. Invert checks:

```text
E[i] = ror8(((ch ^ KEYS[i]) + (i*3+5)) & 0xFF, i % 7)
F[i] = (((ch + KEYS[i]) & 0xFF) ^ (i*19+7)) & 0xFF
```

4. Rebuild each `ch` and verify checksum.
5. Recovered flag: `CH4KR4X2{P0D5_d3bug_m0b}`

## Vulnerability path
- `vulnerableDebugParser` catches all exceptions and returns `true`.
- Any malformed token starting with `DBG-` can bypass auth.
- Example bypass input: `DBG-zz`
