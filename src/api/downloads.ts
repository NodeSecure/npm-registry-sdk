// Import Third-party Dependencies
import * as httpie from "@openally/httpie";

// Import Internal Dependencies
import * as utils from "../utils.ts";

export type Period =
  | "last-day"
  | "last-month"
  | "last-week"
  // Trick to combine literal types with primitive without sacrificing auto-complete
  | (string & Record<never, never>);

export interface NpmPackageDownload {
  downloads: number;
  start: string;
  end: string;
  package: string;
}

export async function downloads(
  pkgName: string,
  period: Period = "last-week"
): Promise<NpmPackageDownload> {
  if (typeof pkgName !== "string" || pkgName.length === 0) {
    throw new TypeError("Argument `pkgName` must be a non empty string");
  }

  const url = new URL(
    `/downloads/point/${period}/${pkgName}`,
    utils.getNpmApi()
  );
  const { data } = await httpie.get<NpmPackageDownload>(url);

  return data;
}
