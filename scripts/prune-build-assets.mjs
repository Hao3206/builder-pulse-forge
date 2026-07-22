import { rm } from "node:fs/promises";
import path from "node:path";

const distRoot = path.resolve("dist/spa");
const unusedBuildAssets = [
  "images/ZDMAP.png",
  "uploads/training-presentation-1.png",
];

await Promise.all(
  unusedBuildAssets.map((asset) =>
    rm(path.join(distRoot, asset), { force: true }),
  ),
);
