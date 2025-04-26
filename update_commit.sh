#!/bin/bash

# Get the commit message
COMMIT_HASH="c2851d312ae27d8f77fc7988efa1a475cffc26d6"
COMMIT_MSG=$(git log --format=%B -n 1 $COMMIT_HASH)

# Remove Claude references
COMMIT_MSG=$(echo "$COMMIT_MSG" | grep -v "🤖 Generated with \[Claude Code\]" | grep -v "Co-Authored-By: Claude")

# Use git commit --amend to update the commit
git checkout $COMMIT_HASH
git commit --amend -m "$COMMIT_MSG"