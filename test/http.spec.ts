// Import Node.js Dependencies
import { describe, it } from "node:test";
import assert from "node:assert";

// Import Third-party Dependencies
import { Agent } from "@myunisoft/httpie";

// Import Internal Dependencies
import * as HttpAgent from "../src/http";

// CONSTANTS
const testAgent = new Agent({
  connections: 1
});

describe("Http Agent", () => {
  it("should get default agent", () => {
    const agent = HttpAgent.getHttpAgent();

    const symbols = Object.getOwnPropertySymbols(agent);
    const optionsSymbol = symbols.find((symbol) => symbol.toString() === "Symbol(options)");
    const connections = Reflect.get(agent, optionsSymbol!).connections;

    assert.equal(connections, 15);
  });

  it("should update agent", () => {
    HttpAgent.setHttpAgent(testAgent);
    const agent = HttpAgent.getHttpAgent();

    const symbols = Object.getOwnPropertySymbols(agent);
    const optionsSymbol = symbols.find((symbol) => symbol.toString() === "Symbol(options)");
    const connections = Reflect.get(agent, optionsSymbol!).connections;

    assert.equal(connections, 1);
  });

  it("should restore agent to default one", () => {
    HttpAgent.setHttpAgent(testAgent);
    const agent = HttpAgent.getHttpAgent();

    const symbols = Object.getOwnPropertySymbols(agent);
    const optionsSymbol = symbols.find((symbol) => symbol.toString() === "Symbol(options)");
    const connections = Reflect.get(agent, optionsSymbol!).connections;

    assert.equal(connections, 1);

    HttpAgent.restoreHttpAgent();

    const restoredAgent = HttpAgent.getHttpAgent();

    const rSymbols = Object.getOwnPropertySymbols(restoredAgent);
    const rOptionsSymbol = rSymbols.find((symbol) => symbol.toString() === "Symbol(options)");
    const rConnections = Reflect.get(restoredAgent, rOptionsSymbol!).connections;

    assert.equal(rConnections, 15);
  });
});
