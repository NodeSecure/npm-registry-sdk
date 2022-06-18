/* eslint-disable no-sync */

// Import Third-party Dependencies
import { expect } from "chai";

// Import Node.js Dependencies
// import child_process from "child_process";

// Import Internal Dependencies
import {
  getNpmRegistryURL,
  getLocalRegistryURL,
  setLocalRegistryURL,
  buildDownloadsURL
//  loadRegistryURLFromLocalSystem
} from "../src/registry";

// CONSTANTS
const kDefaultNpmRegistry = "https://registry.npmjs.org/";
const kGoogleURL = "https://www.google.fr/";

describe("buildDownloadsURL", () => {
  it("should call httpClient.get with one of three valid periods", async() => {
    for (const period of ["last-week", "last-month", "last-day"]) {
      const pkg = "rimraf";
      const url = buildDownloadsURL(pkg, period);

      const expectedUrl = `https://api.npmjs.org/downloads/point/${period}/${pkg}`;
      expect(url).deep.equal(expectedUrl);
    }
  });
});

describe("getNpmRegistryURL", () => {
  it("should return the default npm registry addr", () => {
    const result = getNpmRegistryURL();

    expect(result).deep.equal(kDefaultNpmRegistry);
  });
});

describe("getLocalRegistryURL", () => {
  it("should return the default npm registry addr when no value has been previously set", () => {
    const result = getLocalRegistryURL();

    expect(result).deep.equal(kDefaultNpmRegistry);
  });
});

describe("setLocalRegistryURL", () => {
  it("should return the URL itself and update the local value", () => {
    const result = setLocalRegistryURL(kGoogleURL);

    expect(result).deep.equal(kGoogleURL);
    expect(getLocalRegistryURL()).deep.equal(kGoogleURL);
  });

  it("should accept a WHATWG URL as argument", () => {
    const result = setLocalRegistryURL(new URL(kGoogleURL));

    expect(result).deep.equal(kGoogleURL);
    expect(getLocalRegistryURL()).deep.equal(kGoogleURL);
  });

  it("should throw if the string URL is invalid", () => {
    expect(() => setLocalRegistryURL("foobar")).to.throw();
  });
});

// describe("loadRegistryURLFromLocalSystem", () => {
//  beforeEach(() => {
//    jest.clearAllMocks();
//  });
//
//  it("should load the registry addr from the local system", () => {
//    mockedChildproc.spawnSync.mockReturnValueOnce({
//      stdout: Buffer.from(kGoogleURL)
//    } as any);
//    const result = loadRegistryURLFromLocalSystem();
//
//    expect(result).deep.equal(kGoogleURL);
//    expect(getLocalRegistryURL()).deep.equal(kGoogleURL);
//    expect(mockedChildproc.spawnSync).toHaveBeenCalledTimes(1);
//  });
//
//  it("should return the default registry addr if the stdout is empty", () => {
//    mockedChildproc.spawnSync.mockReturnValueOnce({
//      stdout: Buffer.from("")
//    } as any);
//    const result = loadRegistryURLFromLocalSystem();
//
//    expect(result).deep.equal(kDefaultNpmRegistry);
//    expect(getLocalRegistryURL()).deep.equal(kDefaultNpmRegistry);
//    expect(mockedChildproc.spawnSync).toHaveBeenCalledTimes(1);
//  });
// });
