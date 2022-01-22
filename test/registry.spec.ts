// Import Third-party Dependencies
import { expect } from "chai";
import * as sinon from "sinon";

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

describe("getNpmRegistryURL", () => {
  it("should return the default npm registry addr", () => {
    const result = getNpmRegistryURL();

    expect(result).equal(kDefaultNpmRegistry);
  });
});

describe("getLocalRegistryURL", () => {
  it("should return the default npm registry addr when no value has been previously set", () => {
    const result = getLocalRegistryURL();

    expect(result).equal(kDefaultNpmRegistry);
  });
});

describe("setLocalRegistryURL", () => {
  it("should return the URL itself and update the local value", () => {
    const result = setLocalRegistryURL(kGoogleURL);

    expect(result).equal(kGoogleURL);
    expect(getLocalRegistryURL()).equal(kGoogleURL);
  });

  it("should accept a WHATWG URL as argument", () => {
    const result = setLocalRegistryURL(new URL(kGoogleURL));

    expect(result).equal(kGoogleURL);
    expect(getLocalRegistryURL()).equal(kGoogleURL);
  });

  it("should throw if the string URL is invalid", () => {
    expect(() => setLocalRegistryURL("foobar")).to.throw();
  });
});

describe("loadRegistryURLFromLocalSystem", () => {
  let spawnSync: sinon.SinonStub;
  let sandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    spawnSync = sandbox.stub(child_process, "spawnSync");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should load the registry addr from the local system", () => {
    spawnSync.returns({ stdout: Buffer.from(kGoogleURL) } as any);

    const result = loadRegistryURLFromLocalSystem();

    expect(result).equal(kGoogleURL);
    expect(getLocalRegistryURL()).equal(kGoogleURL);
    expect(spawnSync.calledOnce).equal(true);
  });

  it("should return the default registry addr if the stdout is empty", () => {
    spawnSync.returns({ stdout: Buffer.from("") } as any);

    const result = loadRegistryURLFromLocalSystem();

    expect(result).equal(kDefaultNpmRegistry);
    expect(getLocalRegistryURL()).equal(kDefaultNpmRegistry);
    expect(spawnSync.calledOnce).equal(true);
  });
});
