// Import Node.js Dependencies
import { describe, it, after } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import {
  org
} from "../src/index.ts";
import { getNpmRegistryURL } from "../src/registry.ts";
import { HTTP_CLIENT_HEADERS, setupHttpAgentMock } from "./httpie-mock.ts";

describe("org", () => {
  const apiUrl = getNpmRegistryURL().slice(0, -1);
  const [dispatcher, close] = setupHttpAgentMock(apiUrl);

  after(() => {
    close();
  });

  it("should get all the org metadata", async() => {
    const namepace = "nodesecure";

    const payload = {
      "@nodesecure/authors": "write",
      "@nodesecure/estree-ast-utils": "write",
      "@nodesecure/ossf-scorecard-sdk": "write",
      "@nodesecure/ts-source-parser": "write",
      "@nodesecure/report": "write",
      "@nodesecure/npm-types": "write",
      "@nodesecure/conformance": "write",
      "@nodesecure/mama": "write",
      "@nodesecure/contact": "write",
      "@nodesecure/tree-walker": "write",
      "@nodesecure/tarball": "write",
      "@nodesecure/tracer": "write",
      "@nodesecure/npm-security-fetcher": "write",
      "@nodesecure/js-x-ray-ai": "write",
      "@nodesecure/eslint-config": "write",
      "@nodesecure/sec-literal": "write",
      "@nodesecure/size-satisfies": "write",
      "@nodesecure/js-x-ray": "write",
      "@nodesecure/npm-registry-sdk": "write",
      "@nodesecure/ntlp": "write",
      "@nodesecure/i18n": "write",
      "@nodesecure/fs-walk": "write",
      "@nodesecure/flags": "write",
      "@nodesecure/vuln": "write",
      "@nodesecure/scanner": "write",
      "@nodesecure/licenses-conformance": "write",
      "@nodesecure/utils": "write",
      "@nodesecure/github": "write",
      "@nodesecure/gitlab": "write",
      "@nodesecure/vis-network": "write",
      "@nodesecure/ci": "write",
      "@nodesecure/cli": "write",
      "@nodesecure/rc": "write",
      "@nodesecure/documentation-ui": "write",
      "@nodesecure/dependa": "write",
      "@nodesecure/vulnera": "write",
      "@nodesecure/domain-check": "write"
    };

    dispatcher
      .intercept({
        path: `-/org/${namepace}/package`
      })
      .reply(200, payload, HTTP_CLIENT_HEADERS);

    const response = await org(namepace);

    assert.deepEqual(response, payload);
  });
});
