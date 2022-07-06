/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import cors from "cors";
import manifest from "./services/manifest";
import { tileManifest } from "./services/tiles-v2";
import { vectorsManifest } from "./services/vectors-v2";
import { osm } from "./services/osm";
import path from "path";

const app = express();
const port = 8080;

app.use(cors());

app.use("/vectors/data", express.static("public/vectors/data"));
app.use("/tiles/data", express.static("public/tiles/data"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/demo.html"));
});
app.get("/manifest.json", (req, res) => res.json(manifest));
app.get("/tiles/v2.json", (req, res) => res.json(tileManifest));
app.get("/tiles/osm.json", (req, res) => res.json(osm));
app.get("/vectors/v2.json", (req, res) => res.json(vectorsManifest));

app.listen(port, () => {
  console.log("Maps server start running");
});
