#!/bin/bash

set -e

usage() {
    echo "usage: <import|run>"
    echo "commands:"
    echo "    import: Import raster tiles set"
    echo "    run: Serve tiles at /tile/data/{z}/{x}/{y}.png, manifest at /manifest.json"
    echo "environment variables:"
    echo "    DOWNLOAD_TILES: the url to download raster image tiles set from OpenSearch maps service"
    echo "    LOCAL_TILES: the path in container to local raster image tiles set for OpenSearch maps service"
    echo "    HOST_URL: the host machine ip address"
}

if [ "${1}" = "run" ]; then
    npm run build
    npm run start
fi

if [ "${1}" = "import" ]; then
    cd public/tiles/data
    if [ -n "${DOWNLOAD_TILES:-}" ]; then
        echo "INFO: Download Tiles images: $DOWNLOAD_TILES"
        curl -SL -o tiles.tar.gz "$DOWNLOAD_TILES"
        tar -xzf tiles.tar.gz --strip-components=1
        rm tiles.tar.gz
    elif [ -n "${LOCAL_TILES:-}" ]; then
        echo "INFO: Local Tiles images: $LOCAL_TILES"
        tar -xzf $LOCAL_TILES --strip-components=1
    fi
    exit 0
fi

echo "invalid command"
usage
exit 1
