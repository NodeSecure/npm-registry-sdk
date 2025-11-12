# 📂 Api `user`

The `user` api retrieves profile information for a specific npm user, including their packages, account details, and social media links.

## Syntax

```typescript
user(username: string, pagination?: Partial<Pagination>): Promise<NpmUserProfile>
```

## Types

### NpmUserProfile

```typescript
interface NpmUserProfile {
  id: number; // Unique user identifier
  name: string; // Username
  fullname?: string; // Full display name
  accounts: {
    // Social media accounts
    twitter?: string; // Twitter handle
    github?: string; // GitHub username
  };
  avatars: NpmAvatars; // Avatar URLs in different sizes
  packages: NpmPaginated<NpmPackage>; // User's packages with pagination
  pagination: Pagination; // Current pagination state
}
```

### NpmPackage

```typescript
interface NpmPackage {
  id: number; // Package identifier
  name: string; // Package name
  description: string; // Package description
  maintainers: string[]; // List of maintainer usernames
  version: string; // Latest version
}
```

### NpmAvatars

```typescript
interface NpmAvatars {
  small: string; // Small avatar URL
  medium: string; // Medium avatar URL
  large: string; // Large avatar URL
}
```

### Pagination

```typescript
interface Pagination {
  perPage: number; // Number of packages per page
  page: number; // Current page number (0-based)
}
```

### NpmPaginated

```typescript
interface NpmPaginated<T> {
  total: number; // Total number of items
  objects: T[]; // Array of items for current page
  urls: {
    next: string; // URL for next page
    prev: string; // URL for previous page
  };
}
```
