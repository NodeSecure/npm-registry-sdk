# 📂 Api `packument`

The `packument` api retrieves the complete package document (packument) for a specific npm package, containing all metadata, version information, and distribution details.

## Types

### NpmPackument

```typescript
interface NpmPackument {
  _id: string; // Package identifier
  _rev?: string; // Document revision
  name: string; // Package name
  description?: string; // Package description
  "dist-tags": Record<string, string>; // Distribution tags (latest, beta, etc.)
  versions: Record<string, NpmPackageVersion>; // All package versions
  maintainers?: NpmMaintainer[]; // Package maintainers
  time: Record<string, string>; // Publication timestamps
  author?: NpmAuthor; // Package author
  repository?: NpmRepository; // Repository information
  readme?: string; // README content
  readmeFilename?: string; // README filename
  homepage?: string; // Package homepage
  keywords?: string[]; // Package keywords
  contributors?: NpmAuthor[]; // Package contributors
  bugs?: NpmBugs; // Bug reporting information
  license?: string; // Package license
  users?: Record<string, boolean>; // Users who starred the package
}
```

### NpmPackageVersion

```typescript
interface NpmPackageVersion {
  name: string; // Package name
  version: string; // Version number
  description?: string; // Version description
  main?: string; // Main entry point
  scripts?: Record<string, string>; // npm scripts
  dependencies?: Record<string, string>; // Runtime dependencies
  devDependencies?: Record<string, string>; // Development dependencies
  peerDependencies?: Record<string, string>; // Peer dependencies
  optionalDependencies?: Record<string, string>; // Optional dependencies
  bundledDependencies?: string[]; // Bundled dependencies
  keywords?: string[]; // Package keywords
  author?: NpmAuthor; // Version author
  license?: string; // Version license
  repository?: NpmRepository; // Repository information
  bugs?: NpmBugs; // Bug reporting information
  homepage?: string; // Package homepage
  dist: NpmDist; // Distribution information
  _id: string; // Version identifier
  _npmVersion?: string; // npm version used to publish
  _nodeVersion?: string; // Node.js version used to publish
  _npmUser?: NpmAuthor; // npm user who published
  maintainers?: NpmMaintainer[]; // Version maintainers
}
```

### Supporting Types

```typescript
interface NpmAuthor {
  name?: string;
  email?: string;
  url?: string;
}

interface NpmMaintainer {
  name: string;
  email: string;
}

interface NpmRepository {
  type: string;
  url: string;
  directory?: string;
}

interface NpmBugs {
  url?: string;
  email?: string;
}

interface NpmDist {
  integrity?: string; // Subresource integrity hash
  shasum: string; // SHA1 hash
  tarball: string; // Download URL
  fileCount?: number; // Number of files in package
  unpackedSize?: number; // Unpacked size in bytes
  signatures?: NpmSignature[]; // Package signatures
}

interface NpmSignature {
  keyid: string;
  sig: string;
}
```

## Syntax

```typescript
packument(pkgName: string): Promise<NpmPackument>
```

## Parameters

- **pkgName** (string): The name of the npm package to retrieve the packument for. Must be a non-empty string.

## Returns

Returns a `Promise<NpmPackument>` containing the complete package document with all versions, metadata, and distribution information.

## Errors

- **TypeError**: Thrown when `pkgName` is not a non-empty string.

## Examples

### Get complete package information

```typescript
import { packument } from "npm-registry-sdk";

const pkg = await packument("express");
console.log(`Package: ${pkg.name}`);
console.log(`Description: ${pkg.description}`);
console.log(`Latest version: ${pkg["dist-tags"].latest}`);
console.log(`Total versions: ${Object.keys(pkg.versions).length}`);
```

### Get latest version details

```typescript
const pkg = await packument("lodash");
const latestVersion = pkg["dist-tags"].latest;
const versionInfo = pkg.versions[latestVersion];

console.log(`Latest version: ${latestVersion}`);
console.log(`Main entry: ${versionInfo.main}`);
console.log(`License: ${versionInfo.license}`);
console.log(`Dependencies: ${Object.keys(versionInfo.dependencies || {}).length}`);
```

### Analyze package history

```typescript
const pkg = await packument("react");

// Get all versions sorted by publication date
const versionHistory = Object.entries(pkg.time)
  .filter(([version]) => version !== "created" && version !== "modified")
  .sort(([, a], [, b]) => new Date(a).getTime() - new Date(b).getTime());

console.log(`First published: ${versionHistory[0][1]}`);
console.log(`Latest update: ${pkg.time.modified}`);
console.log(`Version count: ${versionHistory.length}`);
```

### Check package maintainers

```typescript
const pkg = await packument("typescript");

if (pkg.maintainers) {
  console.log("Package maintainers:");
  pkg.maintainers.forEach((maintainer) => {
    console.log(`- ${maintainer.name} (${maintainer.email})`);
  });
}
```

### Analyze dependencies across versions

```typescript
const pkg = await packument("webpack");

const dependencyCounts = Object.entries(pkg.versions).map(([version, info]) => ({
  version,
  dependencies: Object.keys(info.dependencies || {}).length,
  devDependencies: Object.keys(info.devDependencies || {}).length,
  publishedAt: pkg.time[version],
}));

// Sort by publication date
dependencyCounts.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());

console.log("Dependency evolution:");
dependencyCounts.slice(-5).forEach(({ version, dependencies, devDependencies }) => {
  console.log(`${version}: ${dependencies} deps, ${devDependencies} devDeps`);
});
```

### Get download information

```typescript
const pkg = await packument("axios");
const latestVersion = pkg["dist-tags"].latest;
const dist = pkg.versions[latestVersion].dist;

console.log(`Latest tarball: ${dist.tarball}`);
console.log(`Package size: ${(dist.unpackedSize || 0 / 1024).toFixed(2)} KB`);
console.log(`File count: ${dist.fileCount || "unknown"}`);
console.log(`Integrity: ${dist.integrity || dist.shasum}`);
```
