# Challenge: Debug Mob Auth

## Category
Reverse Engineering

## Difficulty
Medium

## Story
A mobile client validates a token before enabling privileged debug actions.
The checker contains transformed byte validation logic and a hidden weak debug parser.
Recover the real flag and identify the bypass.

## Files to give players
- `dist/DebugMobAuth.class`

## How to run
```bash
java DebugMobAuth
```

or

```bash
java DebugMobAuth "CH4KR4X2{example}"
```

## Goal format
`CH4KR4X2{...}`
