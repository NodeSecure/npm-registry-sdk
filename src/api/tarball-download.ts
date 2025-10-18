// Import Node.js Dependencies
import { PassThrough } from "node:stream";

// Import Third-party Dependencies
import * as httpie from "@openally/httpie";

// Import Internal Dependencies
import { getLocalRegistryURL } from "../registry.ts";
import { getHttpAgent } from "../http.ts";
import type { DefaultRegistryApiOptions } from "./common/types.ts";

export function tarballDownload(name: string, version: string, options?: DefaultRegistryApiOptions): NodeJS.ReadableStream {
  const url = new URL(`/${name}/-/${name}-${version}.tgz`, getLocalRegistryURL());

  const pass = new PassThrough();

  const cursor = httpie.stream("GET", url, {
    authorization: options?.token,
    agent: getHttpAgent()
  });

  cursor(() => pass);

  return pass;
}
