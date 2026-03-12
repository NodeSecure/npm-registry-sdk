// Import Node.js Dependencies
import { describe, it } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import {
  advisoriesBulk,
  setHttpAgent,
  restoreHttpAgent,
  setLocalRegistryURL,
  getLocalRegistryURL
} from "../src/index.ts";
import { setupHttpAgentMock } from "./httpie-mock.ts";

const kDefaultAuditReports = {
  lodash: [
    {
      id: 1106900,
      url: "https://github.com/advisories/GHSA-fvqr-27wr-82fm",
      title: "Prototype Pollution in lodash",
      severity: "moderate",
      vulnerable_versions: "<4.17.5",
      cwe: ["CWE-471", "CWE-1321"],
      cvss: {
        score: 6.5,
        vectorString: "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:H/A:N"
      }
    },
    {
      id: 1106913,
      url: "https://github.com/advisories/GHSA-35jh-r3h4-6jhm",
      title: "Command Injection in lodash",
      severity: "high",
      vulnerable_versions: "<4.17.21",
      cwe: ["CWE-77", "CWE-94"],
      cvss: {
        score: 7.2,
        vectorString: "CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:H"
      }
    },
    {
      id: 1106914,
      url: "https://github.com/advisories/GHSA-4xc9-xhrj-v574",
      title: "Prototype Pollution in lodash",
      severity: "high",
      vulnerable_versions: "<4.17.11",
      cwe: ["CWE-400"],
      cvss: {
        score: 0,
        vectorString: null
      }
    },
    {
      id: 1106918,
      url: "https://github.com/advisories/GHSA-jf85-cpcp-j695",
      title: "Prototype Pollution in lodash",
      severity: "critical",
      vulnerable_versions: "<4.17.12",
      cwe: ["CWE-20", "CWE-1321"],
      cvss: {
        score: 9.1,
        vectorString: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:H/A:H"
      }
    }
  ]
};

describe("advisories-bulk", () => {
  it("should retrieve the audit reports based on the provided body", async() => {
    const auditReports = await advisoriesBulk({ lodash: ["1.0.1"] });
    assert.deepEqual(auditReports, kDefaultAuditReports);
  });

  it("should be able to force the registry and pass an authentication token", async() => {
    const packageVersions = { lodash: ["1.0.1"] };
    const registry = "https://some.private.registry";
    const [dispatcher, close, agent] = setupHttpAgentMock(new URL(registry).origin);
    setHttpAgent(agent);
    dispatcher
      .intercept({
        path: "/-/npm/v1/security/advisories/bulk",
        method: "POST",
        headers: { "user-agent": "httpie", Authorization: "Bearer npmToken" },
        body: JSON.stringify(packageVersions)
      })
      .reply(200, kDefaultAuditReports);
    const auditReports = await advisoriesBulk(packageVersions, {
      registry,
      token: "npmToken"
    });
    assert.deepEqual(auditReports, kDefaultAuditReports);
    close();
    restoreHttpAgent();
  });

  it("should query with the local registry", async() => {
    const packageVersions = { lodash: ["1.0.1"] };
    const orignalLocalRegistry = getLocalRegistryURL();
    const registry = "https://some.private.registry";
    setLocalRegistryURL(registry);
    const [dispatcher, close, agent] = setupHttpAgentMock(new URL(registry).origin);
    setHttpAgent(agent);
    dispatcher
      .intercept({
        path: "/-/npm/v1/security/advisories/bulk",
        method: "POST",
        headers: { "user-agent": "httpie", Authorization: "Bearer npmToken" },
        body: JSON.stringify(packageVersions)
      })
      .reply(200, kDefaultAuditReports);
    const auditReports = await advisoriesBulk(packageVersions, {
      token: "npmToken"
    });
    assert.deepEqual(auditReports, kDefaultAuditReports);
    close();
    setLocalRegistryURL(orignalLocalRegistry);
    restoreHttpAgent();
  });
});
