# 📂 Api `packument`

The `packument` api retrieves the complete package document (packument) for a specific npm package, containing all metadata, version information, and distribution details.

## Syntax

```typescript
packument(
  name:string,
  options?:
  PackumentRegistryApiOptions
):Promise<Packument>

packumentVersion(
  name: string,
  version: string,
  options?: PackumentRegistryApiOptions
): Promise<PackumentVersion>
```

## Types

`Packument` and `PackumentVersion`

know more [`nodesecure/npm-types`](https://github.com/NodeSecure/scanner/tree/master/workspaces/npm-types)
