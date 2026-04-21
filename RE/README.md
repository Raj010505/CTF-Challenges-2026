# 🔬 Reverse Engineering Challenges

Reverse engineering challenges focused on binary analysis, decompilation, control flow analysis, and code recovery. These challenges develop your ability to understand binary code and extract hidden logic without access to source code.

## 📋 Challenge Overview

| # | Challenge | Difficulty | Type | Concept |
|---|-----------|-----------|------|---------|
| 1 | Simple Binary | Easy | Basic RE | Static analysis, strings, XOR |
| 2 | Chakravyuha | Medium | Complex RE | State machines, multiple stages |
| 3 | Baby Steps Walkthrough | Medium | Guided RE | Step-by-step reverse engineering |
| 4 | Challenge Extreme | Hard | Advanced RE | Complex obfuscation |
| 5-9 | Advanced Challenges | Hard-Extreme | Expert RE | Various techniques |

## 🎯 Detailed Challenge Descriptions

### Challenge 1: Simple Binary (re.c)
**Difficulty**: 🟢 Easy | **Category**: Basic Reverse Engineering

**Flag**: `Raj{Test}`

**Objective**: Reverse engineer a simple binary to extract the hidden flag.

#### Challenge Description
A straightforward C program that compares user input against a hardcoded value. The comparison mechanism is XOR-based obfuscation, making it non-trivial to recover via `strings` alone.

#### Key Concepts
- Static binary analysis
- String extraction from binaries
- XOR encryption/decryption
- Control flow identification
- Memory layout analysis

#### Exploitation Path

**Step 1**: Load into Ghidra/IDA
```bash
# Open in Ghidra
ghidra ./challenge
```

**Step 2**: Locate main function
- Navigate to main() in function list
- Analyze parameter handling (argc, argv)
- Look for string comparisons

**Step 3**: Identify XOR operation
- Look for loops and XOR instructions
- Expected pattern: `char XOR constant`
- Find the XOR key (usually 0x42)

**Step 4**: Extract encrypted array
```
Hidden array (encrypted): [0x10, 0x23, 0x28, 0x39, 0x16, 0x27, 0x31, 0x36, 0x3F]
XOR key: 0x42
```

**Step 5**: Decrypt with Python
```python
hidden = [0x10, 0x23, 0x28, 0x39, 0x16, 0x27, 0x31, 0x36, 0x3F]
key = 0x42
flag = ''.join(chr(byte ^ key) for byte in hidden)
print("Flag:", flag)  # Raj{Test}
```

#### Tools & Commands
```bash
# Compile from source
gcc re.c -o challenge

# Extract strings (often fails for XOR)
strings challenge

# Disassemble
objdump -d challenge

# Dynamic analysis
gdb ./challenge
(gdb) run "test_input"
(gdb) disassemble main
```

---

### Challenge 2: Chakravyuha Challenge
**Difficulty**: 🟡 Medium | **Category**: Complex Binary Analysis

**Objective**: Analyze a multi-stage binary with complex validation logic.

#### Challenge Components
- **player_bundle_template/** - Skeleton for players
- **chakravyuha_challenge/** - Challenge directory with multiple stages
- **Detailed documentation** on build and deployment

#### Key Concepts
- Multi-stage validation
- Complex control flow
- String obfuscation
- Stage-by-stage flag validation
- Anti-analysis techniques

#### Walkthrough Structure
1. Initial reconnaissance and tool setup
2. Function identification and analysis
3. Stage-by-stage exploitation
4. Flag recovery and validation

---

### Challenge 3: Baby Steps Walkthrough
**Difficulty**: 🟡 Medium | **Category**: Guided Reverse Engineering

**Files**:
- `CHALLENGE_INFO.md` - Challenge specifications
- `WALKTHROUGH_BABY_STEPS.md` - Step-by-step guide
- `player/` - Challenge files for players
- `release_build/` - Compiled binaries

#### Features
- Beginner-friendly with detailed guides
- Progressive difficulty within the challenge
- Clear explanation of each step
- Visual aids and documentation

#### Learning Objectives
- Understanding binary structure
- Using decompilers effectively
- Tracing program execution
- Identifying validation routines

---

### Challenge 4: Challenge Extreme
**Difficulty**: 🟠 Hard | **Category**: Advanced Obfuscation

**Key Challenges**:
- Complex obfuscation techniques
- Multiple layers of encoding
- Non-standard control flow
- Anti-debugging mechanisms
- State machine logic

#### Approach
1. Identify obfuscation patterns
2. Defeat anti-analysis tricks
3. Recover original logic
4. Extract hidden data

---

### Challenge 5-9: Advanced Challenges (5, 6, 7, 8, 9)
**Difficulty**: 🟠-🔴 Hard to Extreme

These challenges showcase advanced reverse engineering techniques:

**Challenge 5**: Multiple obfuscation layers
**Challenge 6**: Cryptographic routines
**Challenge 7**: Protocol-based challenges
**Challenge 8**: Complex state machines
**Challenge 9**: System-level code

Each includes:
- `author-solve.md` - Author's solution approach
- `build.ps1` - Build script (Windows)
- `README.md` - Challenge documentation
- `src/` - Source code directory

---

## 🛠️ Required Tools

### Essential Tools

**Ghidra** - NSA's Open-Source Decompiler
```bash
# Download
wget https://github.com/NationalSecurityAgency/ghidra/releases/download/Ghidra_11.0_build/ghidra_11.0_PUBLIC_20231222.zip

# Extract and run
unzip ghidra_11.0_PUBLIC_20231222.zip
cd ghidra_11.0_PUBLIC/
./ghidraRun
```

**radare2** - Reverse Engineering Framework
```bash
# Install
git clone https://github.com/RadareOrg/radare2.git
cd radare2
./sys/install.sh

# Or using package manager
sudo apt-get install radare2
```

**GDB** - GNU Debugger
```bash
sudo apt-get install gdb

# Enhanced debugging
apt-get install gdb-peda  # GDB with PEDA (Python Exploit Development Assistance)
```

**IDA Pro** (Optional, Commercial)
- Industry standard decompiler
- Free version available
- Download: https://www.hex-rays.com/ida-free/

### Utility Tools

```bash
# Binary analysis
sudo apt-get install binutils
  # Includes: objdump, readelf, nm, strings, ldd

# System tracing
sudo apt-get install strace ltrace
```

### Python Libraries
```bash
pip install capstone  # Disassembly
pip install keystone  # Assembly
pip install unicorn   # Emulation
pip install pwntools  # CTF utilities
```

---

## 📚 Learning Resources

### Reverse Engineering Fundamentals
- [Binary Exploitation - Guyinatuxedo](https://guyinatuxedo.github.io/)
- [Ghidra Official Documentation](https://ghidra-sre.org/CheatSheet.html)
- [radare2 Book](https://book.rada.re/)
- [OWASP - Reverse Engineering](https://owasp.org/www-community/attacks/Decompilation)

### Detailed Tutorials
- [Reverse Engineering x86 Binaries](https://www.pluralsight.com/courses/reverse-engineering-x86-binaries)
- [TryHackMe - Reverse Engineering](https://tryhackme.com/room/introductiontoassembly)
- [HackTheBox - RE Challenges](https://www.hackthebox.com/)

### Advanced Topics
- [Control Flow Deobfuscation](https://recon.cx/2019/pdf/recon2019-09-Chris-Eagle-Taming-the-Beast-Reversing-an-Embedded-Device.pdf)
- [Anti-Reverse Engineering Techniques](https://www.usenix.org/conference/usenixsecurity14)
- [Binary Instrumentation with DynamoRIO](https://dynamorio.org/)

---

## 💡 Reverse Engineering Methodology

### The 5-Phase Approach

#### Phase 1: Reconnaissance
- Gather basic info: file type, architecture, OS
- Check for strings and symbols
- Identify entry points

```bash
# Reconnaissance commands
file ./binary
strings ./binary | grep -i flag
readelf -h ./binary  # Headers
ldd ./binary         # Library dependencies
nm ./binary          # Symbol table
```

#### Phase 2: Static Analysis
- Load into decompiler (Ghidra/IDA)
- Identify main function and control flow
- Map functions and data structures
- Look for suspicious patterns

#### Phase 3: Pattern Recognition
- Identify common patterns: loops, conditionals
- Recognize encryption/hashing routines
- Find validation logic
- Spot anti-analysis code

#### Phase 4: Dynamic Analysis
- Run with debugger
- Set breakpoints at key functions
- Inspect memory and registers
- Monitor system calls

```bash
# Dynamic analysis with gdb
gdb ./binary
(gdb) break main
(gdb) run arg1 arg2
(gdb) step
(gdb) next
(gdb) print $rax      # Print register
(gdb) x/100x $rsp     # Examine memory
```

#### Phase 5: Exploitation & Flag Recovery
- Develop exploit script
- Automate the solution
- Extract the flag
- Document methodology

---

## 🔧 Common Techniques & Solutions

### Identifying Encrypted Arrays
```python
# Typical pattern in decompiler:
# encrypted_array[9] = {0x10, 0x23, 0x28, 0x39, 0x16, 0x27, 0x31, 0x36, 0x3F}
# xor_key = 0x42

# Decode with:
def decode_xor_array(encrypted, key):
    return ''.join(chr(byte ^ key) for byte in encrypted)
```

### Bypassing Opaque Predicates
- Look for always-true or always-false branches
- Use control flow analysis to identify dead code
- Follow the non-dead-code path

### Defeating Anti-Debugging
- Use PTRACE_DETACH bypass techniques
- Skip anti-debug checks
- Use alternative debuggers (lldb, windbg)

### Extracting Constants
```bash
# Find magic numbers
objdump -d binary | grep -E "0x[0-9a-f]{4,}"

# Use radare2
r2 -c "aaaa; pds @ main" binary
```

---

## ✅ Success Criteria

For each reverse engineering challenge:
- ✅ Successfully load and navigate the binary
- ✅ Identify key functions and logic
- ✅ Locate the validation/comparison mechanism
- ✅ Extract or compute the hidden flag
- ✅ Create a fully documented solution
- ✅ Develop an automated exploit (if applicable)

---

## 🚀 Progression Recommendations

**Beginner Path**:
1. RE/1 - Simple Binary with XOR
2. RE/3 - Baby Steps Walkthrough
3. RE/2 - Chakravyuha Challenge

**Intermediate Path**:
1. RE/4 - Challenge Extreme
2. RE/5-6 - Advanced challenges with multiple techniques

**Expert Path**:
1. RE/7-9 - Extreme challenges with sophisticated obfuscation
2. Multi-stage challenges with anti-analysis

---

## 🎯 Key Takeaways

By completing these challenges, you'll master:
- Binary file format analysis (ELF, PE, Mach-O)
- Decompiler usage and interpretation
- Assembly language reading
- Debugger operation
- Cryptographic pattern recognition
- Code obfuscation techniques
- Real-world exploitation methodology

---

**Remember**: Every binary can be understood - it's just a matter of time, tools, and methodology. Happy reversing!**
