// Import Third-party Dependencies
import * as npm from "@npm/types";

// Import Internal Dependencies
import * as httpie from "@myunisoft/httpie";
import { httpRegistryAgent, getLocalRegistryURL } from "./registry";
import { clamp } from "./utils";

export interface NpmRegistryMetadata {
  db_name: string;
  doc_count: number;
  doc_del_count: number;
  update_seq: number;
  purge_seq: number;
  compact_running: boolean;
  disk_size: number;
  data_size: number;
  instance_start_time: string;
  disk_format_version: number;
  committed_update_seq: number;
}

export async function metadata(): Promise<NpmRegistryMetadata> {
  const { data } = await httpie.get<NpmRegistryMetadata>(getLocalRegistryURL(), {
    agent: httpRegistryAgent
  });

  return data;
}

export interface PackumentOptions {
  /** Npm API Token **/
  token: string;
}

export async function packument(name: string, options?: PackumentOptions): Promise<npm.Packument> {
  const path = new URL(name, getLocalRegistryURL());

  const { data } = await httpie.get<npm.Packument>(path, {
    authorization: options?.token,
    agent: httpRegistryAgent
  });

  return data;
}

export async function packumentVersion(name: string, version: string, options?: PackumentOptions): Promise<npm.PackumentVersion> {
  const path = new URL(`${name}/${version}`, getLocalRegistryURL());

  const { data } = await httpie.get<npm.PackumentVersion>(path, {
    authorization: options?.token,
    agent: httpRegistryAgent
  });

  return data;
}

export interface SearchOptions {
  /**	full-text search to apply **/
  text: string;
  /** how many results should be returned (default 20, max 250) **/
  size: number;
  /** offset to return results from **/
  from: number;
  /** how much of an effect should quality have on search results **/
  quality: number;
  /** how much of an effect should popularity have on search results **/
  popularity: number;
  /** how much of an effect should maintenance have on search results **/
  maintenance: number;
}

export interface SearchScore {
  final: number;
  detail: {
    quality: number;
    popularity: number;
    maintenance: number;
  }
}

export interface SearchMaintainer {
  email: string;
  username: string;
}

export interface SearchResult {
  objects: {
    package: {
      name: string;
      scope: string;
      version: string;
      description: string;
      date: string;
      links: {
        npm: string;
        homepage: string;
        bugs: string;
      }
      author: SearchMaintainer & { name?: string };
      publisher: SearchMaintainer;
      maintainers: SearchMaintainer[];
    },
    score: SearchScore;
    searchScore: number;
  }[];
  total: number;
  time: string;
}

export async function search(searchOptions: SearchOptions, options?: PackumentOptions) {
  const { text, size, from, quality, popularity, maintenance } = searchOptions;
  const query = new URL("/-/v1/search", getLocalRegistryURL());

  if (typeof text === "string") {
    query.searchParams.set("text", text);
  }
  if (typeof size === "number") {
    query.searchParams.set("size", String(clamp(size, 0, 250)));
  }
  if (typeof from === "number") {
    query.searchParams.set("from", String(from));
  }
  if (typeof quality === "number") {
    query.searchParams.set("quality", String(clamp(quality, 0, 1)));
  }
  if (typeof popularity === "number") {
    query.searchParams.set("popularity", String(clamp(popularity, 0, 1)));
  }
  if (typeof maintenance === "number") {
    query.searchParams.set("maintenance", String(clamp(maintenance, 0, 1)));
  }

  const { data } = await httpie.get(query, {
    agent: httpRegistryAgent,
    authorization: options?.token
  });

  return data;
}
