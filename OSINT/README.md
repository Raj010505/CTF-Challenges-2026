# 🔍 OSINT (Open Source Intelligence) Challenges

Open Source Intelligence challenges focused on reconnaissance, information gathering, DNS analysis, and public data mining. These challenges develop your skills in passive reconnaissance, domain enumeration, and digital footprint analysis.

## 📋 Challenge Overview

| # | Challenge | Difficulty | Type | Concept |
|---|-----------|-----------|------|---------|
| 1 | Whispers in the DNS | Easy | DNS Reconnaissance | TXT records, DNS queries |
| 2 | Domain Enumeration | Easy-Medium | Subdomain Discovery | Passive subdomain discovery |
| 3 | WHOIS Investigation | Medium | Domain Info | WHOIS queries, registrant data |
| 4 | Web Reconnaissance | Medium | Web Analysis | HTTP headers, metadata |
| 5 | Social Network Analysis | Medium-Hard | OSINT Correlation | Public profile linking |
| 6 | Infrastructure Mapping | Hard | Network Recon | IP ranges, ASN, BGP |

## 🎯 Detailed Challenge Descriptions

### Challenge 1: Whispers in the DNS (csesa.live)
**Difficulty**: 🟢 Easy | **Category**: DNS Reconnaissance

**Flag**: `flag{DNS_1s_N3v3r_TrulY_H1dd3n}`

**Objective**: Query DNS records to extract hidden information from TXT records.

#### Challenge Description
A suspected threat actor uses their public domain `csesa.live` to pass hidden messages without hosting web content. The information is hidden in DNS TXT records. Your task is to interrogate the domain's DNS infrastructure and extract the secret flag.

#### DNS Background
DNS (Domain Name System) is the protocol that translates domain names to IP addresses. Beyond standard A records, DNS supports many record types:
- **A**: IPv4 address (e.g., 1.2.3.4)
- **AAAA**: IPv6 address
- **CNAME**: Canonical name (alias)
- **MX**: Mail exchange (email servers)
- **TXT**: Text records (often used for verification, SPF, DKIM)
- **NS**: Nameserver delegation
- **SOA**: Start of Authority

**The Vulnerability**:
TXT records are designed for text data and are often overlooked during security audits. They can contain arbitrary text and are visible to anyone who queries the DNS.

#### Solution Methods

**Method 1**: Using `dig` (Domain Information Groper)
```bash
# Query TXT records specifically
dig TXT csesa.live

# Output should include:
# ;; ANSWER SECTION:
# csesa.live.        3600    IN    TXT    "flag{DNS_1s_N3v3r_TrulY_H1dd3n}"

# Get all record types
dig ANY csesa.live

# For more details
dig TXT csesa.live +short
```

**Method 2**: Using `nslookup` (for Windows/cross-platform)
```bash
# Query TXT records
nslookup -type=txt csesa.live

# Output format:
# Non-authoritative answer:
# csesa.live   text = "flag{DNS_1s_N3v3r_TrulY_H1dd3n}"

# Interactive mode
nslookup
> set type=txt
> csesa.live
```

**Method 3**: Using `host` command
```bash
# Simple query
host -t TXT csesa.live

# All records
host csesa.live
```

**Method 4**: Online DNS Lookup Tools
- https://mxtoolbox.com/
- https://dnschecker.org/
- https://www.nslookup.io/

#### Key Concepts Tested
- DNS protocol fundamentals
- Record types and purposes
- DNS enumeration techniques
- Command-line tool usage
- DNS as an information source

#### DNS Record Anatomy
```
Name:    csesa.live
Class:   IN (Internet)
Type:    TXT (Text record)
TTL:     3600 (Time to Live - seconds)
Data:    flag{DNS_1s_N3v3r_TrulY_H1dd3n}

Complete format:
csesa.live.  3600  IN  TXT  "flag{DNS_1s_N3v3r_TrulY_H1dd3n}"
```

---

### Challenge 2-6: Additional OSINT Challenges

#### Challenge 2: Domain Enumeration
**Difficulty**: 🟡 Medium | **Category**: Subdomain Discovery
- Enumerate subdomains passively
- Use DNS queries and public databases
- Tools: `amass`, `subfinder`, `cert-sh`

#### Challenge 3: WHOIS Investigation
**Difficulty**: 🟡 Medium | **Category**: Registrant Data
- Query WHOIS databases
- Extract registrant information
- Analyze domain registration patterns
- Tools: `whois`, `whoisrds.net`

#### Challenge 4: Web Reconnaissance
**Difficulty**: 🟡 Medium | **Category**: HTTP Headers & Metadata
- Analyze HTTP response headers
- Extract metadata from files
- Identify technologies used
- Tools: `curl`, `exiftool`, `Wappalyzer`

#### Challenge 5: Social Network Analysis
**Difficulty**: 🟠 Medium-Hard | **Category**: OSINT Correlation
- Link public profiles across platforms
- Extract user information
- Correlate data points
- Tools: Google Dorks, `sherlock`, Maltego

#### Challenge 6: Infrastructure Mapping
**Difficulty**: 🟠 Hard | **Category**: Network Reconnaissance
- Map IP ranges and ASNs
- Identify hosting providers
- Analyze network topology
- Tools: `shodan.io`, `bgpstream`, IP geolocation

---

## 🛠️ Required Tools & Setup

### Essential Command-Line Tools

**Linux/macOS Installation**:
```bash
# DNS tools
sudo apt-get install dnsutils  # dig, nslookup, host
sudo apt-get install bind-tools  # Alternative

# WHOIS
sudo apt-get install whois

# Network tools
sudo apt-get install curl wget
```

**macOS (Homebrew)**:
```bash
brew install bind curl wget
brew install whois
```

**Windows**:
- PowerShell includes `Resolve-DnsName` for DNS queries
- Download `dig` from ISC (https://www.isc.org/)
- Use Windows Subsystem for Linux (WSL) for full toolset

### Python-Based OSINT Tools

```bash
# Install Python packages
pip install dnspython  # DNS queries programmatically
pip install requests   # HTTP requests
pip install beautifulsoup4  # Web scraping
pip install whoisrds   # WHOIS queries
```

### Web-Based OSINT Platforms
- **Shodan** (https://shodan.io/) - Internet-wide device search
- **MXToolbox** (https://mxtoolbox.com/) - DNS/MX records
- **DNS Checker** (https://dnschecker.org/) - Global DNS propagation
- **Censys** (https://censys.io/) - Certificate search
- **SecurityTrails** (https://securitytrails.com/) - DNS history
- **VirusTotal** (https://virustotal.com/) - Domain analysis

### Advanced OSINT Tools

```bash
# Subdomain enumeration
amass enum -d target.com
subfinder -d target.com
assetfinder --subs-only target.com

# Email reconnaissance
theHarvester -d target.com -l 100

# Web scraping OSINT
cat urls.txt | xargs -I {} curl -I {}
```

---

## 📚 Learning Resources

### DNS & Networking Fundamentals
- [DNS Protocol Basics - CloudFlare](https://www.cloudflare.com/learning/dns/what-is-dns/)
- [DNS Record Types - Mozilla MDN](https://developer.mozilla.org/en-US/docs/Glossary/DNS)
- [ICANN - Domain Names](https://www.icann.org/)

### OSINT Techniques
- [OSINT Framework](https://osintframework.com/)
- [IH Academy OSINT Course](https://www.iheartosint.com/)
- [Bellingcat's Online Investigation Toolkit](https://www.bellingcat.com/)

### Tool Documentation
- [dig Manual](https://linux.die.net/man/1/dig)
- [nslookup Manual](https://linux.die.net/man/1/nslookup)
- [whois Manual](https://linux.die.net/man/1/whois)
- [Amass Documentation](https://github.com/OWASP/Amass)

### OSINT Courses
- [TryHackMe - OSINT](https://tryhackme.com/module/osint)
- [HackTheBox - OSINT Challenges](https://www.hackthebox.com/)

---

## 💡 OSINT Methodology

### The 7-Step OSINT Process

1. **Define Objectives**
   - What information do we need?
   - What are our constraints?

2. **Source Collection**
   - Identify all possible data sources
   - DNS, WHOIS, certificates, search engines

3. **Data Gathering**
   - Use automated tools (amass, subfinder)
   - Query public databases
   - Perform web searches

4. **Data Analysis**
   - Correlate information
   - Identify patterns
   - Create timelines

5. **Data Visualization**
   - Create mind maps
   - Build connection graphs
   - Timeline creation

6. **Reporting**
   - Document findings
   - Provide evidence
   - Present conclusions

7. **Feedback**
   - Iterate based on findings
   - Refine targeting

---

## 💡 Tips for Success

### General OSINT Tips
1. **Start Passive**
   - Never access/probe the target directly initially
   - Use public data only
   - Respect legal and ethical boundaries

2. **Use Multiple Sources**
   - No single tool gives complete picture
   - Cross-reference findings
   - Look for inconsistencies

3. **Maintain Notes**
   - Document all findings
   - Record timestamps
   - Save screenshots/copies

4. **Stay Current**
   - DNS records change
   - New subdomains appear
   - Infrastructure updates

### DNS-Specific Tips
1. **Understand TTL**
   - Lower TTL = more frequent updates
   - Higher TTL = cached longer

2. **Check All Record Types**
   - Not just A records
   - TXT, MX, NS records often contain info

3. **Use Different Resolvers**
   - Google: 8.8.8.8
   - Cloudflare: 1.1.1.1
   - Quad9: 9.9.9.9
   - Different results possible

4. **Historical Data**
   - SecurityTrails maintains DNS history
   - Archive.org has website snapshots
   - Useful for tracking changes

---

## ✅ Success Criteria

For each OSINT challenge:
- ✅ Gather information using passive methods
- ✅ Verify findings from multiple sources
- ✅ Extract the flag or required information
- ✅ Document your methodology
- ✅ Create a detailed report with evidence

---

## 🔗 Real-World Applications

OSINT skills are valuable for:
- **Penetration Testing** - Information gathering phase
- **Security Research** - Vulnerability research
- **Incident Response** - Threat attribution
- **Competitive Intelligence** - Business research
- **Investigative Journalism** - Fact-finding
- **Personal Security** - Monitoring your digital footprint

---

**Happy Hunting! Remember: OSINT is only as good as the information available - always think like an investigator!**
