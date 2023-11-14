#!/bin/bash
PACKAGE_JSON_PATH=$1
git fetch origin main:main
VERSION_CURRENT=$(jq -r '.version' $PACKAGE_JSON_PATH)
VERSION_MAIN=$(git show main:$PACKAGE_JSON_PATH | jq -r '.version')

if [ "$(printf '%s\n' "$VERSION_MAIN" "$VERSION_CURRENT" | sort -V | head -n1)" != "$VERSION_MAIN" ]; then
    echo "Version increased to $VERSION_CURRENT"
else
    echo "Version has not increased"
    exit 1
fi
