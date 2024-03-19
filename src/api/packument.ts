// Import Third-party Dependencies
import type { PackageJson, Maintainer, Repository, ObjectOfStrings } from "@npm/types";
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { getLocalRegistryURL } from "../registry.js";
import { getHttpAgent } from "../http.js";

export type { PackageJson, Maintainer, Repository };

export interface DistSignature {
  keyid: string;
  sig: string;
}

export interface Dist {
  /**
   * the url to the tarball for the package version
   */
  tarball: string;
  /**
   * the sha1 sum of the tarball
   */
  shasum: string;
  /**
   * subresource integrity string! `npm view ssri`
   * https://w3c.github.io/webappsec-subresource-integrity/
   */
  integrity?: string;
  /**
   * the number of files in the tarball. this is on most packages published >= 2018
   */
  fileCount?: number;
  /**
   * the unpacked size of the files in the tarball. >= 2018
   */
  unpackedSize?: number;
  /**
   * pgp signed package signature
   * https://blog.npmjs.org/post/172999548390/new-pgp-machinery
   */
  "npm-signature"?: string;
  /**
   * NPM Provenance
   *
   * @see https://docs.npmjs.com/generating-provenance-statements
   */
  attestations?: {
    url: string;
    provenance: {
      predicateType: string;
    }
  };
  signatures?: DistSignature[];
}

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
  "dist-tags": { latest?: string } & ObjectOfStrings;
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
  bugs?: { url: string };
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
  homepage?: string;
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
