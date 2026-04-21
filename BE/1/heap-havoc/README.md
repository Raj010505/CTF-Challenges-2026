# Heap Havoc (Local First)

Heap Havoc is a binary exploitation challenge wrapped in a Next.js app route.
Players submit two payload strings, and the API executes the vulnerable binary.

## Project Layout

```text
heap-havoc/
|- app/
|  |- api/exploit/route.ts
|  |- globals.css
|  |- layout.tsx
|  |- page.tsx
|- bin/
|  |- build-linux.sh
|  |- build-local.ps1
|  |- flag.txt
|  |- vuln.c
|  |- vuln (linux target, generated)
|  \- vuln.exe (windows debug build, generated)
|- next.config.ts
\- package.json
```

## 1. Install Dependencies

```bash
npm install
```

## 2. Build the Binary

For deployment-compatible testing, build a Linux binary.

### Linux / WSL (recommended)

```bash
npm run build:bin:linux
```

Equivalent manual command:

```bash
cd bin
gcc -O0 -fno-stack-protector -no-pie -static vuln.c -o vuln
```

### Windows-only debug build

```powershell
npm run build:bin:win
```

This produces `bin/vuln.exe` for native Windows checks.

## 3. Run Locally

```bash
npm run dev
```

Open http://localhost:3000 and use the operator panel.

## 4. API Test (CLI)

```bash
curl -X POST http://localhost:3000/api/exploit \
	-H "Content-Type: application/json" \
	-d '{
		"name1": "PlayerOne",
		"name2": "PlayerTwo"
	}'
```

## Notes

- The API route expects the executable at `bin/vuln`.
- `next.config.ts` includes `bin/**/*` in output tracing so the executable is bundled for server runtime.
- This challenge is intentionally vulnerable. Keep it isolated to local/dev and CTF environments.
