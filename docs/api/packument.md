# 📂 Api `packument`

The `packument` api retrieves the complete package document (packument) for a specific npm package, containing all metadata, version information, and distribution details.

## Syntax

```typescript
packument(pkgName: string): Promise<NpmPackument>
```

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
