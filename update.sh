#!/bin/bash

cd /Users/alesav/Dev/aider/wisher/wisher-11ty

/Users/alesav/.nvm/versions/node/v20.9.0/bin/node ../playwright/ru.js 100

# Run the updater
/Users/alesav/.nvm/versions/node/v20.9.0/bin/node updater.js

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

exit
