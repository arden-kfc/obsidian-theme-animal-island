/**
 * Writes one version into every file that has to agree on it.
 *
 *   node version-bump.mjs patch|minor|major   # next version, computed from manifest.json
 *   node version-bump.mjs 1.2.0               # an explicit version
 *   npm version patch                          # npm's "version" lifecycle runs this script
 *
 * Obsidian pairs a release with a theme version by comparing the git tag to the
 * "version" field of manifest.json, and uses versions.json to decide whether an
 * update is available. Writing all of them in one place keeps them from drifting.
 */

import { readFileSync, writeFileSync } from "node:fs";

const KINDS = ["patch", "minor", "major"];

const readJson = (file) => JSON.parse(readFileSync(file, "utf8"));

/** Write JSON back using the indentation and trailing newline the file already has. */
function writeJson(file, data) {
  const original = readFileSync(file, "utf8");
  const indent = /^[\t ]+(?=")/m.exec(original)?.[0] ?? "\t";
  const trailingNewline = original.endsWith("\n") ? "\n" : "";
  writeFileSync(file, JSON.stringify(data, null, indent) + trailingNewline);
}

function parse(version) {
  const parts = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(version ?? "").trim());
  if (!parts) {
    throw new Error(`expected a version like 1.2.3, got "${version}"`);
  }
  return parts.slice(1).map(Number);
}

/** Sorts like a version comparison: negative when a is older than b. */
function compare(a, b) {
  const [aMajor, aMinor, aPatch] = parse(a);
  const [bMajor, bMinor, bPatch] = parse(b);
  return aMajor - bMajor || aMinor - bMinor || aPatch - bPatch;
}

function bump(current, kind) {
  const [major, minor, patch] = parse(current);
  if (kind === "major") return `${major + 1}.0.0`;
  if (kind === "minor") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

function run() {
  // npm sets npm_package_version when it calls this through the "version" lifecycle,
  // where the target version is already decided. Otherwise it comes from the argument.
  const requested = String(process.argv[2] ?? process.env.npm_package_version ?? "").trim();
  if (!requested) {
    throw new Error("usage: node version-bump.mjs patch|minor|major|<x.y.z>");
  }

  const currentVersion = readJson("manifest.json").version;
  const targetVersion = KINDS.includes(requested)
    ? bump(currentVersion, requested)
    : requested;

  const delta = compare(targetVersion, currentVersion);
  if (delta < 0) {
    throw new Error(`refusing to downgrade ${currentVersion} to ${targetVersion}`);
  }
  if (delta === 0) {
    console.warn(`note: version is already ${targetVersion}`);
  }

  const manifest = readJson("manifest.json");
  manifest.version = targetVersion;
  writeJson("manifest.json", manifest);

  const versions = readJson("versions.json");
  versions[targetVersion] = manifest.minAppVersion;
  writeJson("versions.json", versions);

  const pkg = readJson("package.json");
  pkg.version = targetVersion;
  writeJson("package.json", pkg);

  console.warn(`${currentVersion} -> ${targetVersion}`);
  // The version alone on stdout, so callers can capture it
  console.log(targetVersion);
}

try {
  run();
} catch (error) {
  console.error(`version-bump: ${error.message}`);
  process.exit(1);
}
