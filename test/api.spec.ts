// Import Third-party Dependencies
import { describe, it ,after,} from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import {
  metadata,
  packument,
  packumentVersion,
  downloads
} from "../src/index.js";
import * as utils from "../src/utils.js";
import { kHttpClientHeaders, setupHttpAgentMock } from "./httpie-mock.js";

// CONSTANTS
const kDefaultPackageVersion = "1.0.0";
const kDefaultPackageName = "@nodesecure/npm-registry-sdk";
const kFakePackageName = (Math.random() * 10).toString();

describe("downloads", () => {
  const apiUrl = utils.getNpmApi().href.slice(0, -1);
  const [dispatcher, close] = setupHttpAgentMock(apiUrl);

  after(() => {
    close();
  });

  it("should throw error if pkg is not defined", async() => {
    const undefinedPkg = undefined;

    try{
      await downloads(undefinedPkg as any);
    }
    catch(error){
      assert.equal(error.message,"Argument `pkgName` must be a non empty string");
    }
  });

  it("should throw error if pkg is not a string", async() => {
    const wrongTypedPkg = 32;

    try{
      await downloads(wrongTypedPkg as any);
    }
    catch(error){
      assert.strictEqual(error.message,"Argument `pkgName` must be a non empty string");
    }
  });

  it("should throw error if pkg is an empty string", async() => {
    const emptyStringPkg = "";

    try{
      await downloads(emptyStringPkg);
    }
    catch(error){
      assert.strictEqual(error.message,"Argument `pkgName` must be a non empty string");
    }
  });

  it("should return the 'last-week' period by default", async() => {
    const pkg = "rimraf";
    const payload = { downloads: 1 };

    dispatcher
      .intercept({
        path: `/downloads/point/last-week/${pkg}`
      })
      .reply(200, payload, kHttpClientHeaders);

    const response = await downloads(pkg);

    assert.deepEqual(response,payload);
  });

  it("should return period provided as function argument", async() => {
    const pkg = "rimraf";
    const period = "last-day";
    const payload = { downloads: 1 };

    dispatcher
      .intercept({ path: `/downloads/point/${period}/${pkg}` })
      .reply(200, payload, kHttpClientHeaders);

    const response = await downloads(pkg, period);

    assert.deepEqual(response,payload);
  });
});

describe("metadata", () => {
  it("should return metadata for the npm registry", async() => {
    const { db_name: dbName } = await metadata();

    assert.equal(dbName,"registry");
  });
});

describe("packument", () => {
  it("should return packument data about the provided registry", async() => {
    const { name } = await packument(kDefaultPackageName);

    assert.equal(name,kDefaultPackageName);
  });

  it("should throw if the package dosn't exist", async() => {
    try {
      await packument(kFakePackageName);
    }
    catch (error) {
      assert.equal(error.statusMessage,"Not Found")
    }
  });
});

describe("packumentVersion", () => {
  it("should return packument data for provided version", async() => {
    const { version } = await packumentVersion(kDefaultPackageName, kDefaultPackageVersion);

    assert.equal(version,kDefaultPackageVersion);
  });

  it("should throw if the package dosn't exist", async() => {
    try {
      await packumentVersion(kFakePackageName, kDefaultPackageVersion);
    }
    catch (error) {
      assert.equal(error.data,"Not Found")
    }
  });

  it("should throw if provided package version dosn't exist", async() => {
    const fakePackageVersion = "0.0.0";

    try {
      await packumentVersion(kDefaultPackageName, fakePackageVersion);
    }
    catch (error) {
      assert.equal(error.data,`version not found: ${fakePackageVersion}`)
    }
  });
});

