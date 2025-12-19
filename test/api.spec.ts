// Import Node.js Dependencies
import { describe, it, after } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import {
  metadata,
  downloads,
  user
} from "../src/index.ts";
import * as utils from "../src/utils.ts";
import { HTTP_CLIENT_HEADERS, setupHttpAgentMock } from "./httpie-mock.ts";

describe("downloads", () => {
  const apiUrl = utils.getNpmApi().href.slice(0, -1);
  const [dispatcher, close] = setupHttpAgentMock(apiUrl);

  after(() => {
    close();
  });

  it("should throw error if pkg is not defined", async() => {
    const undefinedPkg = undefined;

    await assert.rejects(
      async() => await downloads(undefinedPkg as any),
      { name: "TypeError", message: "Argument `pkgName` must be a non empty string" }
    );
  });

  it("should throw error if pkg is not a string", async() => {
    const wrongTypedPkg = 32;

    await assert.rejects(
      async() => await downloads(wrongTypedPkg as any),
      { name: "TypeError", message: "Argument `pkgName` must be a non empty string" }
    );
  });

  it("should throw error if pkg is an empty string", async() => {
    const emptyStringPkg = "";

    await assert.rejects(
      async() => await downloads(emptyStringPkg),
      { name: "TypeError", message: "Argument `pkgName` must be a non empty string" }
    );
  });

  it("should return the 'last-week' period by default", async() => {
    const pkg = "rimraf";
    const payload = { downloads: 1 };

    dispatcher
      .intercept({
        path: `/downloads/point/last-week/${pkg}`
      })
      .reply(200, payload, HTTP_CLIENT_HEADERS);

    const response = await downloads(pkg);

    assert.deepEqual(response, payload);
  });

  it("should return period provided as function argument", async() => {
    const pkg = "rimraf";
    const period = "last-day";
    const payload = { downloads: 1 };

    dispatcher
      .intercept({ path: `/downloads/point/${period}/${pkg}` })
      .reply(200, payload, HTTP_CLIENT_HEADERS);

    const response = await downloads(pkg, period);

    assert.deepEqual(response, payload);
  });
});

/**
 * NOTE: https://registry.npmjs.org return empty Object since 04/2024!
 */
describe.skip("metadata", () => {
  it("should return metadata for the npm registry", async() => {
    const { db_name: dbName } = await metadata();

    assert.equal(dbName, "registry");
  });
});

describe.skip("user", () => {
  it("should return user data", async() => {
    const defaultUser = "test-user";
    const { name, avatars, id, packages, pagination } = await user(defaultUser, { perPage: 30, page: 0 });

    assert.equal(name, defaultUser);
    assert.equal(id, 205872);
    assert.equal(typeof avatars.small === "string" && avatars.small.length > 0, true);
    assert.equal(pagination.page, 0);
    assert.equal(pagination.perPage, 30);
    assert.equal(packages.total > 0, true);
  });

  it("should throw if the user dosn't exist", async() => {
    await assert.rejects(
      async() => await user("fake-user"),
      { statusMessage: "Not Found" }
    );
  });
});
