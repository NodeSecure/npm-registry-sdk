// Import Node.js Dependencies
import { describe, it, after, before } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import {
  packageDistTags,
  getLocalRegistryURL,
  setHttpAgent,
  restoreHttpAgent
} from "../src/index.ts";

import { HTTP_CLIENT_HEADERS, setupHttpAgentMock } from "./httpie-mock.ts";

describe("package-dist-tags", () => {
  const [dispatcher, close, agent] = setupHttpAgentMock(new URL(getLocalRegistryURL()).origin);

  before(() => {
    setHttpAgent(agent);
  });

  after(() => {
    close();
    restoreHttpAgent();
  });

  it("should throw error if pkg is not defined", async() => {
    const undefinedPkg = undefined;

    await assert.rejects(
      async() => await packageDistTags(undefinedPkg as any),
      { name: "TypeError", message: "Argument `pkgName` must be a non empty string" }
    );
  });

  it("should throw error if pkg is not a string", async() => {
    const wrongTypedPkg = 32;

    await assert.rejects(
      async() => await packageDistTags(wrongTypedPkg as any),
      { name: "TypeError", message: "Argument `pkgName` must be a non empty string" }
    );
  });

  it("should throw error if pkg is an empty string", async() => {
    const emptyStringPkg = "";

    await assert.rejects(
      async() => await packageDistTags(emptyStringPkg),
      { name: "TypeError", message: "Argument `pkgName` must be a non empty string" }
    );
  });

  it("should retrieve the dist tags for a given package", async() => {
    const pkg = "react";
    const payload = {
      beta: "19.0.0-beta-26f2496093-20240514",
      rc: "19.0.0-rc.3",
      latest: "19.1.1",
      experimental: "0.0.0-experimental-8a8e9a7e-20250912",
      next: "19.2.0-canary-8a8e9a7e-20250912",
      canary: "19.2.0-canary-8a8e9a7e-20250912"
    };

    dispatcher
      .intercept({
        path: `/-/package/${pkg}/dist-tags`,
        method: "GET",
        headers: { "user-agent": "httpie", Authorization: "Bearer npm token" }
      })
      .reply(200, payload, HTTP_CLIENT_HEADERS);

    const response = await packageDistTags(pkg, { token: "npm token" });

    assert.deepEqual(response, payload);
  });
});
