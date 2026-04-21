# ⚙️ Backend Security Challenges

Advanced system-level security challenges focusing on binary exploitation, memory corruption, reverse engineering, and low-level vulnerabilities. These challenges test your understanding of C programming, buffer overflows, heap exploitation, and binary analysis.

## 📋 Challenge Overview

| # | Challenge | Difficulty | Type | Concept |
|---|-----------|-----------|------|---------|
| 1 | Heap Havoc | Hard | Heap Exploitation | Memory corruption, heap spraying |
| 2 | Pod Authentication | Easy | Reverse Engineering | XOR encryption, obfuscation |
| 3 | Obsidian Pod Extreme | Extreme | Binary Analysis | Complex obfuscation, state machines |
| 4 | Vault | Hard | Reverse Engineering | Memory analysis, encryption |
| 5 | Diagnostic | Medium | Binary Analysis | System diagnostics, protocol analysis |
| 6 | Oracle | Medium | Reverse Engineering | Cryptographic routines, oracle attacks |
| 7 | Protocol | Hard | Protocol Analysis | Network protocols, binary parsing |
| 8 | Operator | Hard | Reverse Engineering | Complex control flow |
| 9 | Hypervisor | Extreme | System-level RE | Virtualization, low-level code |
| 10 | Gateway | Extreme | Protocol/Exploit | Advanced exploitation, gateway logic |

## 🎯 Detailed Challenge Descriptions

### Challenge 1: Heap Havoc
**Difficulty**: 🟠 Hard | **Category**: Heap Exploitation

**Objective**: Exploit heap memory corruption vulnerabilities.

**Key Concepts**:
- Heap allocator behavior
- Use-after-free vulnerabilities
- Heap spraying techniques
- Arbitrary memory write/read

**Suggested Approach**:
1. Analyze heap allocation patterns
2. Identify potential heap overflow
3. Craft exploit to manipulate heap metadata
4. Gain code execution or information disclosure

---

### Challenge 2: Pod Authentication
**Difficulty**: 🟢 Easy | **Category**: Reverse Engineering & Cryptanalysis

**Objective**: Reverse engineer an authentication system and extract the flag.

**Key Concepts**:
- Binary decompilation
- XOR encryption/decryption
- Obfuscation techniques
- Static code analysis

**Encoded Information**:
- Flag stored as XOR-encoded integer array
- Each character: `original_char XOR 42 = encoded_byte`
- Must trace through multiple state checks

**Solution Path**:
1. Load binary in Ghidra/IDA
2. Identify the XOR operation and key (42)
3. Locate the encrypted array
4. Write Python script to decode:
   ```python
   hidden = [105, 114, 26, 113, 120, 26, 114, 24, 81, 122, 26, 110, 31, 69, 80, 25, 88, 26, 78, 26, 83, 69, 82, 93, 68, 87]
   flag = ''.join(chr(byte ^ 42) for byte in hidden)
   print(flag)  # CH4KR4X2{P0D5_z3r0d4y_pwn}
   ```

**Files**:
- `pod_auth.c` - Source code
- `pod_auth_bin` - Compiled binary (debug symbols stripped)

---

### Challenge 3: Obsidian Pod Extreme
**Difficulty**: 🔴 Extreme | **Category**: Advanced Binary Analysis

**Objective**: Analyze and exploit an extremely obfuscated binary with complex state machines.

**Key Concepts**:
- Opaque predicates
- State machine analysis
- Decompiler limitations
- Complex control flow obfuscation

**Challenge Elements**:
- Massive while(true) loop with state machine
- Switch statements with always-true/always-false branches
- XOR-based flag encoding
- Length validation checks
- Multi-stage validation

**Recommended Tools**:
- Ghidra (with advanced control flow analysis)
- radare2 (for script-based analysis)
- gdb (for dynamic analysis and tracing)

---

### Challenge 4: Vault
**Difficulty**: 🟠 Hard | **Category**: Reverse Engineering

**Objective**: Crack a vault/encryption mechanism to extract protected data.

**Focus Areas**:
- Cryptographic key extraction
- Memory analysis
- Encryption algorithm identification
- Key recovery techniques

---

### Challenge 5-10: Advanced Challenges

These challenges progressively increase in difficulty and introduce:
- Complex protocol implementations
- Virtual machine-like execution
- Multi-layer obfuscation
- Sophisticated anti-analysis techniques
- System-level exploitation
- Gateway/router-level vulnerabilities

## 🛠️ Required Tools

### Essential
- **Ghidra** - Powerful open-source decompiler
  ```bash
  # Download from: https://github.com/NationalSecurityAgency/ghidra
  ```

- **radare2** - Reverse engineering framework
  ```bash
  # Install on Linux
  sudo apt-get install radare2
  ```

- **gdb** - GNU Debugger
  ```bash
  # Install on Linux
  sudo apt-get install gdb
  ```

### Optional But Recommended
- **IDA Pro** (paid) - Industry standard decompiler
- **Rizin** - Improved version of radare2
- **Cutter** - GUI for Rizin/radare2
- **strace** - System call tracer
- **ltrace** - Library call tracer

## 🔄 Compilation & Testing

To compile the C challenges from source:

```bash
# Basic compilation
gcc challenge.c -o challenge_bin

# With debugging symbols (for learning)
gcc -g challenge.c -o challenge_bin_debug

# Strip debugging symbols (challenge distribution)
strip challenge_bin

# Compile with security mitigations disabled (if needed for analysis)
gcc -fno-stack-protector -z execstack challenge.c -o challenge_bin

# Use specific architecture (32-bit)
gcc -m32 challenge.c -o challenge_bin
```

## 📚 Learning Resources

### Binary Analysis & Reverse Engineering
- [Ghidra Official Documentation](https://ghidra-sre.org/)
- [radare2 Book](https://book.rada.re/)
- [Reverse Engineering with Ghidra - SANS Tutorial](https://www.sans.org/reading-room/whitepapers/)
- [Binary Exploitation Notes](https://guyinatuxedo.github.io/)

### C Programming & Memory Corruption
- [Buffer Overflow Attacks - Aleph One](https://www.usenix.org/publications/login/december-2014-volume-39-number-6)
- [Heap Exploitation Techniques](https://heap-exploitation.dhavalkapil.com/)
- [Linux x86 Calling Convention](https://en.wikipedia.org/wiki/X86_calling_conventions)

### Cryptography in Binaries
- [A Brief Overview of Common Cryptographic Primitives](https://toadstyle.org/cryptopals/)
- [Cryptopals Challenges](https://cryptopals.com/)

## 💡 Tips & Best Practices

1. **Start with Static Analysis**
   - Load the binary in Ghidra
   - Identify main function and key operations
   - Look for string references, encrypted data

2. **Use Dynamic Analysis**
   - Debug with gdb/lldb
   - Set breakpoints at key functions
   - Inspect memory during execution

3. **Pattern Recognition**
   - Look for common patterns: loops, comparisons, XOR operations
   - Identify encryption/hashing routines
   - Track data flow from input to validation

4. **Documentation**
   - Annotate your analysis in Ghidra
   - Create flowcharts for complex logic
   - Document all findings

5. **Automation**
   - Write Python scripts to extract/analyze data
   - Use radare2 scripts for batch analysis
   - Automate exploit generation

## ✅ Success Criteria

For each backend challenge:
- ✅ Understand the binary's logic and purpose
- ✅ Identify the vulnerability or security mechanism
- ✅ Extract or compute the hidden flag
- ✅ Document your exploitation methodology
- ✅ Create a reusable exploit script (if applicable)

## 🚀 Progression Path

**Recommended Order**:
1. **Start**: Challenge 2 (Pod Authentication) - Easy introduction
2. **Next**: Challenge 4-6 (Medium difficulty)
3. **Then**: Challenge 1, 7-8 (Advanced)
4. **Final**: Challenge 3, 9-10 (Extreme difficulty)

---

**Happy Hacking! Remember: Every binary can be understood with enough patience and the right tools!**
