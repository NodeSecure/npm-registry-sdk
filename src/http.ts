// Import Third-party Dependencies
import { Agent } from "@myunisoft/httpie";

// CONSTANTS
const kDefaultMaxRegistryConnections = 15;

const agent = new Agent({
  connections: kDefaultMaxRegistryConnections
});

export function getHttpAgent() {
  return agent;
}
