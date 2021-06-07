// Import Third-party Dependencies
import { jest } from "@jest/globals";
import { mocked } from "ts-jest/utils";

// Import Node.js Dependencies
import child_process from "child_process";

// Import Internal Dependencies
import {
  getNpmRegistryURL,
  getLocalRegistryURL,
  setLocalRegistryURL,
  loadRegistryURLFromLocalSystem
} from "../src/registry";

// CONSTANTS
const kDefaultNpmRegistry = "https://registry.npmjs.org/";
const kGoogleURL = "https://www.google.fr/";

// SPY & MOCKS
jest.mock("child_process");

const mockedChildproc = mocked(child_process);
mockedChildproc.spawnSync = jest.fn().mockName("spawnSync") as any;

describe("getNpmRegistryURL", () => {
  it("should return the default npm registry addr", () => {
    const result = getNpmRegistryURL();

    expect(result).toStrictEqual(kDefaultNpmRegistry);
  });
});

describe("getLocalRegistryURL", () => {
  it("should return the default npm registry addr when no value has been previously set", () => {
    const result = getLocalRegistryURL();

    expect(result).toStrictEqual(kDefaultNpmRegistry);
  });
});

describe("setLocalRegistryURL", () => {
  it("should return the URL itself and update the local value", () => {
    const result = setLocalRegistryURL(kGoogleURL);

    expect(result).toStrictEqual(kGoogleURL);
    expect(getLocalRegistryURL()).toStrictEqual(kGoogleURL);
  });

  it("should accept a WHATWG URL as argument", () => {
    const result = setLocalRegistryURL(new URL(kGoogleURL));

    expect(result).toStrictEqual(kGoogleURL);
    expect(getLocalRegistryURL()).toStrictEqual(kGoogleURL);
  });

  it("should throw if the string URL is invalid", () => {
    expect(() => setLocalRegistryURL("foobar")).toThrow();
  })
});

describe("loadRegistryURLFromLocalSystem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should load the registry addr from the local system", () => {
    mockedChildproc.spawnSync.mockReturnValueOnce({
      stdout: Buffer.from(kGoogleURL)
    } as any);
    const result = loadRegistryURLFromLocalSystem();

    expect(result).toStrictEqual(kGoogleURL);
    expect(getLocalRegistryURL()).toStrictEqual(kGoogleURL);
    expect(mockedChildproc.spawnSync).toHaveBeenCalledTimes(1);
  });

  it("should return the default registry addr if the stdout is empty", () => {
    mockedChildproc.spawnSync.mockReturnValueOnce({
      stdout: Buffer.from("")
    } as any);
    const result = loadRegistryURLFromLocalSystem();

    expect(result).toStrictEqual(kDefaultNpmRegistry);
    expect(getLocalRegistryURL()).toStrictEqual(kDefaultNpmRegistry);
    expect(mockedChildproc.spawnSync).toHaveBeenCalledTimes(1);
  });
});
