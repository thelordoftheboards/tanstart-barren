#!/bin/sh
set -x  # Enable verbose output

current_dir=$(pwd)
echo "Post build actions running from running from: $current_dir"


## Find all files in the specified directory and its subdirectories,
## then use sed to perform the string replacement in place.
## The -i '' is specific to macOS sed for in-place editing without creating a backup.
## find ./.output/server -type f -exec sed -i '' "s/'@modelcontextprotocol\/sdk\/client\/streamableHttp'/'@modelcontextprotocol\/sdk\/client\/streamableHttp.js'/g" {} +
#if [[ "$OSTYPE" == "darwin"* ]]; then
#    find ./.output/server -type f -exec sed -i '' "s/'@modelcontextprotocol\/sdk\/client\/streamableHttp'/'@modelcontextprotocol\/sdk\/client\/streamableHttp.js'/g" {} +
#else
#    find ./.output/server -type f -exec sed -i "s/'@modelcontextprotocol\/sdk\/client\/streamableHttp'/'@modelcontextprotocol\/sdk\/client\/streamableHttp.js'/g" {} +
#fi


mkdir ./.output/drizzle
cp -r ./drizzle/. ./.output/drizzle/


echo "Post build actions complete."
