// Import Node.js Dependencies
import { describe, test, after } from "node:test";
import assert from "node:assert/strict";

// Import Internal Dependencies
import { keys } from "../src/index.js";
import { getNpmRegistryURL } from "../src/registry.js";
import {
  kHttpClientHeaders,
  setupHttpAgentMock
} from "./httpie-mock.js";

// CONSTANTS
const kMockRegistryKeysResponse = {
  keys: [
    {
      expires: "2025-01-29T00:00:00.000Z",
      keyid: "SHA256:019853ca-f05f-7839-b4de-a2e6d2157f4a",
      keytype: "ecdsa-sha2-nistp256",
      scheme: "ecdsa-sha2-nistp256",
      key: "019853ca-da66-7967-ba49-1fe7a209aa9b"
    },
    {
      expires: null,
      keyid: "SHA256:019853cb-ada7-73d1-9997-843dbe39f12d",
      keytype: "ecdsa-sha2-nistp256",
      scheme: "ecdsa-sha2-nistp256",
      key: "019853cb-ada7-73d1-9997-843dbe39f12d"
    }
  ]
};

describe("keys", () => {
  const apiUrl = getNpmRegistryURL().slice(0, -1);
  const [dispatcher, close] = setupHttpAgentMock(apiUrl);

  after(() => {
    close();
  });

  test("keys should execute successfully", async() => {
    dispatcher
      .intercept({
        path: "/-/npm/v1/keys",
        method: "GET"
      })
      .reply(200, kMockRegistryKeysResponse, kHttpClientHeaders);

    const data = await keys();

    assert.ok(Array.isArray(data));
    assert.equal(data.length, 2);

    assert.equal(data[0].expires, "2025-01-29T00:00:00.000Z");
    assert.equal(data[0].keyid, "SHA256:019853ca-f05f-7839-b4de-a2e6d2157f4a");
    assert.equal(data[0].keytype, "ecdsa-sha2-nistp256");
    assert.equal(data[0].scheme, "ecdsa-sha2-nistp256");
    assert.equal(data[0].key, "019853ca-da66-7967-ba49-1fe7a209aa9b");
    assert.equal(data[0].pemkey, "-----BEGIN PUBLIC KEY-----\n019853ca-da66-7967-ba49-1fe7a209aa9b\n-----END PUBLIC KEY-----");

    assert.equal(data[1].expires, null);
    assert.equal(data[1].keyid, "SHA256:019853cb-ada7-73d1-9997-843dbe39f12d");
    assert.equal(data[1].key, "019853cb-ada7-73d1-9997-843dbe39f12d");
  });
});
