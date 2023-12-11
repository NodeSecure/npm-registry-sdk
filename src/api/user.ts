// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

// Import Internal Dependencies
import * as utils from "../utils.js";

interface NpmPaginated<T> {
  total: number;
  objects: T[];
  urls: {
    next: string;
    prev: string;
  }
}

interface NpmAvatars {
  small: string;
  medium: string;
  large: string;
}

export interface NpmPackage {
  id: number;
  name: string;
  description: string;
  maintainers: string[];
  version: string;
}

export interface Pagination {
  perPage: number;
  page: number;
}

export interface NpmUserProfile {
  id: number;
  name: string;
  fullname?: string;
  accounts: {
    twitter?: string;
    github?: string;
  };
  avatars: NpmAvatars
  packages: NpmPaginated<NpmPackage>;
  pagination: Pagination;
}

interface NpmWebUser {
  scope: {
    id: number;
    parent: {
      name: string;
      avatars: NpmAvatars
      resource: {
        github?: string;
        twitter?: string;
        fullname?: string;
      }
    };
  }
  packages: NpmPaginated<NpmPackage>;
  pagination: Pagination;
}

export async function user(username: string, pagination: Partial<Pagination> = {}): Promise<NpmUserProfile> {
  if (typeof username !== "string" || username.length === 0) {
    throw new TypeError("Argument `username` must be a non empty string");
  }
  const { perPage = 25, page = 0 } = pagination;
  const url = new URL(`~${username}`, utils.getNpmWeb());
  url.searchParams.set("perPage", perPage.toString());
  url.searchParams.set("page", page.toString());

  const { data } = await httpie.get<NpmWebUser>(url, { headers: { "x-spiferack": "1" } });

  const npmUserProfile = {
    id: data.scope.id,
    name: data.scope.parent.name,
    fullname: data.scope.parent.resource.fullname,
    accounts: {
      twitter: data.scope.parent.resource.twitter,
      github: data.scope.parent.resource.github
    },
    avatars: data.scope.parent.avatars,
    packages: data.packages,
    pagination: data.pagination
  };

  return npmUserProfile;
}
