# 📂 Api `packument`

The `packument` api retrieves the complete package document (packument) for a specific npm package, containing all metadata, version information, and distribution details.

## Syntax

```typescript
packument(pkgName: string): Promise<NpmPackument>
```

## Types

`Packument` and `PackumentVersion`

know more [`nodesecure/npm-types`](https://github.com/NodeSecure/scanner/tree/master/workspaces/npm-types)
