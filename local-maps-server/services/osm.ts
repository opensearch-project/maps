/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { hostUrl } from "../common";

export const osm = {
  tilejson: "2.0.0",
  name: "OSM",
  attribution:
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  minzoom: 0,
  maxzoom: 22,
  bounds: [-180, -85.0511, 180, 85.0511],
  format: "png",
  type: "baselayer",
  tiles: [`${hostUrl}:8080/tiles/data/{z}/{x}/{y}.png`],
  center: [0, 0, 2],
};
