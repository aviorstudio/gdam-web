#!/usr/bin/env bash
set -euo pipefail
python3 scripts/check_install_copy.py dist
test -s dist/index.html
bun run check
