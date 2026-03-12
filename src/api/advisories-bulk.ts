// Import Third-party Dependencies
import * as httpie from "@openally/httpie";

// Import Internal Dependencies
import { getHttpAgent } from "../http.ts";
import { getLocalRegistryURL } from "../registry.ts";
import type { DefaultRegistryApiOptions } from "./common/types.ts";

/**
 * Record of package names to their versions to query advisories for.
 * Key: package name (e.g., "lodash")
 * Value: array of versions (e.g., ["4.17.21", "4.17.20"])
 */
export type PackageVersions = Record<string, string[]>;

export type AdvisoriesBulkApiOptions = DefaultRegistryApiOptions & { registry?: string; };

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

/**
 * Record of package names to their Advisory.
 * Key: package name (e.g., "lodash")
 * Value: Advisory
 */
export type Advisories = Record<string, Advisory[]>;

export async function advisoriesBulk(packageVersions: PackageVersions, options?: AdvisoriesBulkApiOptions): Promise<Advisories> {
  const query = new URL("/-/npm/v1/security/advisories/bulk", options?.registry ?? getLocalRegistryURL());

  const { data } = await httpie.post<string>(query, {
    authorization: options?.token,
    body: packageVersions,
    agent: getHttpAgent()
  });

  return JSON.parse(data);
}

