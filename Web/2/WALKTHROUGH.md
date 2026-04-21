# Organizer Walkthrough (Copy-Paste Runbook)

This is a strict command-by-command guide for Windows PowerShell.

## 1. Open project in terminal

```powershell
cd "C:\Users\Raj Dubey\Desktop\Challenge\Web\2"
```

## 2. Create local environment file

```powershell
@"
CTF_FLAG=CH4KR4X2{P0D5_c0bb13_1nj3ct}
CHALLENGE_TTL_MS=600000
POW_DIFFICULTY=5
CHALLENGE_SIGNING_KEY=4eaf79e77d60ff3f452b193e5cefbccede4357b064a4594afff62a7d4a665646
"@ | Set-Content -Path ".env.local" -Encoding UTF8
```

## 3. Install dependencies

```powershell
npm install
```

## 4. Start local server

Run in terminal window 1:

```powershell
npm run dev
```

Wait until you see a line similar to:

```text
ready - started server on 0.0.0.0:3000
```

## 5. Run solver against local server

Open terminal window 2, then run:

```powershell
cd "C:\Users\Raj Dubey\Desktop\Challenge\Web\2"
node .\scripts\solve.mjs
```

Expected success output includes:

```text
"ok": true
"flag": "CH4KR4X2{P0D5_c0bb13_1nj3ct}"
```

## 6. Test with custom URL (after deployment)

```powershell
$env:BASE_URL="https://your-project-name.vercel.app"
node .\scripts\solve.mjs
Remove-Item Env:BASE_URL
```

## 7. Optional: increase brute-force ceiling if needed

If proof is not found fast enough:

```powershell
$env:MAX_ITERATIONS="160000000"
node .\scripts\solve.mjs
Remove-Item Env:MAX_ITERATIONS
```

## 8. Vercel deployment (CLI)

### 8.1 Install Vercel CLI

```powershell
npm install -g vercel
```

### 8.2 Login

```powershell
vercel login
```

### 8.3 Link project and deploy

Run in the project folder:

```powershell
cd "C:\Users\Raj Dubey\Desktop\Challenge\Web\2"
vercel
```

When prompted:
- Set up and deploy: `Y`
- Scope: choose your account
- Link to existing project: `N` (first time)
- Project name: choose any
- Directory: `./`

### 8.4 Set production env vars

Run these commands one by one (each command prompts for value):

```powershell
vercel env add CTF_FLAG production
vercel env add CHALLENGE_TTL_MS production
vercel env add POW_DIFFICULTY production
vercel env add CHALLENGE_SIGNING_KEY production
```

Suggested values:
- `CTF_FLAG` -> your real event flag
- `CHALLENGE_TTL_MS` -> `600000`
- `POW_DIFFICULTY` -> `5` or `6`
- `CHALLENGE_SIGNING_KEY` -> long random secret (at least 32 chars)

### 8.5 Redeploy after adding env vars

```powershell
vercel --prod
```

### 8.6 Validate deployed target

```powershell
$env:BASE_URL="https://your-project-name.vercel.app"
node .\scripts\solve.mjs
Remove-Item Env:BASE_URL
```

## 9. API quick-check commands

### 9.1 Fetch a challenge ticket only

```powershell
Invoke-RestMethod -Method GET -Uri "http://localhost:3000/api/challenge"
```

### 9.2 Build production bundle check

```powershell
npm run build
```

## 10. Rare payload canonical form (reference)

Decoded payload must exactly match:

```text
admin' OR JSON_UNQUOTE(JSON_EXTRACT('{"k":"<seed>:<proof>"}','$.k'))='<seed>:<proof>' AND ST_Distance_Sphere(POINT(0,0),POINT(0,0))=0 AND 'x' LIKE 'x
```

Then sent as:

```text
payload = base64(base64(template))
```

## 11. Troubleshooting

- If response says `challenge expired`, run solver immediately after ticket generation (or keep TTL higher).
- If response says `proof of work invalid`, check that `proof` is mined using current `seed`.
- If response says `common injection blocked`, your payload changed from canonical format.
- If response says `auth rejected`, ensure exact spacing/casing/punctuation of template before double base64.
