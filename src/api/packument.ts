// Import Third-party Dependencies
import type { Packument, PackumentVersion } from "@nodesecure/npm-types";
import * as httpie from "@openally/httpie";

// Import Internal Dependencies
import { getLocalRegistryURL } from "../registry.ts";
import { getHttpAgent } from "../http.ts";
import type { DefaultRegistryApiOptions } from "./common/types.ts";

export type PackumentRegistryApiOptions = DefaultRegistryApiOptions & { registry?: string; };

export async function packument(
  name: string,
  options?: PackumentRegistryApiOptions
): Promise<Packument> {
  const path = new URL(name, options?.registry ?? getLocalRegistryURL());

  const { data } = await httpie.get<Packument>(path, {
    authorization: options?.token,
    agent: getHttpAgent()
  });

  return data;
}

export async function packumentVersion(
  name: string,
  version: string,
  options?: PackumentRegistryApiOptions
): Promise<PackumentVersion> {
  const path = new URL(`${name}/${version}`, options?.registry ?? getLocalRegistryURL());

  const { data } = await httpie.get<PackumentVersion>(path, {
    authorization: options?.token,
    agent: getHttpAgent()
  });

  return data;
}
