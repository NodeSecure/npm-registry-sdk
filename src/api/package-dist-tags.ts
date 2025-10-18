// Import Third-party Dependencies
import * as httpie from "@openally/httpie";
import type { DistTags } from "@nodesecure/npm-types";

// Import Internal Dependencies
import { getLocalRegistryURL } from "../registry.ts";
import { getHttpAgent } from "../http.ts";
import type { DefaultRegistryApiOptions } from "./common/types.ts";

export async function packageDistTags(
  pkgName: string,
  options?: DefaultRegistryApiOptions
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

export type {
  DistTags
};
