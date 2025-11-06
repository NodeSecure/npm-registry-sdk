# 📂 Api `tarball-download`

The `tarball-download` api downloads the tarball (.tgz file) for a specific version of an npm package as a readable stream.

## Types

### DefaultRegistryApiOptions

```typescript
interface DefaultRegistryApiOptions {
  token?: string; // npm authentication token for private packages
}
```

## Syntax

```typescript
tarballDownload(name: string, version: string, options?: DefaultRegistryApiOptions): NodeJS.ReadableStream
```

## Parameters

- **name** (string): The name of the npm package to download
- **version** (string): The specific version of the package to download
- **options** (DefaultRegistryApiOptions, optional): Additional options including authentication token for private packages

## Returns

Returns a `NodeJS.ReadableStream` that streams the tarball data. The stream can be piped to a file, extracted, or processed in memory.

## Examples

### Download and save tarball to file

```typescript
import { tarballDownload } from "npm-registry-sdk";
import { createWriteStream } from "node:fs";

const stream = tarballDownload("express", "4.18.2");
const writeStream = createWriteStream("express-4.18.2.tgz");

stream.pipe(writeStream);

writeStream.on("finish", () => {
  console.log("Tarball downloaded successfully!");
});

writeStream.on("error", (error) => {
  console.error("Download failed:", error);
});
```

### Extract tarball in memory

```typescript
import { tarballDownload } from "npm-registry-sdk";
import { extract } from "tar-stream";

const stream = tarballDownload("lodash", "4.17.21");
const extractStream = extract();

extractStream.on("entry", (header, entryStream, next) => {
  console.log(`Extracting: ${header.name}`);

  if (header.name === "package/package.json") {
    let packageJson = "";
    entryStream.on("data", (chunk) => {
      packageJson += chunk;
    });
    entryStream.on("end", () => {
      console.log("Package.json:", JSON.parse(packageJson));
      next();
    });
  } else {
    entryStream.resume(); // Skip other files
    next();
  }
});

extractStream.on("finish", () => {
  console.log("Extraction complete!");
});

stream.pipe(extractStream);
```

### Download private package with authentication

```typescript
const stream = tarballDownload("@myorg/private-package", "1.0.0", {
  token: "npm_your_auth_token_here",
});

const writeStream = createWriteStream("private-package-1.0.0.tgz");
stream.pipe(writeStream);
```

### Calculate tarball size

```typescript
const stream = tarballDownload("react", "18.2.0");
let totalSize = 0;

stream.on("data", (chunk) => {
  totalSize += chunk.length;
});

stream.on("end", () => {
  console.log(`Tarball size: ${(totalSize / 1024).toFixed(2)} KB`);
});

stream.on("error", (error) => {
  console.error("Download error:", error);
});
```

### Download with progress tracking

```typescript
import { tarballDownload } from "npm-registry-sdk";
import { Transform } from "node:stream";

const stream = tarballDownload("webpack", "5.88.0");
let downloaded = 0;

const progressTransform = new Transform({
  transform(chunk, encoding, callback) {
    downloaded += chunk.length;
    console.log(`Downloaded: ${(downloaded / 1024).toFixed(2)} KB`);
    callback(null, chunk);
  },
});

const writeStream = createWriteStream("webpack-5.88.0.tgz");

stream.pipe(progressTransform).pipe(writeStream);
```

### Handle download errors

```typescript
const stream = tarballDownload("nonexistent-package", "1.0.0");

stream.on("error", (error) => {
  if (error.statusCode === 404) {
    console.error("Package or version not found");
  } else if (error.statusCode === 403) {
    console.error("Access denied - package may be private");
  } else {
    console.error("Download failed:", error.message);
  }
});

const writeStream = createWriteStream("download.tgz");
stream.pipe(writeStream);
```

### Download latest version dynamically

```typescript
import { packument, tarballDownload } from "npm-registry-sdk";

// First get the latest version
const pkg = await packument("express");
const latestVersion = pkg["dist-tags"].latest;

// Then download the tarball
const stream = tarballDownload("express", latestVersion);
const writeStream = createWriteStream(`express-${latestVersion}.tgz`);

stream.pipe(writeStream);
console.log(`Downloading Express ${latestVersion}...`);
```
