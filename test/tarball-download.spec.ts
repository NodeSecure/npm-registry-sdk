// Import Node.js Dependencies
import { describe, it, after, before } from "node:test";
import assert from "node:assert";
import { text } from "node:stream/consumers";

// Import Internal Dependencies
import {
  tarballDownload,
  getLocalRegistryURL,
  setHttpAgent,
  restoreHttpAgent
} from "../src/index.ts";
import { HTTP_CLIENT_HEADERS, setupHttpAgentMock } from "./httpie-mock.ts";

describe("download tarball", () => {
  const [dispatcher, close, agent] = setupHttpAgentMock(new URL(getLocalRegistryURL()).origin);
  before(() => {
    setHttpAgent(agent);
  });

  after(() => {
    close();
    restoreHttpAgent();
  });

  it("should download the tarball of a given package", async() => {
    const name = "express";
    const version = "4.0.0";
    const token = "npmToken";
    const fakeTarball = Buffer.from("Hello World!");

    dispatcher
      .intercept({
        path: `/${name}/-/${name}-${version}.tgz`,
        method: "GET",
        headers: { "user-agent": "httpie", Authorization: "Bearer npmToken" }
      })
      .reply(200, fakeTarball, HTTP_CLIENT_HEADERS);

    const duplex = tarballDownload(name, version, { token });

    const expected = await text(duplex);

    assert.equal(expected, "Hello World!");
  });
});
