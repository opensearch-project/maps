#!/bin/sh

#  Copyright OpenSearch Contributors
#  SPDX-License-Identifier: Apache-2.0

if [ "$1" == "generate" ]; then
    # Generate mbtiles
    if [ $AREA -eq "planet" ]
      then
        # https://github.com/onthegomap/planetiler/blob/main/PLANET.md
        java -Xmx${RAM} \
              # return unused heap memory to the OS
              -XX:MaxHeapFreeRatio=40 \
              -jar planetiler.jar \
              # Download the latest planet.osm.pbf from s3://osm-pds bucket
              --area=planet --bounds=planet --download \
              # Accelerate the download by fetching the 10 1GB chunks at a time in parallel
              --download-threads=10 --download-chunk-size-mb=1000 \
              # Also download name translations from wikidata
              --fetch-wikidata \
              --mbtiles=output.mbtiles \
              # Store temporary node locations in memory
              --nodemap-type=array --storage=${STORAGE} \
              # compact_db is not compatible with mbutil, set it to false
              --compact_db=false
        else
          java -Xmx${RAM} \
                -jar planetiler.jar \
                --download \
                --area=${AREA} \
                --mbtiles=output.mbtiles \
                --compact_db=false
    fi

    # Extract mbtiles to zxy pbf tiles
    mb-util output.mbtiles tiles --image_format=pbf

    # Upload to S3 Bucket
    currentTime=$(date "+%Y%m%d%H%M%S")
    /s5cmd cp tiles/ s3://${TILE_S3_BUCKET}/${currentTime}/vector/
    exit 0
fi

echo "invalid command"
exit 1


