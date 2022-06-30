# OpenSearch Local Maps Server

This project helps to create a self-host maps server for OpenSearch Dashboard, for these who are not able to access to OpenSearch default maps service on air-gapped environments.

The server provides maps manifest url(including both maps tiles and vectors), maps tiles url and maps vectors url which are compatible with OpenSearch.

## Build docker image

Install docker: https://docs.docker.com/get-docker/

Build docker image under Dockerfile path
```
docker build -t osm-server .
```

## Set up server
We need prepare tiles set before start the server, there are 2 options:

Option1: Use the tiles set provided by OpenSearch maps service

* Create a docker volume to hold the tiles set:
```
docker volume create tiles-data
```
* Then download tiles set from OpenSearch maps service, we now have 0-8 and 0-10 planet tiles set available.
  * https://staging.tiles.maps.opensearch.org/osm-raster-tile-png-z0-z8.zip
  * https://staging.tiles.maps.opensearch.org/osm-raster-tile-png-z0-z10.zip

```
docker run \
-e DOWNLOAD_TILES=https://staging.tiles.maps.opensearch.org/osm-raster-tile-png-z0-z8.zip \
-v tiles-data:/usr/src/app/dist/public/tiles/data/ \
osm-server \
import
```

Option2: Use the tiles set by yourself, you could generate the raster tiles images set(in x/y/z folder) by our [raster tile generation pipeline](https://github.com/opensearch-project/maps/tree/main/tiles-generation/cdk), and then use the x/y/z tile set absolute path as a volume to start the server.

## Run server
Use created docker volume ``tiles-data``:
```
docker run \
-v tiles-data:/usr/src/app/dist/public/tiles/data/ \
-e HOST_URL='http://localhost' \
-p 8080:8080 \
osm-server \
run
```

Use your own tiles set by:
```
docker run \
-v /absolute/path/to/tiles/:/usr/src/app/public/tiles/data/ \
-p 8080:8080 \
osm-server \
run
```
Then you can check:
* Map manifest: http://localhost:8080/manifest.json
* Map tiles: http://localhost:8080/tiles/data/{z}/{x}/{y}.png
* Map tiles demo: http://localhost:8080

## Use in OpenSearch-Dashboard
* Use the manifest url in Dashboard config yml file by 
```
map.opensearchManifestServiceUrl: "http://localhost:8080/manifest.json"
```

* Use the tiles url on Dashboard WMS options, simply use the tiles url by [OpenSearch WMS document](https://opensearch.org/docs/latest/dashboards/maptiles/)