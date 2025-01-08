#!/bin/bash

cd /Users/alesav/Dev/aider/wisher/wisher-11ty

/Users/alesav/.nvm/versions/node/v20.9.0/bin/node --expose-gc ../playwright/ru.js 2

# Run the updater
/Users/alesav/.nvm/versions/node/v20.9.0/bin/node updater.js

# Get the current date in the desired format
current_date=$(date +"%Y-%m-%d %H:%M:%S")

# Create an automatic commit message
commit_message="Auto commit on $current_date"

# Add all changes to staging
/opt/homebrew/bin/git add .

# Commit changes with the automatic message
/opt/homebrew/bin/git commit -m "$commit_message"

# Push changes to the current branch
/opt/homebrew/bin/git push origin main

# Display success message
echo "Changes have been committed and pushed successfully with message: '$commit_message'."

exit
