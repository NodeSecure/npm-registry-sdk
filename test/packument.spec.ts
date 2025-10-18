// Import Node.js Dependencies
import { describe, it } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import {
  packument,
  packumentVersion,
  setHttpAgent,
  restoreHttpAgent
} from "../src/index.ts";
import { HTTP_CLIENT_HEADERS, setupHttpAgentMock } from "./httpie-mock.ts";

// CONSTANTS
const kDefaultPackageVersion = "1.0.0";
const kDefaultPackageName = "@nodesecure/npm-registry-sdk";
const kFakePackageName = (Math.random() * 10).toString();

describe("packument", () => {
  it("should return packument data about the provided registry", async() => {
    const { name } = await packument(kDefaultPackageName);

    assert.equal(name, kDefaultPackageName);
  });

  it("should throw if the package dosn't exist", async() => {
    await assert.rejects(
      async() => await packument(kFakePackageName),
      { statusMessage: "Not Found" }
    );
  });

  it("should be able to force the registry", async() => {
    const registry = "https://some.private.registry";
    const [dispatcher, close, agent] = setupHttpAgentMock(new URL(registry).origin);
    setHttpAgent(agent);

    dispatcher
      .intercept({
        path: `/${kDefaultPackageName}`,
        method: "GET",
        headers: { "user-agent": "httpie", Authorization: "Bearer npmToken" }
      })
      .reply(200, { name: kDefaultPackageName }, HTTP_CLIENT_HEADERS);

    const { name } = await packument(kDefaultPackageName, {
      registry,
      token: "npmToken"
    });

    assert.equal(name, kDefaultPackageName);

    close();
    restoreHttpAgent();
  });
});

describe("packumentVersion", () => {
  it("should return packument data for provided version", async() => {
    const { version } = await packumentVersion(kDefaultPackageName, kDefaultPackageVersion);

    assert.equal(version, kDefaultPackageVersion);
  });

  it("should throw if the package dosn't exist", async() => {
    await assert.rejects(
      async() => await packumentVersion(kFakePackageName, kDefaultPackageVersion),
      { statusMessage: "Not Found" }
    );
  });

  it("should throw if provided package version dosn't exist", async() => {
    const fakePackageVersion = "0.0.0";

    await assert.rejects(
      async() => await packumentVersion(kDefaultPackageName, fakePackageVersion),
      { data: `version not found: ${fakePackageVersion}` }
    );
  });

  it("should be able to force the registry", async() => {
    const registry = "https://some.private.registry";
    const [dispatcher, close, agent] = setupHttpAgentMock(new URL(registry).origin);
    setHttpAgent(agent);

    dispatcher
      .intercept({
        path: `/${kDefaultPackageName}/${kDefaultPackageVersion}`,
        method: "GET",
        headers: { "user-agent": "httpie", Authorization: "Bearer npmToken" }
      })
      .reply(200, { version: kDefaultPackageVersion }, HTTP_CLIENT_HEADERS);

    const { version } = await packumentVersion(kDefaultPackageName, kDefaultPackageVersion, {
      registry,
      token: "npmToken"
    });

    assert.equal(version, kDefaultPackageVersion);

    close();
    restoreHttpAgent();
  });
});
