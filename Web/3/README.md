# Neth3r Cart CTF Challenge

Vercel-deployable web challenge where players must buy a protected item from an empty wallet by abusing coupon validation.

## Challenge Story

- Product: `Vault Access Token`
- Price: `INR 1500`
- Wallet balance: `INR 0`
- Goal: Purchase item and receive the flag

## Player Surface

- `/` UI for item, coupon, and checkout
- `/api/items`
- `/api/wallet`
- `/api/coupon/apply`
- `/api/checkout`

No vulnerability hints are intentionally exposed in frontend text.

## Local Run

1. Install dependencies:
   - `npm install`
2. Run local Vercel dev server:
   - `npx vercel dev`
   - If you hit `Cannot find module 'C:\\Users\\<name>'` on Windows PowerShell, run:
     - `$env:NODE_OPTIONS=''`
     - `npx vercel dev`
   - If VS Code still injects debug preload and Vercel functions fail, use fallback local server:
     - `npm run dev:local`
3. Open:
   - `http://localhost:3000`

## Vercel Deployment

1. Push this folder to a git repository.
2. Import repository in Vercel.
3. Set environment variables in project settings:
   - `FLAG=CH4KR4X2{P0D5_n3th3r_r00t_4cc3ss}`
   - `COUPON_SECRET=<strong-random-secret>`
4. Deploy.

### Serverless Behavior Guarantee

- This challenge is fully serverless on Vercel because all backend logic is inside API function routes under `/api/*`.
- No solve-critical state is stored in memory or local files, so solve path works across cold starts and multiple instances.

### Post-Deploy Solve Validation

1. Hit deployed endpoints:
   - `https://<your-app>.vercel.app/api/items`
   - `https://<your-app>.vercel.app/api/wallet`
2. Run organizer exploit directly against deployed URL:
   - `node tools/forge-coupon.js https://<your-app>.vercel.app 7`
3. Expected:
   - `valid: true` coupon in apply response
   - checkout returns `purchased: true`, `finalAmount: 0`, and `flag`

## Organizer Walkthrough (Exact Test Steps)

Use these steps privately to verify the challenge is solvable as intended.

1. Start local server:
   - `npx vercel dev`

2. Confirm normal checkout fails:
   - Open `http://localhost:3000`
   - Leave coupon blank.
   - Click checkout.
   - Expected: `Insufficient wallet balance`

3. Confirm random coupon fails:
   - In UI, apply `CART.100.test.deadbeef`
   - Expected: `Coupon invalid`

4. Run timing attack helper script:
   - `node tools/forge-coupon.js http://localhost:3000 4`
   - Script behavior:
     - Builds payload `CART.100.<nonce>`
     - Recovers 8-char signature nibble-by-nibble using response timing from `/api/coupon/apply`
     - Prints `Forged coupon: CART.100.<nonce>.<signature>`

5. Confirm forged coupon works:
   - Script automatically calls checkout with forged coupon.
   - Expected response includes:
     - `purchased: true`
     - `finalAmount: 0`
     - `flag: CH4KR4X2{P0D5_n3th3r_r00t_4cc3ss}` (or value in `FLAG` env var)

6. Validate through browser too:
   - Paste printed forged coupon in frontend coupon input.
   - Apply coupon.
   - Click checkout.
   - Flag should render in UI.

## Tuning Difficulty

- Increase timing side-channel reliability on noisy deployments:
  - Run script with more samples per candidate, e.g.:
    - `node tools/forge-coupon.js https://your-app.vercel.app 7`
- Make challenge harder/easier by adjusting `SIGNATURE_DELAY_MS` in `api/_lib/coupon.js`.

## Notes

- This is intentionally vulnerable code for CTF use only.
- Do not reuse this coupon logic in production systems.
