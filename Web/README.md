# 🌐 Web Security Challenges

Web application security challenges covering API vulnerabilities, authentication bypass, injection attacks, and modern web exploitation. These challenges test your ability to find and exploit vulnerabilities in web applications.

## 📋 Challenge Overview

| # | Challenge | Difficulty | Type | Concept |
|---|-----------|-----------|------|---------|
| 1 | Basic Flag Retrieval | Easy | Static HTML | Information disclosure |
| 2 | MineGate CTF Login | Medium | Next.js API | SQLi simulation, PoW |
| 3 | Advanced API Challenge | Medium-Hard | Node.js/React | Complex authentication |
| 4 | Secure API Gateway | Hard | Next.js Backend | Authorization bypass |

## 🎯 Detailed Challenge Descriptions

### Challenge 1: Basic Flag Retrieval
**Difficulty**: 🟢 Easy | **Category**: Information Disclosure

**Location**: `Web/1/`

**Objective**: Find the flag hidden in HTML/JavaScript.

#### Challenge Description
A simple HTML page containing a hidden flag. This is an introductory challenge to familiarize players with the CTF format and basic web exploitation concepts.

#### Solution Methods

**Method 1**: View Page Source
```bash
# Using curl
curl http://target/index.html

# Or in browser: Right-click → View Page Source
```

**Method 2**: DevTools Inspector
- Open Developer Tools (F12)
- Navigate to Elements/Inspector tab
- Search for "flag" in the HTML
- Check for hidden elements or comments

**Method 3**: Check JavaScript Files
- Look in `<script>` tags
- Check linked JavaScript files
- Search for string literals containing "flag"

**Expected Flag Location**:
- HTML comments: `<!-- flag{...} -->`
- JavaScript variables: `const flag = "flag{...}"`
- Hidden div: `<div style="display:none">flag{...}</div>`
- Data attributes: `data-flag="..."`

#### Files Included
- `index.html` - Main HTML file
- `flag.txt` - Flag file (may contain the answer)

---

### Challenge 2: MineGate CTF Login
**Difficulty**: 🟡 Medium | **Category**: API Security & Proof-of-Work

**Location**: `Web/2/`

**Objective**: Bypass authentication and extract the flag from a simulated SQLi-style challenge.

#### Challenge Description
A Minecraft-inspired login system deployed on Vercel using Next.js. The system simulates SQL injection in a safe, controlled manner. Players must:
1. Understand the Proof-of-Work (PoW) mechanism
2. Craft API payloads
3. Bypass authentication validation
4. Extract the flag

#### Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Deployment**: Vercel (serverless)
- **Authentication**: Custom challenge-response protocol

#### Environment Setup

**Local Development**:
```bash
# Install dependencies
npm install

# Create .env.local
cat > .env.local << EOF
CTF_FLAG=CH4KR4X2{P0D5_c0bb13_1nj3ct}
CHALLENGE_TTL_MS=600000
POW_DIFFICULTY=5
CHALLENGE_SIGNING_KEY=4eaf79e77d60ff3f452b193e5cefbccede4357b064a4594afff62a7d4a665646
EOF

# Run development server
npm run dev

# Access at http://localhost:3000
```

#### Key Components

**Environment Variables**:
```
CTF_FLAG                    # The flag to extract
CHALLENGE_TTL_MS           # Challenge timeout (10 minutes)
POW_DIFFICULTY             # Proof-of-Work difficulty (increase = harder)
CHALLENGE_SIGNING_KEY      # Key for signing challenges
```

**API Endpoints**:
- `GET /api/challenge` - Get a new PoW challenge
- `POST /api/verify` - Submit solution and authenticate

#### Challenge Mechanism

**Proof-of-Work Flow**:
1. Client requests challenge from server
2. Server responds with: `{ nonce, difficulty, target }`
3. Client must find: `nonce' where hash(nonce' + solution) < target`
4. Server verifies PoW and returns authentication token
5. Token grants access to flag

**PoW Calculation**:
```javascript
// Brute force to find valid solution
function solvePow(nonce, difficulty) {
  let solution = 0;
  while (true) {
    const hash = sha256(`${nonce}${solution}`);
    if (hash < difficulty_target) {
      return solution;
    }
    solution++;
  }
}
```

#### Exploitation Strategy

**Step 1**: Analyze the API
```bash
# Get challenge
curl http://localhost:3000/api/challenge

# Response:
# {
#   "nonce": "xyz123...",
#   "difficulty": 5,
#   "target": "0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
# }
```

**Step 2**: Solve PoW
```python
import hashlib

def solve_pow(nonce, difficulty):
    solution = 0
    target = '0' * difficulty + 'f' * (64 - difficulty)
    
    while True:
        hash_input = f"{nonce}{solution}".encode()
        hash_output = hashlib.sha256(hash_input).hexdigest()
        
        if hash_output < target:
            return solution
        solution += 1

# Use the solution
```

**Step 3**: Submit and Get Flag
```bash
# Submit PoW solution
curl -X POST http://localhost:3000/api/verify \
  -H "Content-Type: application/json" \
  -d '{"nonce": "...", "solution": 12345, "payload": "admin\" OR \"1\"=\"1"}'

# Extract flag from response
```

#### Flask-Based Simulation

The challenge simulates SQLi safely:
```python
# NOT a real SQL injection
# The server never executes user SQL

# Simulated logic:
if validate_proof_of_work(nonce, solution):
    if validate_payload(user_payload):  # Custom validation, not SQL
        return {"flag": CTF_FLAG}
```

#### Files Included
- `package.json` - Dependencies
- `app/` - Next.js application code
- `pages/api/` - API routes
- `.env.local` - Configuration

---

### Challenge 3: Advanced API Challenge
**Difficulty**: 🟠 Medium-Hard | **Category**: API & Authentication

**Location**: `Web/3/`

**Objective**: Exploit complex API authentication and retrieve sensitive data.

#### Key Concepts
- Token-based authentication
- JWT analysis
- API rate limiting bypass
- Session fixation
- API enumeration

#### Challenges Within Challenge
1. Discover all API endpoints
2. Bypass rate limiting
3. Extract authentication tokens
4. Forge or manipulate tokens
5. Access unauthorized endpoints
6. Retrieve the flag

#### Tools Required
- Burp Suite or similar proxy
- `curl` for API testing
- `jwt.io` for token analysis
- Python scripting

---

### Challenge 4: Secure API Gateway
**Difficulty**: 🟠 Hard | **Category**: Authorization Bypass

**Location**: `Web/4/`

**Objective**: Bypass security controls in a Next.js API gateway.

#### Key Concepts
- Authorization vulnerabilities
- API gateway bypass techniques
- Role-based access control (RBAC) bypass
- Privilege escalation
- Business logic flaws

#### Complex Scenarios
- Admin endpoint discovery
- Permission model analysis
- Token manipulation
- Path traversal in APIs
- Horizontal privilege escalation

---

## 🛠️ Required Tools

### Development Tools

**Node.js & npm**
```bash
# Install Node.js (includes npm)
# https://nodejs.org/

# Verify installation
node --version
npm --version
```

**Git** (for version control)
```bash
sudo apt-get install git
```

### API Testing Tools

**curl** (Command Line)
```bash
# Basic GET
curl http://localhost:3000/api/

# POST with JSON
curl -X POST http://localhost:3000/api/endpoint \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'

# With authentication
curl -H "Authorization: Bearer TOKEN" http://localhost:3000/api/
```

**Postman** (GUI)
- Download: https://www.postman.com/downloads/
- Comprehensive API testing
- Request history and collections

**Burp Suite Community** (Web Proxy)
```bash
# Install Java first
sudo apt-get install default-jdk

# Download Burp Community Edition
# https://portswigger.net/burp/communitydownload

# Run
java -jar burpsuite_community.jar
```

**ffuf** (Fuzzing)
```bash
# Install
go get -u github.com/ffuf/ffuf/v2

# Fuzz API endpoints
ffuf -u http://localhost:3000/api/FUZZ -w wordlist.txt
```

### Python Libraries
```bash
pip install requests      # HTTP library
pip install pyjwt        # JWT handling
pip install flask        # For Challenge 3 Flask apps
pip install cryptography # Cryptographic operations
```

---

## 📚 Learning Resources

### Web Security Fundamentals
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [Web Security Academy - PortSwigger](https://portswigger.net/web-security)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

### Specific Topics
- [JWT Security Best Practices](https://auth0.com/resources/ebooks/jwt-security-best-practices)
- [SQL Injection Prevention](https://owasp.org/www-community/attacks/SQL_Injection)
- [API Authentication & Authorization](https://oauth.net/)
- [Proof-of-Work Concepts](https://en.wikipedia.org/wiki/Proof_of_work)

### Hands-On Labs
- [TryHackMe - Web Security](https://tryhackme.com/module/web-security)
- [HackTheBox - Web Challenges](https://www.hackthebox.com/)
- [DVWA - Damn Vulnerable Web App](http://www.dvwa.co.uk/)
- [WebGoat - OWASP Training](https://owasp.org/www-project-webgoat/)

---

## 💡 Web Exploitation Methodology

### The 6-Step Process

#### Step 1: Reconnaissance
- Map all endpoints
- Identify technologies
- Document API structure
- Check for documentation

```bash
# Endpoint discovery
curl http://target/robots.txt
curl http://target/sitemap.xml
curl http://target/.well-known/
```

#### Step 2: Vulnerability Scanning
- Use automated scanners
- Identify obvious flaws
- Test input validation
- Check authentication

#### Step 3: Manual Testing
- Test each endpoint thoroughly
- Try common payloads
- Test boundary conditions
- Check error messages for leaks

#### Step 4: Exploitation
- Develop exploit code
- Automate the attack
- Extract sensitive data
- Gain unauthorized access

#### Step 5: Verification
- Confirm the vulnerability
- Document proof-of-concept
- Measure impact
- Clean up (if applicable)

#### Step 6: Documentation
- Write detailed report
- Include steps to reproduce
- Suggest fixes
- Provide evidence

---

## ✅ Success Criteria

For each web challenge:
- ✅ Identify all vulnerabilities
- ✅ Successfully exploit the application
- ✅ Extract the flag
- ✅ Document your methodology
- ✅ Create reproducible exploit code
- ✅ Understand the underlying concepts

## 🚀 Progression Path

**Beginner**:
1. Web/1 - Static HTML flag finding
2. Web/3 - Basic API testing

**Intermediate**:
1. Web/2 - PoW and API authentication
2. Web/4 - Authorization bypass

**Advanced**:
- Combine techniques from multiple challenges
- Find chained vulnerabilities
- Develop complex exploits

---

## 🔗 Real-World Application

Web security skills are critical for:
- **Penetration Testing** - Identifying web vulnerabilities
- **Bug Bounty Programs** - Finding real-world flaws
- **Secure Development** - Building secure applications
- **Security Research** - Discovering new attack vectors
- **Incident Response** - Analyzing web breaches

---

## 📝 Exploit Template

```python
#!/usr/bin/env python3
"""
Web Challenge Exploit Template
"""

import requests
import json
from typing import Dict, Optional

class WebChallengeExploit:
    def __init__(self, target_url: str):
        self.target = target_url
        self.session = requests.Session()
    
    def discover_endpoints(self) -> list:
        """Discover API endpoints"""
        endpoints = [
            "/api/",
            "/api/flag",
            "/api/challenge",
            "/admin",
            "/admin/flag"
        ]
        
        active = []
        for endpoint in endpoints:
            try:
                resp = self.session.get(f"{self.target}{endpoint}")
                if resp.status_code < 500:
                    active.append(endpoint)
                    print(f"[+] Found: {endpoint}")
            except:
                pass
        
        return active
    
    def solve_challenge(self) -> Optional[str]:
        """Main exploitation routine"""
        print("[*] Starting exploitation...")
        
        # Get challenge
        resp = self.session.get(f"{self.target}/api/challenge")
        challenge_data = resp.json()
        
        # Solve
        print("[*] Solving challenge...")
        
        # Extract flag
        flag_resp = self.session.post(
            f"{self.target}/api/flag",
            json={"solution": "..."}
        )
        
        flag = flag_resp.json().get("flag")
        return flag

if __name__ == "__main__":
    target = "http://localhost:3000"
    exploit = WebChallengeExploit(target)
    
    # Discover endpoints
    exploit.discover_endpoints()
    
    # Solve and get flag
    flag = exploit.solve_challenge()
    print(f"[+] Flag: {flag}")
```

---

**Master web security - it's one of the most in-demand skills in cybersecurity!**
