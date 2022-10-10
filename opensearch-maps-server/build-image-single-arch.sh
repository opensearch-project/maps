#!/bin/bash

# Copyright OpenSearch Contributors
# SPDX-License-Identifier: Apache-2.0
#
# The OpenSearch Contributors require contributions made to
# this file be licensed under the Apache-2.0 license or a
# compatible open source license.

# This script is to automate the docker image creation process of OpenSearch and OpenSearch-Dashboards

set -e

function usage() {
    echo ""
    echo "This script is used to build the OpenSearch Docker image with single architecture (x64 or arm64). It prepares the files required by the Dockerfile in a temporary directory, then builds and tags the Docker image."
    echo "--------------------------------------------------------------------------"
    echo "Usage: $0 [args]"
    echo ""
    echo "Required arguments:"
    echo -e "-v VERSION\tSpecify the OpenSearch version number that you are building, e.g. '1.0.0' or '1.0.0-beta1'. This will be used to label the Docker image. If you do not use the '-o' option then this tool will download a public OPENSEARCH release matching this version."
    echo -e "-f DOCKERFILE\tSpecify the dockerfile full path, e.g. dockerfile/opensearch.al2.dockerfile."
    echo -e "-p PRODUCT\tSpecify the product, e.g. opensearch or opensearch-dashboards, make sure this is the name of your config folder and the name of your .tgz defined in dockerfile."
    echo -e "-a ARCHITECTURE\tSpecify one and only one architecture, e.g. x64 or arm64."
    echo ""
    echo "Optional arguments:"
    echo -e "-h\t\tPrint this message."
    echo "--------------------------------------------------------------------------"
}

while getopts ":hv:f:p:a:" arg; do
    case $arg in
        h)
            usage
            exit 1
            ;;
        v)
            VERSION=$OPTARG
            ;;
        f)
            DOCKERFILE=$OPTARG
            ;;
        p)
            PRODUCT=$OPTARG
            ;;
        a)
            ARCHITECTURE=$OPTARG
            ;;
        :)
            echo "-${OPTARG} requires an argument"
            usage
            exit 1
            ;;
        ?)
            echo "Invalid option: -${OPTARG}"
            exit 1
            ;;
    esac
done

# Validate the required parameters to present
if [ -z "$VERSION" ] || [ -z "$DOCKERFILE" ] || [ -z "$PRODUCT" ] || [ -z "$ARCHITECTURE" ]; then
  echo "You must specify '-v VERSION', '-f DOCKERFILE', '-p PRODUCT', '-a ARCHITECTURE'"
  usage
  exit 1
else
  echo $VERSION $DOCKERFILE $PRODUCT $ARCHITECTURE
fi

if [ "$PRODUCT" != "opensearch-maps-server" ]
then
    echo "Enter either 'opensearch-maps-server' as product name for -p parameter"
    exit 1
else
    PRODUCT_ALT=`echo $PRODUCT | sed 's@-@_@g'`
    echo $PRODUCT $PRODUCT_ALT.yml
fi

if [ "$ARCHITECTURE" != "x64" ] && [ "$ARCHITECTURE" != "arm64" ]
then
    echo "We only support 'x64' and 'arm64' as architecture name for -a parameter"
    exit 1
fi

if [ -z "$NOTES" ]
then
    NOTES="None"
fi



# Docker build
docker build --build-arg VERSION=$VERSION --build-arg BUILD_DATE=`date -u +%Y-%m-%dT%H:%M:%SZ` --build-arg PRODUCT=$PRODUCT -f $DOCKERFILE ./ -t opensearchstaging/$PRODUCT:$VERSION
docker tag opensearchstaging/$PRODUCT:$VERSION opensearchstaging/$PRODUCT:latest
docker push opensearchstaging/$PRODUCT:$VERSION
docker push opensearchstaging/$PRODUCT:latest
