#!/usr/bin/env bash
set -euo pipefail
test -s dist/index.html
bun run check
