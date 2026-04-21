#!/usr/bin/env python3
import base64
import hashlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RES = ROOT / "src" / "main" / "resources" / "assets" / "ender_core"


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


def build_key_iv(runes: str) -> tuple[bytes, bytes]:
    g1 = gate1()
    g2 = gate2()
    km = f"{g1:08x}|{g2}|{runes[:16]}"
    ivrot = ((g1 << 7) & 0xFFFFFFFF) | (g1 >> (32 - 7))
    im = f"{g2[::-1]}:{ivrot:08x}:{runes[16:32]}"
    key = sha256_hex(km)[:16].encode("utf-8")
    iv = sha256_hex(im)[:16].encode("utf-8")
    return key, iv


def stream_xor(data: bytes, key: bytes, iv: bytes) -> bytes:
    out = bytearray()
    counter = 0
    pos = 0
    while pos < len(data):
        ks = hashlib.sha256(key + iv + counter.to_bytes(4, "big")).digest()
        take = min(len(ks), len(data) - pos)
        out.extend(data[pos + i] ^ ks[i] for i in range(take))
        pos += take
        counter += 1
    return bytes(out)


def between(s: str, left: str, right: str) -> str:
    i = s.index(left) + len(left)
    j = s.index(right, i)
    return s[i:j]


def decode_chunks(chunks: list[str]) -> list[str]:
    c1 = "".join(chr(ord(ch) ^ 0x13) for ch in chunks[0])
    c2 = chunks[1][::-1]
    c3 = "".join(chr(ord(ch) - 2) for ch in chunks[2])
    c4 = chunks[3][3:] + chunks[3][:3]
    c5 = base64.b64decode(chunks[4][::-1].encode("utf-8")).decode("utf-8")
    return [c1, c2, c3, c4, c5]


def apply_perm(assembled: str, perm: list[int]) -> str:
    return "".join(assembled[i] for i in perm)


def main() -> None:
    runes_tbl = (RES / "runes.tbl").read_text(encoding="utf-8")
    runes = [ln for ln in runes_tbl.splitlines() if ln.startswith("runes=")][0].split("=", 1)[1].strip()

    key, iv = build_key_iv(runes)
    payload = stream_xor((RES / "portal.dat").read_bytes(), key, iv).decode("utf-8")

    perm = [int(x) for x in between(payload, '"perm":"', '"').split(",")]
    chunks = between(payload, '"chunks":"', '"').split("|")
    check = between(payload, '"check":"', '"')

    assembled = "".join(decode_chunks(chunks))
    flag = apply_perm(assembled, perm)

    print("Recovered:", flag)
    print("Checksum match:", sha256_hex(flag) == check)


if __name__ == "__main__":
    main()
