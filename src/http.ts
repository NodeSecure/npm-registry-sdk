// Import Third-party Dependencies
import { Agent, MockAgent } from "@myunisoft/httpie";

// CONSTANTS
const kDefaultMaxRegistryConnections = 15;
const kDefaultAgent = new Agent({
  connections: kDefaultMaxRegistryConnections
});

let httpAgent: Agent | MockAgent = kDefaultAgent;

export function getHttpAgent() {
  return httpAgent;
}

export function setHttpAgent(agent: Agent | MockAgent) {
  httpAgent = agent;
}

export function restoreHttpAgent() {
  setHttpAgent(kDefaultAgent);
}
