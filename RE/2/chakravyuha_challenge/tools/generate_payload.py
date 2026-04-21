#!/usr/bin/env python3
import base64
import hashlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RES = ROOT / "src" / "main" / "resources" / "assets" / "ender_core"

FINAL_FLAG = "CH4KR4X2{3nd3r_m0d_r3v_P0D5}"
RUNES = "0f1e2d3c4b5a6978a9b8c7d6e5f40123"
PERM = [9, 0, 17, 4, 22, 1, 13, 7, 25, 2, 18, 5, 23, 10, 14, 8, 26, 3, 19, 6, 24, 11, 15, 20, 27, 12, 16, 21]


def gate1() -> int:
    x = 0x13579BDF
    x ^= (0x02468ACE << 1)
    x = ((x << 5) & 0xFFFFFFFF) | (x >> (32 - 5))
    x ^= 0x0BADF00D
    return x & 0xFFFFFFFF


def gate2() -> str:
    s = "EnderPearl"
    b0 = (ord(s[0]) + ord(s[5])) & 0xFF
    b1 = (ord(s[2]) ^ ord(s[7])) & 0xFF
    return f"{b0:02x}{b1:02x}"


def sha256_hex(v: str) -> str:
    return hashlib.sha256(v.encode("utf-8")).hexdigest()


def build_key_iv() -> tuple[bytes, bytes]:
    g1 = gate1()
    g2 = gate2()
    km = f"{g1:08x}|{g2}|{RUNES[:16]}"
    im = f"{g2[::-1]}:{((g1 << 7) & 0xFFFFFFFF) | (g1 >> (32 - 7)):08x}:{RUNES[16:32]}"
    key = sha256_hex(km)[:16].encode("utf-8")
    iv = sha256_hex(im)[:16].encode("utf-8")
    return key, iv


def stream_xor(data: bytes, key: bytes, iv: bytes) -> bytes:
    out = bytearray()
    counter = 0
    pos = 0
    while pos < len(data):
        ctr = counter.to_bytes(4, "big", signed=False)
        ks = hashlib.sha256(key + iv + ctr).digest()
        take = min(len(ks), len(data) - pos)
        block = bytes(data[pos + i] ^ ks[i] for i in range(take))
        out.extend(block)
        counter += 1
        pos += take
    return bytes(out)


def invert_permutation(final_flag: str, perm: list[int]) -> str:
    arr = [None] * len(perm)
    for i, ch in enumerate(final_flag):
        arr[perm[i]] = ch
    return "".join(arr)


def encode_chunks(assembled: str) -> list[str]:
    parts = [assembled[:4], assembled[4:9], assembled[9:15], assembled[15:23], assembled[23:28]]

    t1 = "".join(chr(ord(c) ^ 0x13) for c in parts[0])
    t2 = parts[1][::-1]
    t3 = "".join(chr(ord(c) + 2) for c in parts[2])
    t4 = parts[3][-3:] + parts[3][:-3]
    t5 = base64.b64encode(parts[4].encode("utf-8")).decode("utf-8")[::-1]
    return [t1, t2, t3, t4, t5]


def build_payload() -> str:
    assembled = invert_permutation(FINAL_FLAG, PERM)
    chunks = encode_chunks(assembled)
    check = hashlib.sha256(FINAL_FLAG.encode("utf-8")).hexdigest()

    payload = (
        '{"perm":"' + ",".join(str(x) for x in PERM) +
        '","chunks":"' + "|".join(chunks) +
        '","check":"' + check + '"}'
    )
    return payload


def write_resources() -> None:
    RES.mkdir(parents=True, exist_ok=True)

    payload = build_payload().encode("utf-8")
    key, iv = build_key_iv()
    encrypted = stream_xor(payload, key, iv)

    (RES / "portal.dat").write_bytes(encrypted)

    runes_tbl = """# Ender core runes table
runes=0f1e2d3c4b5a6978a9b8c7d6e5f40123
legacy_hint=CH4KR4X2{fake_portal_key}
stale=CH4KR4X2{n0t_th3_r34l_0n3}
"""
    (RES / "runes.tbl").write_text(runes_tbl, encoding="utf-8")


def main() -> None:
    write_resources()
    print("Generated portal.dat and runes.tbl")


if __name__ == "__main__":
    main()
