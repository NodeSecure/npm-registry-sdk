# 📂 Api `downloads`

The `downloads` api retrieves download statistics for a specific npm package over a given time period.

## Types

### Period

```typescript
type Period =
 | "last-day"
 | "last-month"
 | "last-week"
 | (string & Record<never, never>); // Custom date range in YYYY-MM-DD:YYYY-MM-DD format
```

### NpmPackageDownload

```typescript
interface NpmPackageDownload {
  downloads: number; // Total number of downloads for the specified period
  start: string; // Start date of the period in YYYY-MM-DD format
  end: string; // End date of the period in YYYY-MM-DD format
  package: string; // Name of the npm package
}
```

## Syntax

```typescript
downloads(pkgName: string, period: Period = "last-week"): Promise<NpmPackageDownload>
```

## Parameters

- **pkgName** (string): The name of the npm package to get download statistics for. Must be a non-empty string.
- **period** (Period, optional): The time period for statistics. Defaults to `"last-week"`.
  - `"last-day"`: Downloads from the last day
  - `"last-week"`: Downloads from the last week
  - `"last-month"`: Downloads from the last month
  - Custom date range: Format as `"YYYY-MM-DD:YYYY-MM-DD"` (e.g., `"2023-01-01:2023-01-31"`)

## Returns

Returns a `Promise<NpmPackageDownload>` containing download statistics for the specified package and period.

## Errors

- **TypeError**: Thrown when `pkgName` is not a non-empty string.

## Examples

### Get last week's downloads (default)

```typescript
import { downloads } from "npm-registry-sdk";

const stats = await downloads("express");
console.log(`${stats.package} had ${stats.downloads} downloads from ${stats.start} to ${stats.end}`);
```

### Get last month's downloads

```typescript
const monthStats = await downloads("express", "last-month");
console.log(`Monthly downloads: ${monthStats.downloads}`);
```

### Get downloads for a custom date range

```typescript
const customStats = await downloads("express", "2023-01-01:2023-01-31");
console.log(`January 2023 downloads: ${customStats.downloads}`);
```

### Error handling

```typescript
try {
  const stats = await downloads(""); // Invalid empty string
} catch (error) {
  console.error(error.message); // "Argument `pkgName` must be a non empty string"
}
```
