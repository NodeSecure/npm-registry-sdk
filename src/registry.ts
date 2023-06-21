// Import Node.js Dependencies
import { spawnSync } from "node:child_process";

// Interfaces
export interface LoadRegistryMixins {
  spawn?: typeof spawnSync;
}

// CONSTANTS
const kNpmRegistryURL = new URL("https://registry.npmjs.org");

// VARS
let localNPMRegistry = kNpmRegistryURL.href;

export function getNpmRegistryURL(): string {
  return kNpmRegistryURL.href;
}

export function getLocalRegistryURL(): string {
  return localNPMRegistry;
}

export function setLocalRegistryURL(value: string | URL): string {
  localNPMRegistry = new URL("", value).href;

  return localNPMRegistry;
}

export function loadRegistryURLFromLocalSystem(mixins: LoadRegistryMixins = {}): string {
  const { spawn = spawnSync } = mixins;

  try {
    const isWindows = process.platform === "win32";
    const command = `npm${isWindows ? ".cmd" : ""}`;

    const stdout = spawn(command, ["config", "get", "registry"]).stdout.toString().trim();
    const newRegistryURL = stdout === "" ? getNpmRegistryURL() : stdout;

    return setLocalRegistryURL(newRegistryURL);
  }
  catch {
    return getNpmRegistryURL();
  }
}
