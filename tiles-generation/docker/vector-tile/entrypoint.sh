#!/bin/sh

#  Copyright OpenSearch Contributors
#  SPDX-License-Identifier: Apache-2.0

set -e

usage() {
    echo ""
    echo "This script is used to build map vector tiles to pbf files and upload to s3 bucket."
    echo "For planet setting, reference to https://github.com/onthegomap/planetiler/blob/main/PLANET.md"
    echo "--------------------------------------------------------------------------"
    echo ""
    echo "Docker container environment variables:"
    echo -e "AREA                  \tSpecify the area that we want to generate, for planet, it's 'planet', other areas name reference to https://download.geofabrik.de/"
    echo -e "TILE_S3_BUCKET        \tSpecify the S3 bucket to store the generated vector pbf tiles"
    echo -e "AWS_ACCESS_KEY_ID     \tSpecify the AWS access key id used used for s3 copy, not required if have access role instead"
    echo -e "AWS_SECRET_ACCESS_KEY \tSpecify the AWS AWS secret access key used for s3 copy, not required if have access role instead"
    echo -e "JAVA_TOOL_OPTIONS     \tSpecify the JVM config, for example:'-Xmx1g'"
    echo -e "STORAGE               \tSpecify node location cache in memory by 'ram' or in a temporary memory-mapped file by 'mmap', Needed for planet tile generation"
    echo ""
    echo "--------------------------------------------------------------------------"
}

# Validate the required parameters to present
validateParameter() {
    if [ -z "$AREA" ] || [ -z "$TILE_S3_BUCKET" ]; then
        echo "You must specify '-e AREA', '-e TILE_S3_BUCKET' in container environment variables"
        usage
        exit 1
    fi
}

if [ "$1" == "generate" ]
then
    validateParameter

    if [ "$AREA" == "planet" ]
    then
        java "${JAVA_TOOL_OPTIONS}" \
            -jar planetiler.jar \
            # Download the latest planet.osm.pbf from s3://osm-pds bucket
            --area=planet --bounds=planet --download \
            # Accelerate the download by fetching the 10 1GB chunks at a time in parallel
            --download-threads=10 --download-chunk-size-mb=1000 \
            # Download name translations from wikidata
            --fetch-wikidata \
            --mbtiles="${AREA}".mbtiles \
            # Store temporary node locations in memory
            --nodemap-type=array --storage="${STORAGE}" \
            # compact_db is not compatible with mbutil, set it to false
            --compact_db=false
    else
        java "${JAVA_TOOL_OPTIONS}" \
            -jar planetiler.jar \
            --download \
            --area="${AREA}" \
            --mbtiles="${AREA}".mbtiles \
            --compact_db=false
    fi

    # Extract mbtiles to zxy pbf tiles
    mb-util "${AREA}".mbtiles tiles --image_format=pbf

    # Upload to S3 Bucket
    currentTime=$(date "+%Y%m%d%H%M%S")
    /s5cmd cp tiles/ s3://"${TILE_S3_BUCKET}"/"${AREA}"-VT-"${currentTime}"/vector/
    echo "tiles copy finished"
    exit 0
fi

if [ "$1" == "help" ]; then
    usage
    exit 0
fi

echo "invalid command"
exit 1
