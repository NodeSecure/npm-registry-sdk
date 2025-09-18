// Import Third-party Dependencies
import type { Packument, PackumentVersion } from "@nodesecure/npm-types";
import * as httpie from "@openally/httpie";

// Import Internal Dependencies
import { getLocalRegistryURL } from "../registry.js";
import { getHttpAgent } from "../http.js";
import type { DefaultRegistryApiOptions } from "./common/types.js";

export async function packument(
  name: string,
  options?: DefaultRegistryApiOptions
): Promise<Packument> {
  const path = new URL(name, getLocalRegistryURL());

  const { data } = await httpie.get<Packument>(path, {
    authorization: options?.token,
    agent: getHttpAgent()
  });

  return data;
}

export async function packumentVersion(
  name: string,
  version: string,
  options?: DefaultRegistryApiOptions
): Promise<PackumentVersion> {
  const path = new URL(`${name}/${version}`, getLocalRegistryURL());

  const { data } = await httpie.get<PackumentVersion>(path, {
    authorization: options?.token,
    agent: getHttpAgent()
  });

  return data;
}
