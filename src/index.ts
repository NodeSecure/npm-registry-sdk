// Import Node.js Dependencies
import { spawnSync } from "child_process";

// Import Third-party Dependencies
import * as npm from '@npm/types';

// Import Internal Dependencies
import { request } from "./helpers";

// CONSTANTS
const kNpmRegistryURL = new URL("https://registry.npmjs.org");

// VARS
let localNPMRegistry = kNpmRegistryURL.href;
let localAuthenticationBearer: string | null = null;

export function getRegistryURL(): string {
  return localNPMRegistry;
}

export function setRegistryURL(value: string | URL): string {
  localNPMRegistry = new URL("", value).href;

  return localNPMRegistry;
}

export function loadRegistryURLFromLocalSystem(): string {
  try {
    const isWindows = process.platform === "win32";
    const command = `npm${isWindows ? ".cmd" : ""}`;

    const stdout = spawnSync(command, ["config", "get", "registry"]).stdout.toString().trim();
    const newRegistryURL = stdout === "" ? kNpmRegistryURL.href : stdout;

    return setRegistryURL(newRegistryURL);
  }
  catch {
    return kNpmRegistryURL.href;
  }
}

export function setAuthenticationBearerToken(token: string): string {
  // Example - login:password
  const isBasicAuthToken = token.includes(":");

  return isBasicAuthToken ?
    `Basic ${Buffer.from(token).toString("base64")}` :
    `Bearer ${token}`;
}

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
  const { body } = await request<NpmRegistryMetadata>(localNPMRegistry);

  return body;
}

export async function packument(name: string): Promise<npm.Packument>;
export async function packument(name: string, version: string): Promise<npm.PackumentVersion>;

export async function packument(name: string, version = ""): Promise<npm.Packument | npm.PackumentVersion> {
  const path = new URL(`${name}/${version}`, localNPMRegistry);
  const headers = localAuthenticationBearer === null ? {} : {
    "Authorization": localAuthenticationBearer
  };

  // @ts-ignore
  const { body } = await request<npm.Packument>(path, {
    headers
  });

  return body;
}
