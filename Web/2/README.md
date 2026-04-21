# MineGate CTF Login (Safe SQLi-Style Challenge)

This project is a Minecraft-inspired login challenge built for deployment on Vercel.

Important:
- This is not a real SQL injection vulnerability.
- The server never executes user-provided SQL against a real database.
- The puzzle simulates a SQLi-style exploit path in a controlled, safe way.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Serverless API routes compatible with Vercel

## Environment Variables

Create `.env.local` for local dev:

```bash
CTF_FLAG=CH4KR4X2{P0D5_c0bb13_1nj3ct}
CHALLENGE_TTL_MS=600000
POW_DIFFICULTY=5
CHALLENGE_SIGNING_KEY=4eaf79e77d60ff3f452b193e5cefbccede4357b064a4594afff62a7d4a665646
```

Notes:
- `POW_DIFFICULTY=5` is a good default. Increase for harder brute-force cost.
- Use a long random `CHALLENGE_SIGNING_KEY` in production.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## API Endpoints

- `GET /api/challenge`
  - Issues a signed challenge ticket and nonce seed.
- `POST /api/login`
  - Expects JSON body:
  - `challengeId` (signed ticket)
  - `proof` (PoW answer)
  - `payload` (double base64 encoded string)

## Vercel Deploy

1. Push this repo to GitHub.
2. Import into Vercel.
3. Add environment variables in Project Settings:
   - `CTF_FLAG`
   - `CHALLENGE_TTL_MS`
   - `POW_DIFFICULTY`
   - `CHALLENGE_SIGNING_KEY`
4. Deploy.

## Security Model

- Challenge ticket is stateless and signed with HMAC, so it works across Vercel serverless instances.
- Flag retrieval path is fully server-side.
- Frontend does not contain solve logic.
- Common SQL injection patterns are blocked.
- Only one rare grammar string passes final validation.

## Organizer Walkthrough

See `WALKTHROUGH.md`.

## Disclaimer

No CTF challenge can be guaranteed "AI-proof" or "uncrackable". This design makes automated solving significantly harder by combining:
- proof-of-work,
- strict payload canonicalization,
- double-base64 parsing,
- exact-match rare injection grammar,
- short ticket expiry and signature checks.
