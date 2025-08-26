// Import Third-party Dependencies
import * as httpie from "@openally/httpie";

// Import Internal Dependencies
import { getLocalRegistryURL } from "../registry.js";
import { getHttpAgent } from "../http.js";

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
    agent: getHttpAgent()
  });

  return data;
}
