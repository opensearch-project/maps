#!/bin/sh

set -e

usage() {
    echo "usage: <import|run>"
    echo "commands:"
    echo "    import: Import raster tiles set"
    echo "    run: Serve tiles at /tile/data/{z}/{x}/{y}.png, manifest at /manifest.json"
    echo "environment variables:"
    echo "    DOWNLOAD_TILES: the url to download raster image tiles set from OpenSearch maps service"
    echo "    HOST_URL: the host machine ip address"
}

if [ "${1}" = "run" ]; then
    npm run build
    npm run start
fi

if [ "${1}" = "import" ]; then
    cd public/tiles/data
    # Download planet zoom 0 - 8 as default if no data is provided
    if [ -z "$(ls -A public/tiles/data)" ] && [ -z "${DOWNLOAD_TILES:-}" ]; then
        echo "WARNING: No tile at public/tiles/data, importing planet tiles zoom 0-8 from OpenSearch maps service..."
        DOWNLOAD_TILES="https://staging.tiles.maps.opensearch.org/osm-raster-tile-png-z0-z8.zip"
    fi

    if [ -n "${DOWNLOAD_TILES:-}" ]; then
        echo "INFO: Download Tiles images: $DOWNLOAD_TILES"
        wget "$DOWNLOAD_TILES" -O tiles.zip
        unzip tiles.zip
        rm tiles.zip
    fi
    exit 0
fi

echo "invalid command"
usage
exit 1