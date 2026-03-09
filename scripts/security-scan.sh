#!/bin/bash
# SAST scanner - Automated security check on changed files
# Equivalent to Snyk Code (paid) but pattern-based and free
# Runs on git diff to only scan changed code

set -euo pipefail

RED='\033[0;31m'
YELLOW='\033[0;33m'
GREEN='\033[0;32m'
NC='\033[0m'

ISSUES=0
WARNINGS=0

# Get changed .ts/.tsx/.js/.jsx files compared to remote
CHANGED_FILES=$(git diff --name-only origin/main HEAD -- '*.ts' '*.tsx' '*.js' '*.jsx' 2>/dev/null || git diff --name-only HEAD~1 HEAD -- '*.ts' '*.tsx' '*.js' '*.jsx' 2>/dev/null || echo "")

if [ -z "$CHANGED_FILES" ]; then
  echo -e "${GREEN}No source files changed, skipping SAST scan.${NC}"
  exit 0
fi

echo "Scanning $(echo "$CHANGED_FILES" | wc -l) changed file(s)..."

scan_file() {
  local file="$1"
  [ -f "$file" ] || return 0

  local content
  content=$(cat "$file")

  # CRITICAL: SQL Injection
  if echo "$content" | grep -nP '(query|execute|sql)\s*\(.*\$\{|`SELECT.*\$\{|`INSERT.*\$\{|`UPDATE.*\$\{|`DELETE.*\$\{' 2>/dev/null; then
    echo -e "${RED}[CRITICAL] SQL Injection risk in $file${NC}"
    ((ISSUES++))
  fi

  # CRITICAL: eval / Function constructor
  if echo "$content" | grep -nP '\beval\s*\(|\bnew\s+Function\s*\(' 2>/dev/null; then
    echo -e "${RED}[CRITICAL] eval() or new Function() in $file${NC}"
    ((ISSUES++))
  fi

  # HIGH: XSS - dangerouslySetInnerHTML
  if echo "$content" | grep -nP 'dangerouslySetInnerHTML' 2>/dev/null; then
    echo -e "${YELLOW}[HIGH] dangerouslySetInnerHTML in $file — verify input is sanitized${NC}"
    ((WARNINGS++))
  fi

  # HIGH: Hardcoded secrets
  if echo "$content" | grep -nPi '(api_key|apikey|secret|password|token|private_key)\s*[:=]\s*["\x27][A-Za-z0-9+/=_-]{8,}' 2>/dev/null; then
    echo -e "${RED}[CRITICAL] Possible hardcoded secret in $file${NC}"
    ((ISSUES++))
  fi

  # HIGH: Unvalidated redirect
  if echo "$content" | grep -nP 'redirect\(.*req\.(query|params|body)' 2>/dev/null; then
    echo -e "${YELLOW}[HIGH] Open redirect risk in $file${NC}"
    ((WARNINGS++))
  fi

  # HIGH: Prototype pollution
  if echo "$content" | grep -nP 'Object\.assign\(.*req\.' 2>/dev/null; then
    echo -e "${YELLOW}[HIGH] Prototype pollution risk in $file${NC}"
    ((WARNINGS++))
  fi

  # MEDIUM: console.log in production code (not in test files)
  if [[ ! "$file" =~ (test|spec|__test__) ]] && echo "$content" | grep -nP 'console\.(log|debug)\(' 2>/dev/null | head -3; then
    echo -e "${YELLOW}[MEDIUM] console.log in production code: $file${NC}"
    ((WARNINGS++))
  fi

  # HIGH: innerHTML assignment
  if echo "$content" | grep -nP '\.innerHTML\s*=' 2>/dev/null; then
    echo -e "${YELLOW}[HIGH] Direct innerHTML assignment in $file — XSS risk${NC}"
    ((WARNINGS++))
  fi

  # HIGH: Insecure crypto
  if echo "$content" | grep -nP "createHash\(['\"]md5['\"]|createHash\(['\"]sha1['\"]" 2>/dev/null; then
    echo -e "${YELLOW}[HIGH] Weak hash algorithm (md5/sha1) in $file${NC}"
    ((WARNINGS++))
  fi

  # MEDIUM: HTTP instead of HTTPS
  if echo "$content" | grep -nP "http://(?!localhost|127\.0\.0\.1|0\.0\.0\.0)" 2>/dev/null | head -3; then
    echo -e "${YELLOW}[MEDIUM] Insecure HTTP URL in $file${NC}"
    ((WARNINGS++))
  fi
}

for file in $CHANGED_FILES; do
  scan_file "$file"
done

echo ""
if [ "$ISSUES" -gt 0 ]; then
  echo -e "${RED}SAST scan: $ISSUES critical issue(s), $WARNINGS warning(s)${NC}"
  echo -e "${RED}Fix critical issues before pushing.${NC}"
  exit 1
elif [ "$WARNINGS" -gt 0 ]; then
  echo -e "${YELLOW}SAST scan: $WARNINGS warning(s) (non-blocking)${NC}"
else
  echo -e "${GREEN}SAST scan: No issues found.${NC}"
fi
