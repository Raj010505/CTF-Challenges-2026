#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"
gcc -O0 -fno-stack-protector -no-pie -static vuln.c -o vuln
file vuln
echo "Built ./bin/vuln"
