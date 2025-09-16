// Import Third-party Dependencies
import * as httpie from "@openally/httpie";

// Import Internal Dependencies
import { getLocalRegistryURL } from "../registry.js";
import { getHttpAgent } from "../http.js";

export interface DistTags {
  latest: string;
  next?: string;
  canary?: string;
  rc?: string;
  beta?: string;
  alpha?: string;
  experimental?: string;
}

interface DistTagsOptions {
  token?: string;
}

export async function packageDistTags(
  pkgName: string,
  options?: DistTagsOptions
): Promise<DistTags> {
  if (typeof pkgName !== "string" || pkgName.length === 0) {
    throw new TypeError("Argument `pkgName` must be a non empty string");
  }
  const url = new URL(
    `/-/package/${pkgName}/dist-tags`,
    getLocalRegistryURL()
  );
  const { data } = await httpie.get<DistTags>(url,
    { agent: getHttpAgent(), authorization: options?.token }
  );

  return data;
}
