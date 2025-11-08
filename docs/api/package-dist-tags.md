# 📂 Api `package-dist-tags`

The `package-dist-tags` api retrieves the distribution tags for a specific npm package, showing which versions are tagged with labels like "latest", "beta", "next", etc.

## Syntax

```typescript
packageDistTags(pkgName: string, options?: DefaultRegistryApiOptions): Promise<DistTags>
```

## Types

### DistTags

```typescript
type DistTags = Record<string, string>;
```
