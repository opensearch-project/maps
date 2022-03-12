#!/bin/bash

set -euo pipefail

function createPostgresConfig() {
  cp /etc/postgresql/12/main/postgresql.custom.conf.tmpl /etc/postgresql/12/main/conf.d/postgresql.custom.conf
  sudo -u postgres echo "autovacuum = $AUTOVACUUM" >> /etc/postgresql/12/main/conf.d/postgresql.custom.conf
  cat /etc/postgresql/12/main/conf.d/postgresql.custom.conf
}

function setPostgresPassword() {
    sudo -u postgres psql -c "ALTER USER renderer PASSWORD '${PGPASSWORD:-renderer}'"
}

if [ "$#" -ne 1 ]; then
    echo "usage: <import|run>"
    echo "commands:"
    echo "    import: Set up the database and import /data.osm.pbf"
    echo "    run: Runs Apache and renderd to serve tiles at /tile/{z}/{x}/{y}.png"
    echo "environment variables:"
    echo "    THREADS: defines number of threads used for importing / tile rendering"
    echo "    UPDATES: consecutive updates (enabled/disabled)"
    exit 1
fi

set -x

function importmap() {
    # Ensure that database directory is in right state
    chown postgres:postgres -R /var/lib/postgresql
    if [ ! -f /var/lib/postgresql/12/main/PG_VERSION ]; then
        sudo -u postgres /usr/lib/postgresql/12/bin/pg_ctl -D /var/lib/postgresql/12/main/ initdb -o "--locale C.UTF-8"
    fi

    # Initialize PostgreSQL
    createPostgresConfig
    service postgresql start
    sudo -u postgres createuser renderer
    sudo -u postgres createdb -E UTF8 -O renderer gis
    sudo -u postgres psql -d gis -c "CREATE EXTENSION postgis;"
    sudo -u postgres psql -d gis -c "CREATE EXTENSION hstore;"
    sudo -u postgres psql -d gis -c "ALTER TABLE geometry_columns OWNER TO renderer;"
    sudo -u postgres psql -d gis -c "ALTER TABLE spatial_ref_sys OWNER TO renderer;"
    setPostgresPassword

    #Download OSM planet PBF from AWS S3 public bucket
    if [ "${DOWNLOAD_PLANET:-}" == "enabled" ] || [ "${DOWNLOAD_PLANET:-}" == "1" ]; then
        latestPlanetPBFFilePath=$(aws s3 ls s3://osm-pds/ --recursive --no-sign-request | sort | awk '{print $4}' | grep 'planet-' | grep '.*\.pbf' | grep -v '.md5' | grep -v '.torrent' | tail -1)
        aws s3 cp s3://osm-pds/${latestPlanetPBFFilePath} . --no-sign-request
        latestPlanetPBFFileName=$(basename ${latestPlanetPBFFilePath})
        mv ./${latestPlanetPBFFileName} /data.osm.pbf
    fi

    #Download extacts from OpenStreetMap from https://download.geofabrik.de/
    if [ -n "${DOWNLOAD_PBF:-}" ]; then
        echo "INFO: Download PBF file: $DOWNLOAD_PBF"
        wget ${WGET_ARGS:-} "$DOWNLOAD_PBF" -O /data.osm.pbf
    fi

    if [ -n "${DOWNLOAD_POLY:-}" ]; then
        echo "INFO: Download PBF-POLY file: $DOWNLOAD_POLY"
        wget ${WGET_ARGS:-} "$DOWNLOAD_POLY" -O /data.poly
    fi

    # copy polygon file if available
    if [ -f /data.poly ]; then
        sudo -u renderer cp /data.poly /var/lib/mod_tile/data.poly
    fi

    # Import data
    sudo -u renderer osm2pgsql -d gis --create --slim -G --hstore --tag-transform-script /home/renderer/src/openstreetmap-carto/openstreetmap-carto.lua --number-processes ${THREADS:-4} -S /home/renderer/src/openstreetmap-carto/openstreetmap-carto.style /data.osm.pbf ${OSM2PGSQL_EXTRA_ARGS:-}

    # Create indexes
    sudo -u postgres psql -d gis -f /home/renderer/src/openstreetmap-carto/indexes.sql

    #Import external data
    sudo chown -R renderer: /home/renderer/src
    RETRY_NUM=5
    RETRY_EVERY=10
    NUM=$RETRY_NUM
    until  sudo -E -u renderer python3 /home/renderer/src/openstreetmap-carto/scripts/get-external-data.py -c /home/renderer/src/openstreetmap-carto/external-data.yml -D /home/renderer/src/openstreetmap-carto/data
    do
    1>&2 echo failure import external data from openstreetmap-carto/scripts/get-external-data.py... retrying $NUM more times
    sleep $RETRY_EVERY
    ((NUM--))
    if [ $NUM -eq 0 ]
    then
        1>&2 echo command was not successful after $RETRY_NUM tries
        exit 1
    fi
    done

    service postgresql stop
}

function servemap() {
    # Clean /tmp
    rm -rf /tmp/*

    # Fix postgres data privileges
    chown postgres:postgres /var/lib/postgresql -R

    # Privileges for writing tiles image
    chmod 777 /var/lib/mod_tile -R

    # Initialize PostgreSQL and Apache
    createPostgresConfig
    service postgresql start
    service apache2 restart
    setPostgresPassword

    # Configure renderd threads
    sed -i -E "s/num_threads=[0-9]+/num_threads=${THREADS:-4}/g" /usr/local/etc/renderd.conf

    # Generate tile scripts
    sudo -E -u postgres /var/lib/postgresql/src/generate_tiles.py

    # Upload to S3 Bucket
    currentTime=$(date "+%Y%m%d%H%M%S")
    aws s3 cp /var/lib/mod_tile s3://${TILE_S3_BUCKET}/${currentTime}/tiles --recursive

    service postgresql stop
}

if [ "$1" = "import" ]; then
    importmap
    exit 0
fi

if [ "$1" = "serve" ]; then
    servemap
    exit 0
fi

if [ "$1" = "generatetiles" ]; then
    importmap
    sleep 30s
    servemap
    exit 0
fi

echo "invalid command"
exit 1