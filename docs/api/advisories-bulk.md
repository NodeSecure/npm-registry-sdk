# 📂 Api `advisories-bulk`

The `advisories-bulk` api retrieves vulnerabilities informations about packages and their specific versions.


## Syntax

```ts
advisoriesBulk(packageVersions:PackageVersions,options?:AdvisoriesBulkApiOptions): Promise<Advisories>
```

## Types

```ts
/**
 * Record of package names to their versions to query advisories for.
 * Key: package name (e.g., "lodash")
 * Value: array of versions (e.g., ["4.17.21", "4.17.20"])
 */
export type PackageVersions = Record<string, string[]>;
/**
 * Record of package names to their Advisory.
 * Key: package name (e.g., "lodash")
 * Value: Advisory
 */

export type AdvisoriesBulkApiOptions = DefaultRegistryApiOptions & { registry?: string; };

export type Advisories = Record<string, Advisory[]>;

export interface Cvss {
  score: number;
  vectorString: string | null;
}

export interface Advisory {
  id: number;
  url: string;
  title: string;
  severity: string;
  vulnerable_versions: string;
  cwe: string[];
  cvss: Cvss;
}
```
