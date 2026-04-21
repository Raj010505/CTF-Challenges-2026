#!/usr/bin/env python3
"""Chakravyuha hardened player artifact source (organizer only)."""

from __future__ import annotations


class FortressPodKernel:
    _BANNER = (
        "=== CHAKRAVYUHA: NETHER POD ESCAPE // HARD MODE ===\n"
        "Ruined fortress pod online. Inject unlock phrase."
    )

    # Real unlock key is reconstructed at runtime.
    _VM_CELLS = [156, 149, 166, 154, 149, 160, 179, 162, 163, 150]

    # XOR with xorshift keystream generated from unlock key.
    _FLAG_CIPHER = [
        161,
        232,
        20,
        79,
        142,
        179,
        69,
        22,
        120,
        33,
        35,
        70,
        89,
        179,
        42,
        138,
        117,
        39,
        76,
        62,
        212,
        175,
        186,
        35,
        109,
        134,
        167,
        74,
    ]

    # Decoy to punish string-only extraction.
    _DECOY = "CH4KR4X2{n0t_th3_r34l_0n3}"

    @classmethod
    def _vm_unlock(cls) -> str:
        out = []
        for v in cls._VM_CELLS:
            out.append(chr(((v ^ 0xC3) - 17) & 0x7F))
        return "".join(out)

    @staticmethod
    def _seed_from_key(key: str) -> int:
        s = 0x5EED1234
        for ch in key:
            s = ((s << 5) ^ (s >> 2) ^ ord(ch) ^ 0xA5A5A5A5) & 0xFFFFFFFF
        return s

    @staticmethod
    def _xorshift_stream(seed: int, size: int) -> list[int]:
        x = seed
        out = []
        for _ in range(size):
            x ^= (x << 13) & 0xFFFFFFFF
            x ^= x >> 17
            x ^= (x << 5) & 0xFFFFFFFF
            out.append(x & 0xFF)
        return out

    @classmethod
    def _decrypt_flag(cls, key: str) -> str:
        stream = cls._xorshift_stream(cls._seed_from_key(key), len(cls._FLAG_CIPHER))
        plain = [c ^ stream[i] for i, c in enumerate(cls._FLAG_CIPHER)]
        return bytes(plain).decode("ascii")

    @classmethod
    def run(cls) -> None:
        print(cls._BANNER)
        user_key = input("Pod key> ").strip()

        if user_key != cls._vm_unlock():
            print("ACCESS DENIED")
            print("hint: key length is 10")
            return

        print("ACCESS GRANTED")
        print(cls._decrypt_flag(user_key))


def main() -> None:
    FortressPodKernel.run()


if __name__ == "__main__":
    main()
