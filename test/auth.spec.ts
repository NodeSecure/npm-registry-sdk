// Import Node.js Dependencies
import crypto from "crypto";

// Import Third-party Dependencies
import is from "@slimio/is";

// Import Internal Dependencies
import { getAuthenticationHeader, setAuthenticationBearerToken } from "../src/auth";

function toBase64(token: string): string {
  return Buffer.from(token).toString("base64");
}

describe("getAuthenticationHeader", () => {
  it("should return an empty object if no bearer token has been defined locally", () => {
    const result = getAuthenticationHeader();

    expect(is.plainObject(result)).toBe(true);
    expect(Object.keys(result).length).toStrictEqual(0);
  });

  it("should return an header Object with an 'Authorization' with the value of the first argument", () => {
    const token = "foobar";
    const result = getAuthenticationHeader(token);

    expect(result.Authorization).toStrictEqual(token);
  });
});

describe("setAuthenticationBearerToken", () => {
  it("should return a Basic Authorization header", () => {
    const token = "foo:bar";
    const result = setAuthenticationBearerToken(token);
    const tokenBase64 = toBase64(token);

    const { Authorization } = getAuthenticationHeader();
    expect(Authorization)
      .toStrictEqual(`Basic ${tokenBase64}`);
    expect(Authorization).toStrictEqual(result);
  });

  it("should return a Bearer Authorization header", () => {
    const token = crypto.randomBytes(16).toString("hex");
    const result = setAuthenticationBearerToken(token);

    const { Authorization } = getAuthenticationHeader();
    expect(Authorization)
      .toStrictEqual(`Bearer ${token}`);
    expect(Authorization).toStrictEqual(result);
  });
});
