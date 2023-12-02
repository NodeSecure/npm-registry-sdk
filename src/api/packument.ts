// Import Third-party Dependencies
import * as npm from "@npm/types";
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { getLocalRegistryURL } from "../registry.js";
import { getHttpAgent } from "../http.js";

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
  'dist-tags': { latest?: string } & npm.ObjectOfStrings;
  versions: {
    [key: string]: PackumentVersion
  };
  maintainers: npm.Maintainer[];
  time: {
    modified: string,
    created: string,
    [key: string]: string
  };
  users?: {
    [key: string]: boolean;
  }
  contributors?: npm.Maintainer[];
  homepage?: string;
  keywords?: string[];
  repository?: npm.Repository;
  author?: npm.Maintainer;
  bugs?:  { url: string };
  license: string;
  // left out users (stars) deprecated, and attachments (does nothing)
  readmeFilename?: string;
}

export type PackumentVersion = npm.PackageJson & {
  gitHead?: string;
  maintainers: npm.Maintainer[];
  dist: npm.Dist;
  types?: string;
  deprecated?: string;
  _id: string;
  _npmVersion: string;
  _nodeVersion: string;
  _npmUser: npm.Maintainer;
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
