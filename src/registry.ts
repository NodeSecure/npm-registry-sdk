// Import Node.js Dependencies
import { spawnSync } from "child_process";

// Import Third-party Dependencies
import { Agent } from "@myunisoft/httpie";

// CONSTANTS
const kNpmRegistryURL = new URL("https://registry.npmjs.org");
const kNpmAPIURL = new URL("https://api.npmjs.org");
const kDefaultMaxRegistryConnections = 15;

// VARS
let localNPMRegistry = kNpmRegistryURL.href;

export const httpRegistryAgent = new Agent({
  connections: kDefaultMaxRegistryConnections
});

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

export function loadRegistryURLFromLocalSystem(): string {
  try {
    const isWindows = process.platform === "win32";
    const command = `npm${isWindows ? ".cmd" : ""}`;

    const stdout = spawnSync(command, ["config", "get", "registry"]).stdout.toString().trim();
    const newRegistryURL = stdout === "" ? getNpmRegistryURL() : stdout;

    return setLocalRegistryURL(newRegistryURL);
  }
  catch {
    return getNpmRegistryURL();
  }
}

export function getNpmAPIURL(): string {
  return kNpmAPIURL.href;
}

