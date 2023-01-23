// Import Third-party Dependencies
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

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

chai.use(chaiAsPromised);

describe("downloads", () => {
  const apiUrl = utils.getNpmApi().href.slice(0, -1);
  const [dispatcher, close] = setupHttpAgentMock(apiUrl);

  after(() => {
    close();
  });

  it("should throw error if pkg is not defined", async() => {
    const undefinedPkg = undefined;

    await expect(downloads(undefinedPkg as any))
      .to.eventually.be.rejectedWith(TypeError, "Argument `pkgName` must be a non empty string");
  });

  it("should throw error if pkg is not a string", async() => {
    const wrongTypedPkg = 32;

    await expect(downloads(wrongTypedPkg as any))
      .to.eventually.be.rejectedWith(TypeError, "Argument `pkgName` must be a non empty string");
  });

  it("should throw error if pkg is an empty string", async() => {
    const emptyStringPkg = "";

    await expect(downloads(emptyStringPkg))
      .to.eventually.be.rejectedWith(TypeError, "Argument `pkgName` must be a non empty string");
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

    expect(response).deep.equal(payload);
  });

  it("should return period provided as function argument", async() => {
    const pkg = "rimraf";
    const period = "last-day";
    const payload = { downloads: 1 };

    dispatcher
      .intercept({ path: `/downloads/point/${period}/${pkg}` })
      .reply(200, payload, kHttpClientHeaders);

    const response = await downloads(pkg, period);

    expect(response).deep.equal(payload);
  });
});

describe("metadata", () => {
  it("should return metadata for the npm registry", async() => {
    const { db_name: dbName } = await metadata();

    expect(dbName).equal("registry");
  });
});

describe("packument", () => {
  it("should return packument data about the provided registry", async() => {
    const { name } = await packument(kDefaultPackageName);

    expect(name).equal(kDefaultPackageName);
  });

  it("should throw if the package dosn't exist", async() => {
    try {
      await packument(kFakePackageName);
    }
    catch (error) {
      expect(error.statusMessage).equal("Not Found");
    }
  });
});

describe("packumentVersion", () => {
  it("should return packument data for provided version", async() => {
    const { version } = await packumentVersion(kDefaultPackageName, kDefaultPackageVersion);

    expect(version).equal(kDefaultPackageVersion);
  });

  it("should throw if the package dosn't exist", async() => {
    try {
      await packumentVersion(kFakePackageName, kDefaultPackageVersion);
    }
    catch (error) {
      expect(error.data).equal("Not Found");
    }
  });

  it("should throw if provided package version dosn't exist", async() => {
    const fakePackageVersion = "0.0.0";

    try {
      await packumentVersion(kDefaultPackageName, fakePackageVersion);
    }
    catch (error) {
      expect(error.data).equal(`version not found: ${fakePackageVersion}`);
    }
  });
});

