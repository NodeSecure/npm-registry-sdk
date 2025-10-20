// Import Node.js Dependencies
import { describe, it } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import * as utils from "../src/utils.ts";

describe("utils.clamp()", () => {
  it("should throw if property is not a number", () => {
    assert.throws(() => {
      utils.clamp("foo" as any, 0, 10);
    }, {
      name: "TypeError",
      message: "property should be typeof number"
    });
  });

  it("given a property within the range", () => {
    const result = utils.clamp(5, 0, 10);

    assert.strictEqual(result, 5);
  });

  it("given a property below the range", () => {
    const result = utils.clamp(-1, 0, 10);

    assert.strictEqual(result, 0);
  });

  it("given a property above the range", () => {
    const result = utils.clamp(11, 0, 10);

    assert.strictEqual(result, 10);
  });

  it("given a property equal to the min range", () => {
    const result = utils.clamp(0, 0, 10);

    assert.strictEqual(result, 0);
  });

  it("given a property equal to the max range", () => {
    const result = utils.clamp(10, 0, 10);

    assert.strictEqual(result, 10);
  });

  it("given a property without ranges", () => {
    const result = utils.clamp(0.5);

    assert.strictEqual(result, 0.5);
  });
});
