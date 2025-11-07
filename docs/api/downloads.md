# 📂 Api `downloads`

The `downloads` api retrieves download statistics for a specific npm package over a given time period.

## Syntax

```typescript
downloads(pkgName: string, period: Period = "last-week"): Promise<NpmPackageDownload>
```

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
