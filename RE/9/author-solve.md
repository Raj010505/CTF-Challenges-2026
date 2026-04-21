# Author Solve - Ender Rev Node

## Intended path
1. Decompile `EnderRevNode.class`.
2. Extract arrays `KEY`, `MIX`, `SALT`, `T1`, `T2` and checksum target `36347`.
3. Invert checks:

```text
T1[i] = (rol8(ch[i] ^ KEY[i], i % 8) + MIX[i]) & 0xFF
T2[i] = (((ch[i] + ch[(i+1)%n]) & 0xFF) ^ SALT[i]) & 0xFF
```

4. Rebuild bytes and verify checksum.
5. Recovered flag: `CH4KR4X2{3nd3r_r3v_P0D5}`

## Vulnerability path
- `legacyDevBypass` catches all exceptions and returns `true`.
- Malformed `DEV:` payloads bypass auth.
- Example bypass input: `DEV:zz`
