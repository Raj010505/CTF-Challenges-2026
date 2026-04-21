# The Astral Locksmith (Next.js CTF Challenge)

A multi-stage web challenge with 5 layered puzzles, staged key validation, and final flag unlock.

## Features

1. Five puzzle stages with mixed techniques (acrostic, Caesar shift, binary decode, coordinate mapping, API oracle).
2. Backend stage checker endpoint: /api/stage.
3. Oracle endpoint requiring custom header: /api/oracle.
4. Final flag endpoint: /api/final.
5. Full baby-step solve walkthrough at docs/walkthrough.md.

## Local Run

1. Install dependencies:
	npm install
2. Start dev server:
	npm run dev
3. Open:
	http://localhost:3000

## Build Check

1. Lint:
	npm run lint
2. Build:
	npm run build
3. Start production build:
	npm run start

## Push to GitHub (exact commands)

1. Initialize and commit (repo is already initialized by create-next-app, but these are safe):
	git add .
	git commit -m "Create Astral Locksmith challenge"
2. Create a GitHub repo and copy its URL.
3. Add remote:
	git remote add origin https://github.com/<your-username>/<your-repo>.git
4. Push:
	git branch -M main
	git push -u origin main

If remote already exists, use:
git remote set-url origin https://github.com/<your-username>/<your-repo>.git

## Deploy to Vercel (exact commands)

1. Install Vercel CLI globally (once):
	npm i -g vercel
2. Login:
	vercel login
3. Deploy preview:
	vercel
4. Deploy production:
	vercel --prod

The project includes vercel.json configured for Next.js.

## Author Notes

No challenge can be guaranteed to be unsolvable by AI. This implementation is designed to be AI-resistant by requiring mixed reasoning and request-level interaction rather than single-step guessing.
