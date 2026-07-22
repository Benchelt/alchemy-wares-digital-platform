#!/usr/bin/env bash

set -u

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT" || exit 1

echo
echo "============================================================"
echo " AETHER ENGINE PROJECT STATUS"
echo "============================================================"

echo
echo "===== BRANCH ====="
git branch --show-current

echo
echo "===== WORKING TREE ====="
git status --short

if [ -z "$(git status --porcelain)" ]; then
    echo "Working tree clean"
else
    echo "Working tree contains uncommitted changes"
fi

echo
echo "===== PLUGIN VERSION ====="
grep -nE "Version:|AW_AETHER_VERSION" alchemy-aether-engine.php

echo
echo "===== LATEST RELEASE ====="
git describe --tags --abbrev=0 2>/dev/null || echo "No release tag found"

echo
echo "===== LATEST COMMIT ====="
git log -1 --oneline --decorate

echo
echo "===== RECENT RELEASES ====="
git tag --sort=-version:refname | head -10

echo
echo "===== STATUS DOCUMENT ====="
if [ -f docs/PROJECT-STATUS.md ]; then
    sed -n '/## Current Release/,/---/p' docs/PROJECT-STATUS.md
    sed -n '/## Current Sprint/,/---/p' docs/PROJECT-STATUS.md
    sed -n '/## Recommended Next Milestone/,/---/p' docs/PROJECT-STATUS.md
else
    echo "docs/PROJECT-STATUS.md not found"
fi

echo
echo "============================================================"
echo " END OF STATUS"
echo "============================================================"
echo
