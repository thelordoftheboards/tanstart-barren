#!/bin/sh
set -x  # Enable verbose output

current_dir=$(pwd)
echo "Post build actions running from running from: $current_dir"


mkdir ./.output/drizzle
cp -r ./drizzle/. ./.output/drizzle/


bun ./devtools/update-server-version.ts


echo "Post build actions complete."
