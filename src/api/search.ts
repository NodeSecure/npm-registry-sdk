// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import { getLocalRegistryURL } from "../registry.js";
import { getHttpAgent } from "../http.js";
import * as utils from "../utils.js";

export interface SearchCriteria {
  /**	full-text search to apply **/
  text?: string;
  /** how many results should be returned (default 20, max 250) **/
  size?: number;
  /** offset to return results from **/
  from?: number;
  /** how much of an effect should quality have on search results **/
  quality?: number;
  /** how much of an effect should popularity have on search results **/
  popularity?: number;
  /** how much of an effect should maintenance have on search results **/
  maintenance?: number;
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
      keywords?: string[]
      date: string;
      links: {
        npm: string;
        homepage?: string;
        bugs?: string;
        repository?: string;
      }
      author: SearchMaintainer & { name?: string };
      publisher: SearchMaintainer;
      maintainers: SearchMaintainer[];
    },
    score: {
      final: number;
      detail: {
        quality: number;
        popularity: number;
        maintenance: number;
      }
    };
    searchScore: number;
  }[];
  total: number;
  time: string;
}

export interface SearchOptions {
  /** Npm API Token **/
  token: string;
}

export async function search(criteria: SearchCriteria, options?: SearchOptions) {
  const { text, size, from, quality, popularity, maintenance } = criteria;
  const query = new URL("/-/v1/search", getLocalRegistryURL());

  if (typeof text === "string") {
    query.searchParams.set("text", text);
  }
  if (typeof size === "number") {
    query.searchParams.set("size", String(utils.clamp(size, 0, 250)));
  }
  if (typeof from === "number") {
    query.searchParams.set("from", String(from));
  }
  if (typeof quality === "number") {
    query.searchParams.set("quality", String(utils.clamp(quality, 0, 1)));
  }
  if (typeof popularity === "number") {
    query.searchParams.set("popularity", String(utils.clamp(popularity, 0, 1)));
  }
  if (typeof maintenance === "number") {
    query.searchParams.set("maintenance", String(utils.clamp(maintenance, 0, 1)));
  }

  const { data } = await httpie.get<SearchResult>(query, {
    agent: getHttpAgent(),
    authorization: options?.token
  });

  return data;
}
