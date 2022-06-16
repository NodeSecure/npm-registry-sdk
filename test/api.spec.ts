// Import Third-party Dependencies
import chai, { expect } from 'chai';
import { spy } from 'tinyspy';
import chaiAsPromised from 'chai-as-promised';

// Import Internal Dependencies
import {
  metadata,
  packument,
  packumentVersion,
  downloads,
  // types
  Period
} from "../src/api";

chai.use(chaiAsPromised);

// CONSTANTS
const kDefaultPackageVersion = "1.0.0";
const kDefaultPackageName = "@nodesecure/npm-registry-sdk";
const kFakePackageName = (Math.random() * 10).toString();

describe('downloads', () => {
  it('should call httpClient.get within pkg argument and default period', async () => {
    const get = spy(() => ({ downloads: { total: 1 } }));
    const httpClient = { get };
    const defaultPeriod = 'last-week';

    const pkg = "rimraf";
    await downloads(pkg, undefined, httpClient as any);

    const expectedUrl = new URL(`https://api.npmjs.org/downloads/point/${defaultPeriod}/${pkg}`) 
    const [firstArg] = get.calls.at(0) as unknown[];
    expect(firstArg).deep.equal(expectedUrl);
  });

  it('should call httpClient.get with one of three valid periods', async () => {
    const get = spy(() => ({ downloads: { total: 1 } }));
    const httpClient = { get };

    let count = 0;
    for (const period of ['last-week', 'last-month', 'last-day'] as Period[]) {
      const pkg = "rimraf";
      await downloads(pkg, period, httpClient as any);

      const expectedUrl = new URL(`https://api.npmjs.org/downloads/point/${period}/${pkg}`) 
      const [firstArg] = get.calls.at(count++) as unknown[];
      expect(firstArg).deep.equal(expectedUrl);
    }
  });

  it('should throw error if pkg is not defined', async () => {
    const undefinedPkg = undefined;

    await expect(downloads(undefinedPkg as any, undefined, {} as any))
      .to.eventually.be.rejectedWith(TypeError, 'Argument `pkgName` must be a non empty string');
  });
  
  it('should throw error if pkg is not a string', async () => {
    const wrongTypedPkg = 32;

    await expect(downloads(wrongTypedPkg as any, undefined, {} as any))
      .to.eventually.be.rejectedWith(TypeError, 'Argument `pkgName` must be a non empty string');
  });
  
  it('should throw error if pkg is an empty string', async () => {
    const wrongTypedPkg = 32;

    await expect(downloads(wrongTypedPkg as any, undefined, {} as any))
      .to.eventually.be.rejectedWith(TypeError, 'Argument `pkgName` must be a non empty string');
  });

  it('should return response.data from httpClient.get', async () => {
    const payload = { downloads: { total: 1 } };
    const get = spy(() => ({ data: payload }));
    const httpClient = { get };

    const pkg = "rimraf";
    const response = await downloads(pkg, undefined, httpClient as any);

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

