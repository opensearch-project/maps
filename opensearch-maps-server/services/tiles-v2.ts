/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { hostUrl } from "../common";

export const tileManifest = {
  services: [
    {
      id: "road_map",
      name: {
        en: "Road map",
      },
      attribution: [
        {
          label: {
            en: "Map data © OpenStreetMap contributors",
          },
          url: {
            en: "https://www.openstreetmap.org/copyright",
          },
        },
      ],
      formats: [
        {
          locale: "en",
          format: "raster",
          url: `${hostUrl}:8080/tiles/osm.json`,
        },
      ],
    },
    {
      id: "road_map_desaturated",
      name: {
        en: "Road map - desaturated",
      },
      attribution: [
        {
          label: {
            en: "Map data © OpenStreetMap contributors",
          },
          url: {
            en: "https://www.openstreetmap.org/copyright",
          },
        },
      ],
      formats: [
        {
          locale: "en",
          format: "raster",
          url: `${hostUrl}:8080/tiles/osm.json`,
        },
      ],
    },
    {
      id: "dark_map",
      name: {
        en: "Road map - dark",
      },
      attribution: [
        {
          label: {
            en: "Map data © OpenStreetMap contributors",
          },
          url: {
            en: "https://www.openstreetmap.org/copyright",
          },
        },
      ],
      formats: [
        {
          locale: "en",
          format: "raster",
          url: `${hostUrl}:8080/tiles/osm.json`,
        },
      ],
    },
  ],
};
