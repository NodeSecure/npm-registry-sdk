// Import Third-party Dependencies
import type { PackageJson, Maintainer, Dist, Repository, ObjectOfStrings } from "@npm/types";
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { getLocalRegistryURL } from "../registry.js";
import { getHttpAgent } from "../http.js";

export type { PackageJson, Maintainer, Dist, Repository };

export interface PackumentOptions {
  /** Npm API Token **/
  token: string;
}

export interface Packument {
  _id: string;
  _rev: string;
  name: string;
  readme?: string;
  description?: string;
  'dist-tags': { latest?: string } & ObjectOfStrings;
  versions: {
    [key: string]: PackumentVersion
  };
  maintainers: Maintainer[];
  time: {
    modified: string,
    created: string,
    [key: string]: string
  };
  users?: {
    [key: string]: boolean;
  }
  contributors?: Maintainer[];
  homepage?: string;
  keywords?: string[];
  repository?: Repository;
  author?: Maintainer;
  bugs?:  { url: string };
  license: string;
  // left out users (stars) deprecated, and attachments (does nothing)
  readmeFilename?: string;
}

export type PackumentVersion = PackageJson & {
  gitHead?: string;
  maintainers: Maintainer[];
  dist: Dist;
  types?: string;
  deprecated?: string;
  _id: string;
  _npmVersion: string;
  _nodeVersion: string;
  _npmUser: Maintainer;
  _hasShrinkwrap?: boolean;
  _engineSupported?: boolean;
  _defaultsLoaded?: boolean;
  _npmOperationalInternal?: {
    host: string;
    tmp: string;
  }
};

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
