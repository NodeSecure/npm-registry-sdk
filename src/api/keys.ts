// Import Third-party Dependencies
import * as httpie from "@openally/httpie";

// Import Internal Dependencies
import { getNpmRegistryURL } from "../registry.js";

export interface RegistryKey {
  keyid: string;
  keytype: string;
  scheme: string;
  key: string;
  pemkey: string;
  expires: string | null;
}

export async function keys(): Promise<RegistryKey[]> {
  const { data } = await httpie.get<{ keys: RegistryKey[]; }>(
    new URL("-/npm/v1/keys", getNpmRegistryURL())
  );

  return data.keys.map((key) => {
    return {
      ...key,
      pemkey: `-----BEGIN PUBLIC KEY-----\n${key.key}\n-----END PUBLIC KEY-----`
    };
  });
}
