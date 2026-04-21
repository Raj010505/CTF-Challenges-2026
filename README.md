# CTF Challenges 2026

🚩 **Comprehensive CTF Challenge Collection** - A curated set of cybersecurity challenges spanning multiple domains, designed to test and improve offensive security skills.

## 📋 Overview

This repository contains **30+ Capture The Flag (CTF) challenges** across six major cybersecurity domains:

| Domain | Challenges | Difficulty Range | Focus Areas |
|--------|-----------|-----------------|------------|
| **AI/ML Security** | 1 | Easy-Medium | Machine Learning exploitation, data extraction |
| **Backend Security** | 10 | Easy-Extreme | Binary exploitation, reverse engineering, memory corruption |
| **Cryptography** | 2 | Easy-Medium | Steganography, cipher analysis, audio forensics |
| **OSINT** | 6 | Easy-Hard | Open-source intelligence, DNS enumeration, web reconnaissance |
| **Reverse Engineering** | 9 | Easy-Extreme | Binary analysis, decompilation, state machines, obfuscation |
| **Web Security** | 4 | Easy-Hard | API security, SQL injection, authentication bypass |

## 🎯 Challenge Categories

### 🤖 [AI/ML Security](./AI/)
Challenges involving machine learning models, neural networks, and AI-based vulnerabilities. Learn to extract models, analyze adversarial inputs, and break ML-based security mechanisms.

### ⚙️ [Backend Security](./BE/)
Low-level system programming challenges covering buffer overflows, heap exploitation, binary analysis, and memory corruption techniques. Includes complex C challenges with varying difficulty levels.

### 🔐 [Cryptography](./Crypto/)
Encryption, decryption, steganography, and forensic analysis challenges. Learn classical and modern cryptographic techniques, including audio phase cancellation and image LSB steganography.

### 🔍 [OSINT (Open Source Intelligence)](./OSINT/)
Challenges requiring reconnaissance, information gathering, DNS analysis, and public data mining. Develop skills in domain enumeration, passive reconnaissance, and metadata extraction.

### 🔬 [Reverse Engineering](./RE/)
Binary analysis and reverse engineering challenges of varying complexity. Learn to decompile binaries, understand control flow, identify obfuscation techniques, and extract hidden logic.

### 🌐 [Web Security](./Web/)
Web application security challenges covering API vulnerabilities, authentication bypasses, injection attacks, and web-based exploits. Includes Next.js/React and Flask-based applications.

## 🚀 Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Raj010505/CTF-Challenges-2026.git
   cd CTF-Challenges-2026
   ```

2. **Navigate to a Challenge**
   ```bash
   cd <DOMAIN>/<CHALLENGE_NUMBER>
   cat Challenge.txt  # or README.md for Web challenges
   ```

3. **Read Challenge Files**
   - Each challenge directory contains a `Challenge.txt` or `README.md` describing the objective
   - Some challenges include `Walkthrough.txt` with hints and solutions
   - Look for exploit scripts, source code, or binary files

## 📊 Challenge Difficulty Legend

| Level | Description |
|-------|-------------|
| 🟢 **Easy** | Suitable for beginners; requires basic tool usage and fundamental concepts |
| 🟡 **Medium** | Intermediate level; combines multiple concepts and techniques |
| 🟠 **Hard** | Advanced challenges; requires deep technical knowledge and complex analysis |
| 🔴 **Extreme** | Expert-level; involves sophisticated exploitation, obfuscation, and multi-step solutions |

## 🛠️ Required Tools

Depending on which challenges you tackle, you may need:

### General Tools
- Linux environment (or WSL on Windows)
- Git

### Reverse Engineering & Binary Analysis
- **Ghidra** - Open-source decompiler/disassembler
- **IDA Pro** / **Rizin** - Advanced binary analysis
- **Radare2** - Reverse engineering framework
- **gdb / lldb** - Debuggers

### Cryptography & Forensics
- **Audacity** - Audio analysis and editing
- **Wireshark** - Network packet analysis
- **Steghide / ExifTool** - Steganography tools
- **Python libraries**: `pycryptodome`, `scipy`, `PIL`

### Web Security
- **Burp Suite Community** - Web vulnerability scanner
- **Node.js & npm** - For running Next.js applications
- **Python 3 & pip** - For Flask applications
- **curl / Postman** - API testing

### OSINT
- **dig / nslookup** - DNS tools
- **whois** - Domain information lookup
- **curl / wget** - Web scraping

## 📚 Learning Path

**For Beginners:**
1. Start with Web/1 (Flag retrieval from simple HTML)
2. Move to OSINT/1 (DNS interrogation)
3. Try Crypto/1 (Audio forensics with visual tools)
4. Progress to RE/1 (Simple binary analysis)

**For Intermediate:**
1. Web/2-3 (Authentication and API challenges)
2. OSINT/2-4 (Advanced reconnaissance)
3. BE/2-4 (Reverse engineering with C)
4. RE/2-4 (Complex binary analysis)

**For Advanced:**
1. BE/5-10 (Advanced exploitation challenges)
2. RE/5-9 (Extreme obfuscation and complexity)
3. Crypto/2 (Complex steganography)
4. AI/1 (ML model exploitation)

## 📝 Challenge Walkthroughs

Each challenge includes:
- ✅ **Challenge Description** - What you need to find
- ✅ **Difficulty Rating** - Estimated challenge level
- ✅ **Hint/Walkthrough** - Step-by-step solution path
- ✅ **Flag Format** - Expected flag format (e.g., `flag{}`, `CH4KR4X2{}`)

## 🎓 Key Concepts Covered

### Backend & Binary Exploitation
- Buffer overflow attacks
- Heap corruption techniques
- Integer overflow vulnerabilities
- State machine analysis
- Cryptographic key extraction

### Cryptography & Forensics
- XOR encryption/decryption
- Audio phase analysis and cancellation
- LSB steganography (Least Significant Bit)
- Digital signal processing (DSP)

### Reverse Engineering
- Static code analysis
- Decompilation techniques
- Opaque predicates and anti-analysis tricks
- Control flow graph analysis
- Binary instrumentation

### Web Security
- API authentication bypass
- SQL injection (simulated safely)
- Proof-of-Work challenges
- Token validation bypasses

### OSINT & Reconnaissance
- DNS enumeration and TXT records
- WHOIS information gathering
- Subdomain discovery
- DNS spoofing detection

## 🔄 Solution Verification

Each challenge has a specific flag format. Upon successful exploitation/analysis, you should obtain a flag in one of these formats:

- `flag{...}`
- `CH4KR4X2{...}`
- `Raj{...}`

**Document Your Solution:**
Create a `SOLUTION.md` or `exploit.py` in each challenge directory explaining:
1. The vulnerability/concept exploited
2. Step-by-step attack methodology
3. Code/commands used
4. The extracted flag

## 🌐 Repository Info

- **Author**: Raj
- **Created**: 2026
- **Repository**: [CTF-Challenges-2026](https://github.com/Raj010505/CTF-Challenges-2026)
- **License**: MIT (or as specified)

## 🤝 Contributing

Found an issue? Have a better solution? Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b solution/challenge-x`)
3. Document your solution thoroughly
4. Submit a pull request

## 📬 Contact & Support

For questions or clarifications about specific challenges:
- 📧 Email: [Your Contact Info]
- 🐙 GitHub Issues: Use the Issues tab for technical problems

---

## 📈 Challenge Statistics

- **Total Challenges**: 30+
- **Domains**: 6
- **Total Hours of Content**: 100+
- **Beginner-Friendly**: 10+
- **Extreme Difficulty**: 5+

---

## 🎖️ Challenge Directory

```
CTF-Challenges-2026/
├── README.md                    # This file
├── AI/                          # AI/ML Security (1 challenge)
│   └── 1/
├── BE/                          # Backend Security (10 challenges)
│   ├── 1/ (Heap Havoc)
│   ├── 2/ (Pod Authentication)
│   ├── 3/ (Obsidian Pod)
│   └── ... (up to 10)
├── Crypto/                      # Cryptography (2 challenges)
│   ├── 1/ (Audio Steganography)
│   └── 2/
├── OSINT/                       # Open Source Intelligence (6 challenges)
│   ├── 1/ (DNS Reconnaissance)
│   └── ... (up to 6)
├── RE/                          # Reverse Engineering (9 challenges)
│   ├── 1/ (Simple Binary)
│   └── ... (up to 9)
└── Web/                         # Web Security (4 challenges)
    ├── 1/ (Basic Flag)
    ├── 2/ (MineGate CTF)
    ├── 3/ (Advanced API)
    └── 4/
```

---

**Happy Hacking! 🎯 Good luck with the CTF challenges!**
