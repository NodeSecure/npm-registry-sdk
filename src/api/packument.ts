// Import Third-party Dependencies
import type { Packument, PackumentVersion } from "@nodesecure/npm-types";
import * as httpie from "@openally/httpie";

// Import Internal Dependencies
import { getLocalRegistryURL } from "../registry.js";
import { getHttpAgent } from "../http.js";

export interface PackumentOptions {
  /** Npm API Token **/
  token: string;
}
export async function packument(
  name: string,
  options?: PackumentOptions
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
  options?: PackumentOptions
): Promise<PackumentVersion> {
  const path = new URL(`${name}/${version}`, getLocalRegistryURL());

  const { data } = await httpie.get<PackumentVersion>(path, {
    authorization: options?.token,
    agent: getHttpAgent()
  });

  return data;
}
