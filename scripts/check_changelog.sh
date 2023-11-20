#!/bin/bash
CHANGELOG_PATH=$1

if git diff --name-only origin/main...HEAD | grep -q "$CHANGELOG_PATH"; then
    echo "$CHANGELOG_PATH has been updated."
else
    echo "$CHANGELOG_PATH has NOT been updated."
    exit 1
fi
