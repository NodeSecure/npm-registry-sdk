// Import Internal Dependencies
import {
  metadata,
  packument,
  packumentVersion
} from "../src/api";

// CONSTANTS
const kDefaultPackageVersion = "1.0.0";
const kDefaultPackageName = "@nodesecure/npm-registry-sdk";
const kFakePackageName = (Math.random() * 10).toString();

describe("metadata", () => {
  it("should return metadata for the npm registry", async() => {
    const { db_name: dbName } = await metadata();

    expect(dbName).toBe("registry");
  });
});

describe("packument", () => {
  it("should return packument data about the provided registry", async() => {
    const { name } = await packument(kDefaultPackageName);

    expect(name).toBe(kDefaultPackageName);
  });

  it("should throw if the package dosn't exist", async() => {
    try {
      await packument(kFakePackageName);
    }
    catch (error) {
      expect(error.statusMessage).toBe("Not Found");
    }
  });
});

describe("packumentVersion", () => {
  it("should return packument data for provided version", async() => {
    const { version } = await packumentVersion(kDefaultPackageName, kDefaultPackageVersion);

    expect(version).toBe(kDefaultPackageVersion);
  });

  it("should throw if the package dosn't exist", async() => {
    try {
      await packumentVersion(kFakePackageName, kDefaultPackageVersion);
    }
    catch (error) {
      expect(error.data).toBe("Not Found");
    }
  });

  it("should throw if provided package version dosn't exist", async() => {
    const fakePackageVersion = "0.0.0";

    try {
      await packumentVersion(kDefaultPackageName, fakePackageVersion);
    }
    catch (error) {
      expect(error.data).toBe(`version not found: ${fakePackageVersion}`);
    }
  });
});


