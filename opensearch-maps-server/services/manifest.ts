/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { hostUrl } from "../common";

const manifest = {
  enabled: true,
  services: [
    {
      id: "tiles",
      name: "OpenSearch Maps Tile Local Service",
      manifest: `${hostUrl}:8080/tiles/v2.json`,
      type: "tms",
    },
    {
      id: "geo_layers",
      name: "OpenSearch Maps Vector Local Service",
      manifest: `${hostUrl}:8080/vectors/v2.json`,
      type: "file",
    },
  ],
};

export default manifest;
