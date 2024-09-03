#!/bin/bash

node ../playwright/ru.js 10

# Run the updater
node updater.js

# Get the current date in the desired format
current_date=$(date +"%Y-%m-%d %H:%M:%S")

# Create an automatic commit message
commit_message="Auto commit on $current_date"

# Add all changes to staging
git add .

# Commit changes with the automatic message
git commit -m "$commit_message"

# Push changes to the current branch
git push origin main

# Display success message
echo "Changes have been committed and pushed successfully with message: '$commit_message'."

# Run wishes creator
