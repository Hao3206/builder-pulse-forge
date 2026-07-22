import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const clientDir = path.join(root, "client");
const outputDir = path.join(root, "public", "assets", "remote");
const remoteImagePattern =
  /https:\/\/(?:api\.builder\.io\/api\/v1\/image\/assets\/TEMP\/[^\s"')]+|images\.(?:unsplash|pexels)\.com\/[^\s"')]+)/g;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(fullPath) : fullPath;
    }),
  );
  return files.flat().filter((file) => /\.(tsx?|css)$/.test(file));
}

function extensionFor(contentType) {
  if (contentType.includes("image/png")) return "png";
  if (contentType.includes("image/webp")) return "webp";
  if (contentType.includes("image/gif")) return "gif";
  if (contentType.includes("image/svg")) return "svg";
  return "jpg";
}

async function download(url) {
  const id = url.includes("/TEMP/")
    ? url.split("/TEMP/")[1].split("?")[0]
    : `unsplash-${createHash("sha256").update(url).digest("hex").slice(0, 16)}`;
  const existing = (await readdir(outputDir)).find((name) =>
    name.startsWith(`${id}.`),
  );
  if (existing) return `/assets/remote/${existing}`;

  const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  if (!response.ok)
    throw new Error(`${response.status} ${response.statusText}: ${url}`);
  const contentType = response.headers.get("content-type") || "image/jpeg";
  if (!contentType.startsWith("image/"))
    throw new Error(`Unexpected ${contentType}: ${url}`);

  const filename = `${id}.${extensionFor(contentType)}`;
  await writeFile(
    path.join(outputDir, filename),
    Buffer.from(await response.arrayBuffer()),
  );
  return `/assets/remote/${filename}`;
}

await mkdir(outputDir, { recursive: true });
const files = await walk(clientDir);
const sourceByFile = new Map();
const urls = new Set();

for (const file of files) {
  const source = await readFile(file, "utf8");
  sourceByFile.set(file, source);
  for (const url of source.match(remoteImagePattern) || []) urls.add(url);
}

const replacements = new Map();
for (const url of [...urls].sort()) {
  try {
    const localPath = await download(url);
    replacements.set(url, localPath);
    console.log(`${url} -> ${localPath}`);
  } catch (error) {
    console.warn(`Skipped ${url}: ${error.message}`);
  }
}

for (const [file, original] of sourceByFile) {
  let updated = original;
  for (const [url, localPath] of replacements)
    updated = updated.replaceAll(url, localPath);
  if (updated !== original) await writeFile(file, updated);
}

console.log(`Localized ${replacements.size} remote images.`);
