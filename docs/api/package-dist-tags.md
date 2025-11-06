# 📂 Api `package-dist-tags`

The `package-dist-tags` api retrieves the distribution tags for a specific npm package, showing which versions are tagged with labels like "latest", "beta", "next", etc.

## Types

### DistTags

```typescript
type DistTags = Record<string, string>;
```

A record mapping distribution tag names to version numbers. Common tags include:

- **latest**: The most recent stable version
- **beta**: Beta release version
- **next**: Next release candidate
- **alpha**: Alpha release version
- **canary**: Canary/nightly build version

### DefaultRegistryApiOptions

```typescript
interface DefaultRegistryApiOptions {
  token?: string; // npm authentication token for private packages
}
```

## Syntax

```typescript
packageDistTags(pkgName: string, options?: DefaultRegistryApiOptions): Promise<DistTags>
```

## Parameters

- **pkgName** (string): The name of the npm package to retrieve distribution tags for. Must be a non-empty string.
- **options** (DefaultRegistryApiOptions, optional): Additional options including authentication token for private packages

## Returns

Returns a `Promise<DistTags>` containing a mapping of distribution tag names to their corresponding version numbers.

## Errors

- **TypeError**: Thrown when `pkgName` is not a non-empty string.

## Examples

### Get all distribution tags

```typescript
import { packageDistTags } from "npm-registry-sdk";

const tags = await packageDistTags("react");
console.log("React distribution tags:");

Object.entries(tags).forEach(([tag, version]) => {
  console.log(`${tag}: ${version}`);
});

// Output might be:
// latest: 18.2.0
// next: 18.3.0-next-1234567890-20231201
// beta: 18.3.0-beta-1234567890-20231201
```

### Get latest version

```typescript
const tags = await packageDistTags("express");
const latestVersion = tags.latest;

console.log(`Latest Express version: ${latestVersion}`);
```

### Check for pre-release versions

```typescript
const tags = await packageDistTags("typescript");

console.log(`Latest stable: ${tags.latest}`);

if (tags.beta) {
  console.log(`Beta version available: ${tags.beta}`);
}

if (tags.next) {
  console.log(`Next version available: ${tags.next}`);
}
```

### Compare versions across tags

```typescript
const tags = await packageDistTags("vue");

console.log("Vue.js versions by tag:");
if (tags.latest) console.log(`Stable: ${tags.latest}`);
if (tags.next) console.log(`Next: ${tags.next}`);
if (tags.beta) console.log(`Beta: ${tags.beta}`);
if (tags.alpha) console.log(`Alpha: ${tags.alpha}`);

// Check if there are pre-release versions available
const preReleaseTags = Object.keys(tags).filter((tag) => tag !== "latest");
if (preReleaseTags.length > 0) {
  console.log(`Pre-release tags available: ${preReleaseTags.join(", ")}`);
}
```

### Get tags for private package

```typescript
const tags = await packageDistTags("@myorg/private-package", {
  token: "npm_your_auth_token_here",
});

console.log("Private package tags:", tags);
```

### Handle packages without pre-release tags

```typescript
const tags = await packageDistTags("lodash");

if (Object.keys(tags).length === 1 && tags.latest) {
  console.log(`${packageName} only has a latest tag: ${tags.latest}`);
} else {
  console.log(`${packageName} has multiple tags:`, Object.keys(tags));
}
```

### Error handling

```typescript
try {
  const tags = await packageDistTags(""); // Invalid empty string
} catch (error) {
  console.error(error.message); // "Argument `pkgName` must be a non empty string"
}

try {
  const tags = await packageDistTags("nonexistent-package-12345");
} catch (error) {
  if (error.statusCode === 404) {
    console.error("Package not found");
  } else {
    console.error("Failed to fetch tags:", error.message);
  }
}
```

### Find packages with specific tag patterns

```typescript
const packages = ["react", "vue", "angular", "svelte"];

for (const pkg of packages) {
  try {
    const tags = await packageDistTags(pkg);
    const hasNext = "next" in tags;
    const hasBeta = "beta" in tags;

    console.log(`${pkg}: latest=${tags.latest}, has-next=${hasNext}, has-beta=${hasBeta}`);
  } catch (error) {
    console.error(`Failed to get tags for ${pkg}:`, error.message);
  }
}
```
