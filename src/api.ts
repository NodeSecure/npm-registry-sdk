// Import Third-party Dependencies
import * as npm from "@npm/types";

// Import Internal Dependencies
import * as httpie from "@myunisoft/httpie";
import { httpRegistryAgent, getLocalRegistryURL } from "./registry.js";

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
