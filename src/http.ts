// Import Third-party Dependencies
import { Agent } from "@myunisoft/httpie";

// CONSTANTS
const kDefaultMaxRegistryConnections = 15;
const kDefaultAgent = new Agent({
  connections: kDefaultMaxRegistryConnections
});

let httpAgent = kDefaultAgent;

export function getHttpAgent() {
  return httpAgent;
}

export function setHttpAgent(agent: Agent) {
  httpAgent = agent;
}

export function restoreHttpAgent() {
  setHttpAgent(kDefaultAgent);
}
