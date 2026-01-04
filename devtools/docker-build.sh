#!/bin/bash

echo "Docker Build App"

# Get the settings
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
source ${SCRIPT_DIR}/../devconfig/docker-settings.sh

# Extract the version number using jq
PACKAGE_VERSION=$(jq -r .version ${SCRIPT_DIR}/../package.json)

# Extract the version number of the build in output using jq
PACKAGE_VERSION_OUTPUT=$(jq -r .version ${SCRIPT_DIR}/../.output/server/package.json)

# Display the action taken
echo Package version in source: "$PACKAGE_VERSION"
echo Package version in output: "$PACKAGE_VERSION_OUTPUT"

if [ "$PACKAGE_VERSION" != "$PACKAGE_VERSION_OUTPUT" ]; then
    # Commands to execute if they are not the same
    echo "Version mismatch, running make ..."
    # Example command:
    (cd ${SCRIPT_DIR}/.. && bun run make)
else
    # Commands to execute if they are the same (optional 'else' block)
    echo "Versions match, proceeding to build."
fi

echo Building: "$IMAGE_NAME:$PACKAGE_VERSION"

# Build the image, passing the version as a tag and a build-arg
#docker build --build-arg APP_VERSION="$PACKAGE_VERSION" -t "$IMAGE_NAME:$PACKAGE_VERSION" .
