// Import Third-party Dependencies
import * as httpie from "@openally/httpie";

// Import Internal Dependencies
import { getNpmRegistryURL } from "../registry.ts";

export type PermissionLevel = "read" | "write" | "admin" | "maintain";

export type NpmPackageOrg = Record<string, PermissionLevel>;

export async function org(
  namespace: string
): Promise<NpmPackageOrg> {
  const url = new URL(`-/org/${namespace}/package`, getNpmRegistryURL());

  const { data } = await httpie.get<NpmPackageOrg>(url);

  return data;
}
