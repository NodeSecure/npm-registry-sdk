# 📂 Api `user`

The `user` api retrieves profile information for a specific npm user, including their packages, account details, and social media links.

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

## Syntax

```typescript
user(username: string, pagination?: Partial<Pagination>): Promise<NpmUserProfile>
```

## Parameters

- **username** (string): The npm username to retrieve profile information for. Must be a non-empty string.
- **pagination** (Partial<Pagination>, optional): Pagination options for the user's packages
  - **perPage** (number, optional): Number of packages per page (default: 25)
  - **page** (number, optional): Page number to retrieve (default: 0, 0-based)

## Returns

Returns a `Promise<NpmUserProfile>` containing the user's profile information, including their packages with pagination.

## Errors

- **TypeError**: Thrown when `username` is not a non-empty string.

## Examples

### Get user profile with default pagination

```typescript
import { user } from "npm-registry-sdk";

const profile = await user("sindresorhus");
console.log(`User: ${profile.name}`);
console.log(`Full name: ${profile.fullname || "Not provided"}`);
console.log(`Total packages: ${profile.packages.total}`);
console.log(`GitHub: ${profile.accounts.github || "Not linked"}`);
console.log(`Twitter: ${profile.accounts.twitter || "Not linked"}`);
```

### Get user packages with custom pagination

```typescript
const profile = await user("tj", { perPage: 50, page: 0 });

console.log(`Showing ${profile.packages.objects.length} of ${profile.packages.total} packages:`);
profile.packages.objects.forEach((pkg) => {
  console.log(`- ${pkg.name}: ${pkg.description}`);
});
```

### Browse through user's packages

```typescript
// Get first page
let currentPage = 0;
const perPage = 20;

const firstPage = await user("isaacs", { perPage, page: currentPage });
console.log(`Page ${currentPage + 1} of ${Math.ceil(firstPage.packages.total / perPage)}`);

firstPage.packages.objects.forEach((pkg) => {
  console.log(`${pkg.name} (v${pkg.version}): ${pkg.description}`);
});

// Get next page if available
if (firstPage.packages.urls.next) {
  currentPage++;
  const nextPage = await user("isaacs", { perPage, page: currentPage });
  console.log(`\nPage ${currentPage + 1}:`);
  nextPage.packages.objects.forEach((pkg) => {
    console.log(`${pkg.name} (v${pkg.version}): ${pkg.description}`);
  });
}
```

### Analyze user's package portfolio

```typescript
const profile = await user("yarnpkg");

console.log(`=== ${profile.name} Profile Analysis ===`);
console.log(`Total packages: ${profile.packages.total}`);

// Get all packages by fetching all pages
const allPackages = [];
let page = 0;
const perPage = 100;

while (true) {
  const pageData = await user("yarnpkg", { perPage, page });
  allPackages.push(...pageData.packages.objects);

  if (pageData.packages.objects.length < perPage) {
    break; // Last page
  }
  page++;
}

// Analyze packages
const packageNames = allPackages.map((pkg) => pkg.name);
const scopedPackages = packageNames.filter((name) => name.startsWith("@"));
const unscopedPackages = packageNames.filter((name) => !name.startsWith("@"));

console.log(`Scoped packages: ${scopedPackages.length}`);
console.log(`Unscoped packages: ${unscopedPackages.length}`);

// Find most common maintainers
const maintainerCounts = {};
allPackages.forEach((pkg) => {
  pkg.maintainers.forEach((maintainer) => {
    maintainerCounts[maintainer] = (maintainerCounts[maintainer] || 0) + 1;
  });
});

const topMaintainers = Object.entries(maintainerCounts)
  .sort(([, a], [, b]) => b - a)
  .slice(0, 5);

console.log("\nTop collaborators:");
topMaintainers.forEach(([maintainer, count]) => {
  console.log(`- ${maintainer}: ${count} packages`);
});
```

### Display user avatar

```typescript
const profile = await user("npm");

console.log("Avatar URLs:");
console.log(`Small: ${profile.avatars.small}`);
console.log(`Medium: ${profile.avatars.medium}`);
console.log(`Large: ${profile.avatars.large}`);

// In a web application, you might use:
// <img src={profile.avatars.medium} alt={`${profile.name} avatar`} />
```

### Handle user not found

```typescript
try {
  const profile = await user(""); // Invalid empty string
} catch (error) {
  console.error(error.message); // "Argument `username` must be a non empty string"
}

try {
  const profile = await user("definitely-not-a-real-user-12345");
} catch (error) {
  if (error.statusCode === 404) {
    console.error("User not found");
  } else {
    console.error("Failed to fetch user:", error.message);
  }
}
```

### Compare multiple users

```typescript
const users = ["sindresorhus", "tj", "isaacs"];
const profiles = await Promise.all(users.map((username) => user(username)));

console.log("User comparison:");
profiles.forEach((profile) => {
  console.log(`${profile.name}: ${profile.packages.total} packages`);
  if (profile.fullname) console.log(`  Full name: ${profile.fullname}`);
  if (profile.accounts.github) console.log(`  GitHub: ${profile.accounts.github}`);
  if (profile.accounts.twitter) console.log(`  Twitter: ${profile.accounts.twitter}`);
  console.log();
});
```
