# 📂 Api `org`

The `org` api retrieves package permissions for a specific npm organization namespace, showing which packages the organization has access to and their permission levels.

## Types

### PermissionLevel

```typescript
type PermissionLevel = "read" | "write" | "admin" | "maintain";
```

Permission levels:

- **read**: Can view and download packages
- **write**: Can publish new versions and update packages
- **admin**: Full administrative access including user management
- **maintain**: Can manage package settings and dependencies

### NpmPackageOrg

```typescript
type NpmPackageOrg = Record<string, PermissionLevel>;
```

A record mapping package names to their permission levels for the organization.

## Syntax

```typescript
org(namespace: string): Promise<NpmPackageOrg>
```

## Parameters

- **namespace** (string): The npm organization namespace to retrieve package permissions for (e.g., "microsoft", "google", "facebook")

## Returns

Returns a `Promise<NpmPackageOrg>` containing a mapping of package names to permission levels that the organization has access to.

## Examples

### Get organization package permissions

```typescript
import { org } from "npm-registry-sdk";

const orgPackages = await org("microsoft");
console.log("Microsoft organization packages:");

Object.entries(orgPackages).forEach(([packageName, permission]) => {
  console.log(`${packageName}: ${permission}`);
});
```

### Filter packages by permission level

```typescript
const orgPackages = await org("google");

// Get packages with admin access
const adminPackages = Object.entries(orgPackages)
  .filter(([, permission]) => permission === "admin")
  .map(([packageName]) => packageName);

console.log(`Admin packages: ${adminPackages.join(", ")}`);

// Get packages with write or admin access
const writeablePackages = Object.entries(orgPackages)
  .filter(([, permission]) => ["write", "admin"].includes(permission))
  .map(([packageName]) => packageName);

console.log(`Writeable packages: ${writeablePackages.length}`);
```

### Check specific package permission

```typescript
const orgPackages = await org("facebook");
const packageName = "react";

if (packageName in orgPackages) {
  console.log(`Facebook has ${orgPackages[packageName]} access to ${packageName}`);
} else {
  console.log(`Facebook does not have access to ${packageName}`);
}
```

### Count packages by permission level

```typescript
const orgPackages = await org("nodejs");
const permissionCounts = Object.values(orgPackages).reduce((counts, permission) => {
  counts[permission] = (counts[permission] || 0) + 1;
  return counts;
}, {} as Record<PermissionLevel, number>);

console.log("Permission distribution:");
Object.entries(permissionCounts).forEach(([permission, count]) => {
  console.log(`${permission}: ${count} packages`);
});
```
