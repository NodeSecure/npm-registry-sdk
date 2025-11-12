# 📂 Api `org`

The `org` api retrieves package permissions for a specific npm organization namespace, showing which packages the organization has access to and their permission levels.

## Syntax

```typescript
org(namespace: string): Promise<NpmPackageOrg>
```

## Types

### PermissionLevel

```typescript
type PermissionLevel = "read" | "write" | "admin" | "maintain";
```

### NpmPackageOrg

```typescript
type NpmPackageOrg = Record<string, PermissionLevel>;
```
