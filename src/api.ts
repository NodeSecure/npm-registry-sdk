// Import Third-party Dependencies
import * as npm from '@npm/types';

// Import Internal Dependencies
import { request } from "./utils/request";
import { getAuthenticationHeader } from "./auth";
import { getLocalRegistryURL } from "./registry";

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

export async function metadata() {
  const { body } = await request<NpmRegistryMetadata>(getLocalRegistryURL());

  return body;
}

interface packumentOptions {
  token: string;
}

export async function packument(name: string, options?: packumentOptions): Promise<npm.Packument> {
  const path = new URL(name, getLocalRegistryURL());

  const { body } = await request<npm.Packument>(path, {
    headers: getAuthenticationHeader(options?.token ?? null)
  });

  return body;
}

export async function packumentVersion(name: string, version: string, options?: packumentOptions): Promise<npm.PackumentVersion> {
  const path = new URL(`${name}/${version}`, getLocalRegistryURL());

  const { body } = await request<npm.PackumentVersion>(path, {
    headers: getAuthenticationHeader(options?.token ?? null)
  });

  return body;
}
