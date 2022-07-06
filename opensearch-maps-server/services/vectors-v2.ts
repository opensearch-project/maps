/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { hostUrl } from "../common";

export const vectorsManifest = {
  layers: [
    {
      layer_id: "world_countries",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/world_countries.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "id",
          id: "iso3",
          label: {
            en: "ISO 3166-1 alpha-3 Code",
          },
        },
        {
          type: "name",
          id: "name",
          label: {
            en: "Name",
          },
        },
      ],
      legacy_ids: ["World Countries"],
      layer_name: {
        en: "World Countries",
      },
    },
    {
      layer_id: "argentina_provinces",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/argentina_provinces.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_es",
          label: {
            en: "Name (es)",
          },
        },
      ],
      legacy_ids: ["Argentina Provinces"],
      layer_name: {
        en: "Argentina Provinces",
      },
    },
    {
      layer_id: "australia_states",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/australia_states.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
      ],
      legacy_ids: ["Australia States"],
      layer_name: {
        en: "Australia States",
      },
    },
    {
      layer_id: "austria_states",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/austria_states.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_de",
          label: {
            en: "Name (de)",
          },
        },
      ],
      legacy_ids: ["Austria States"],
      layer_name: {
        en: "Austria States",
      },
    },
    {
      layer_id: "belarus_regions",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/belarus_regions.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_ru",
          label: {
            en: "Name (ru)",
          },
        },
      ],
      legacy_ids: ["Belarus Regions"],
      layer_name: {
        en: "Belarus Regions",
      },
    },
    {
      layer_id: "belgium_provinces",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/belgium_provinces.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_fr",
          label: {
            en: "Name (fr)",
          },
        },
        {
          type: "name",
          id: "label_de",
          label: {
            en: "Name (de)",
          },
        },
        {
          type: "name",
          id: "label_nl",
          label: {
            en: "Name (nl)",
          },
        },
      ],
      legacy_ids: ["Belgium Provinces"],
      layer_name: {
        en: "Belgium Provinces",
      },
    },
    {
      layer_id: "bolivia_departments",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/bolivia_departments.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_es",
          label: {
            en: "Name (es)",
          },
        },
      ],
      legacy_ids: ["Bolivia Departments"],
      layer_name: {
        en: "Bolivia Departments",
      },
    },
    {
      layer_id: "brazil_states",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/brazil_states.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
      ],
      legacy_ids: ["Brazil States"],
      layer_name: {
        en: "Brazil States",
      },
    },
    {
      layer_id: "canada_provinces",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/canada_provinces.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_fr",
          label: {
            en: "Name (fr)",
          },
        },
      ],
      legacy_ids: ["Canada Provinces"],
      layer_name: {
        en: "Canada Provinces",
      },
    },
    {
      layer_id: "chile_regions",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/chile_regions.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_es",
          label: {
            en: "Name (es)",
          },
        },
      ],
      legacy_ids: ["Chile Regions"],
      layer_name: {
        en: "Chile Regions",
      },
    },
    {
      layer_id: "china_provinces",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/china_provinces.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_zh",
          label: {
            en: "Name (zh)",
          },
        },
      ],
      legacy_ids: ["China Provinces"],
      layer_name: {
        en: "China Provinces",
      },
    },
    {
      layer_id: "colombia_departments",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/colombia_departments.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_es",
          label: {
            en: "Name (es)",
          },
        },
      ],
      legacy_ids: ["Colombia Departments"],
      layer_name: {
        en: "Colombia Departments",
      },
    },
    {
      layer_id: "croatia_counties",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/croatia_counties.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
      ],
      legacy_ids: ["Croatia Counties"],
      layer_name: {
        en: "Croatia Counties",
      },
    },
    {
      layer_id: "denmark_regions",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/denmark_regions.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
      ],
      legacy_ids: ["Denmark Regions"],
      layer_name: {
        en: "Denmark Regions",
      },
    },
    {
      layer_id: "ecuador_provinces",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/ecuador_provinces.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_es",
          label: {
            en: "Name (es)",
          },
        },
      ],
      legacy_ids: ["Ecuador Provinces"],
      layer_name: {
        en: "Ecuador Provinces",
      },
    },
    {
      layer_id: "estonia_counties",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/estonia_counties.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_es",
          label: {
            en: "Name (es)",
          },
        },
      ],
      legacy_ids: ["Estonia Counties"],
      layer_name: {
        en: "Estonia Counties",
      },
    },
    {
      layer_id: "finland_regions",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/finland_regions.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_sv",
          label: {
            en: "Name (sv)",
          },
        },
      ],
      legacy_ids: ["Finland Regions"],
      layer_name: {
        en: "Finland Regions",
      },
    },
    {
      layer_id: "france_departments",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/france_departments.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_fr",
          label: {
            en: "Name (fr)",
          },
        },
      ],
      legacy_ids: ["France Departments"],
      layer_name: {
        en: "France Departments",
      },
    },
    {
      layer_id: "germany_states",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/germany_states.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
      ],
      legacy_ids: ["Germany States"],
      layer_name: {
        en: "Germany States",
      },
    },
    {
      layer_id: "guyana_regions",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/guyana_regions.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
      ],
      legacy_ids: ["Guyana Regions"],
      layer_name: {
        en: "Guyana Regions",
      },
    },
    {
      layer_id: "hungary_counties",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/hungary_counties.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_hu",
          label: {
            en: "Name (hu)",
          },
        },
      ],
      legacy_ids: ["Hungary Counties"],
      layer_name: {
        en: "Hungary Counties",
      },
    },
    {
      layer_id: "india_states",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/india_states.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_hi",
          label: {
            en: "Name (hi)",
          },
        },
      ],
      legacy_ids: ["India States"],
      layer_name: {
        en: "India States",
      },
    },
    {
      layer_id: "ireland_counties",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/ireland_counties.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
      ],
      legacy_ids: ["Ireland Counties"],
      layer_name: {
        en: "Ireland Counties",
      },
    },
    {
      layer_id: "italy_provinces",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/italy_provinces.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_it",
          label: {
            en: "Name (it)",
          },
        },
      ],
      legacy_ids: ["Italy Provinces"],
      layer_name: {
        en: "Italy Provinces",
      },
    },
    {
      layer_id: "japan_perfectures",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/japan_perfectures.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_ja",
          label: {
            en: "Name (ja)",
          },
        },
      ],
      legacy_ids: ["Japan Perfectures"],
      layer_name: {
        en: "Japan Perfectures",
      },
    },
    {
      layer_id: "luxembourg_counties",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/luxembourg_counties.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_de",
          label: {
            en: "Name (de)",
          },
        },
        {
          type: "name",
          id: "label_fr",
          label: {
            en: "Name (fr)",
          },
        },
      ],
      legacy_ids: ["Luxembourg Counties"],
      layer_name: {
        en: "Luxembourg Counties",
      },
    },
    {
      layer_id: "netherlands_provinces",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/netherlands_provinces.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_nl",
          label: {
            en: "Name (nl)",
          },
        },
      ],
      legacy_ids: ["Netherlands Provinces"],
      layer_name: {
        en: "Netherlands Provinces",
      },
    },
    {
      layer_id: "norway_counties",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/norway_counties.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
      ],
      legacy_ids: ["Norway Counties"],
      layer_name: {
        en: "Norway Counties",
      },
    },
    {
      layer_id: "paraguay_departments",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/paraguay_departments.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_es",
          label: {
            en: "Name (es)",
          },
        },
      ],
      legacy_ids: ["Paraguay Departments"],
      layer_name: {
        en: "Paraguay Departments",
      },
    },
    {
      layer_id: "peru_regions",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/peru_regions.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_es",
          label: {
            en: "Name (es)",
          },
        },
      ],
      legacy_ids: ["Peru Regions"],
      layer_name: {
        en: "Peru Regions",
      },
    },
    {
      layer_id: "poland_districts",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/poland_districts.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_pl",
          label: {
            en: "Name (pl)",
          },
        },
      ],
      legacy_ids: ["Poland Districts"],
      layer_name: {
        en: "Poland Districts",
      },
    },
    {
      layer_id: "portugal_districts",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/portugal_districts.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_pt",
          label: {
            en: "Name (pt)",
          },
        },
      ],
      legacy_ids: ["Portugal Districts"],
      layer_name: {
        en: "Portugal Districts",
      },
    },
    {
      layer_id: "republic_of_korea",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/republic_of_korea.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_ko",
          label: {
            en: "Name (ko)",
          },
        },
      ],
      legacy_ids: ["Republic Of Korea"],
      layer_name: {
        en: "Republic Of Korea",
      },
    },
    {
      layer_id: "slovakia_regions",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/slovakia_regions.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
      ],
      legacy_ids: ["Slovakia Regions"],
      layer_name: {
        en: "Slovakia Regions",
      },
    },
    {
      layer_id: "slovenia_municipalities",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/slovenia_municipalities.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_es",
          label: {
            en: "Name (es)",
          },
        },
      ],
      legacy_ids: ["Slovenia Municipalities"],
      layer_name: {
        en: "Slovenia Municipalities",
      },
    },
    {
      layer_id: "spain_provinces",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/spain_provinces.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_es",
          label: {
            en: "Name (es)",
          },
        },
      ],
      legacy_ids: ["Spain Provinces"],
      layer_name: {
        en: "Spain Provinces",
      },
    },
    {
      layer_id: "suriname_districts",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/suriname_districts.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_nl",
          label: {
            en: "Name (nl)",
          },
        },
      ],
      legacy_ids: ["Suriname Districts"],
      layer_name: {
        en: "Suriname Districts",
      },
    },
    {
      layer_id: "sweden_counties",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/sweden_counties.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_sv",
          label: {
            en: "Name (sv)",
          },
        },
      ],
      legacy_ids: ["Sweden Counties"],
      layer_name: {
        en: "Sweden Counties",
      },
    },
    {
      layer_id: "switzerland_cantons",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/switzerland_cantons.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_de",
          label: {
            en: "Name (de)",
          },
        },
        {
          type: "name",
          id: "label_fr",
          label: {
            en: "Name (fr)",
          },
        },
        {
          type: "name",
          id: "label_it",
          label: {
            en: "Name (it)",
          },
        },
      ],
      legacy_ids: ["Switzerland Cantons"],
      layer_name: {
        en: "Switzerland Cantons",
      },
    },
    {
      layer_id: "uk_subdivisions",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/uk_subdivisions.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
      ],
      legacy_ids: ["Uk Subdivisions"],
      layer_name: {
        en: "Uk Subdivisions",
      },
    },
    {
      layer_id: "uruguay_departments",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/uruguay_departments.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_es",
          label: {
            en: "Name (es)",
          },
        },
      ],
      legacy_ids: ["Uruguay Departments"],
      layer_name: {
        en: "Uruguay Departments",
      },
    },
    {
      layer_id: "usa_states",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/usa_states.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          id: "fips",
          label: {
            en: "Fips",
          },
        },
      ],
      legacy_ids: ["Usa States"],
      layer_name: {
        en: "Usa States",
      },
    },
    {
      layer_id: "venezuela_states",
      created_at: "2017-04-26T17:12:15.978370",
      attribution: [
        {
          label: {
            en: "Made with NaturalEarth",
          },
          url: {
            en: "http://www.naturalearthdata.com/about/terms-of-use",
          },
        },
      ],
      formats: [
        {
          type: "geojson",
          url: `${hostUrl}:8080/vectors/data/venezuela_states.geo.json`,
          legacy_default: true,
        },
      ],
      fields: [
        {
          type: "id",
          id: "iso_3166_2",
          label: {
            en: "ISO 3166-1 alpha-2 Code",
          },
        },
        {
          type: "name",
          id: "label_en",
          label: {
            en: "Name (en)",
          },
        },
        {
          type: "name",
          id: "label_es",
          label: {
            en: "Name (es)",
          },
        },
      ],
      legacy_ids: ["Venezuela States"],
      layer_name: {
        en: "Venezuela States",
      },
    },
  ],
};
