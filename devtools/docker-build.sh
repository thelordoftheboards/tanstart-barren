#!/bin/bash

# Get the settings
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
source ${SCRIPT_DIR}/../devconfig/docker-settings.sh

echo "Docker Build $IMAGE_NAME"

# Extract the version number using jq
PACKAGE_VERSION=$(jq -r .version ${SCRIPT_DIR}/../package.json)

# Extract the version number of the build in output using jq
PACKAGE_VERSION_OUTPUT=$(jq -r .version ${SCRIPT_DIR}/../.output/server/package.json)

# Display the versions we got
echo Package version in source: "${PACKAGE_VERSION}"
echo Package version in output: "${PACKAGE_VERSION_OUTPUT}"

# Run make if the versions do not match
if [ "${PACKAGE_VERSION}" != "${PACKAGE_VERSION_OUTPUT}" ]; then
    echo "Version mismatch, running make ..."
    (cd ${SCRIPT_DIR}/.. && bun run make)
    echo "Make complete."
else
    # Commands to execute if they are the same (optional 'else' block)
    echo "Versions match, proceeding to build container."
fi

echo Building: "${IMAGE_NAME}:${PACKAGE_VERSION}"

# Build the image, passing the version as a tag and a build-arg
echo docker build --build-arg APP_VERSION="${PACKAGE_VERSION}" -t "${IMAGE_NAME}:${PACKAGE_VERSION}" -t "${IMAGE_NAME}:latest" -f "${SCRIPT_DIR}/../docker/dockerfile" .
docker build --build-arg APP_VERSION="${PACKAGE_VERSION}" -t "${IMAGE_NAME}:${PACKAGE_VERSION}" -t "${IMAGE_NAME}:latest" -f "${SCRIPT_DIR}/../docker/dockerfile" .
