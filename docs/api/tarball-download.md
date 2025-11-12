# 📂 Api `tarball-download`

The `tarball-download` api downloads the tarball (.tgz file) for a specific version of an npm package as a readable stream.

## Syntax

```typescript
tarballDownload(name: string, version: string, options?: DefaultRegistryApiOptions): NodeJS.ReadableStream
```

## Types

### DefaultRegistryApiOptions

```typescript
interface DefaultRegistryApiOptions {
  token?: string; // npm authentication token for private packages
}
```
