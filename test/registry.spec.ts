// Import Node.js Dependencies
import { describe, it } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import {
  getNpmRegistryURL,
  getLocalRegistryURL,
  setLocalRegistryURL,
  loadRegistryURLFromLocalSystem
} from "../src/registry.ts";

// CONSTANTS
const kDefaultNpmRegistry = "https://registry.npmjs.org/";
const kGoogleURL = "https://www.google.fr/";

describe("NPM Registry", () => {
  describe("getNpmRegistryURL", () => {
    it("should return the default npm registry addr", () => {
      const result = getNpmRegistryURL();

      assert.deepEqual(result, kDefaultNpmRegistry);
    });
  });

  describe("getLocalRegistryURL", () => {
    it("should return the default npm registry addr when no value has been previously set", () => {
      const result = getLocalRegistryURL();

      assert.deepEqual(result, kDefaultNpmRegistry);
    });
  });

  describe("setLocalRegistryURL", () => {
    it("should return the URL itself and update the local value", () => {
      const result = setLocalRegistryURL(kGoogleURL);

      assert.deepEqual(result, kGoogleURL);
      assert.deepEqual(getLocalRegistryURL(), kGoogleURL);
    });

    it("should accept a WHATWG URL as argument", () => {
      const result = setLocalRegistryURL(new URL(kGoogleURL));

      assert.deepEqual(result, kGoogleURL);
      assert.deepEqual(getLocalRegistryURL(), kGoogleURL);
    });

    it("should throw if the string URL is invalid", () => {
      assert.throws(
        () => setLocalRegistryURL("foobar")
      );
    });
  });
});

describe("loadRegistryURLFromLocalSystem", () => {
  it("should load the registry addr from the local system", () => {
    function spawnMock() {
      return { stdout: Buffer.from(kGoogleURL) };
    }

    const result = loadRegistryURLFromLocalSystem({ spawn: spawnMock as any });

    assert.deepEqual(result, kGoogleURL);
    assert.deepEqual(getLocalRegistryURL(), kGoogleURL);
  });

  it("should return the default registry addr if the stdout is empty", () => {
    function spawnMock() {
      return { stdout: Buffer.from("") };
    }

    const result = loadRegistryURLFromLocalSystem({ spawn: spawnMock as any });

    assert.deepEqual(result, kDefaultNpmRegistry);
    assert.deepEqual(getLocalRegistryURL(), kDefaultNpmRegistry);
  });
});
