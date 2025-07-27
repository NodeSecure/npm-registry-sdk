// Import Third-party Dependencies
import * as httpie from "@myunisoft/httpie";
import { Interceptable } from "undici";

// CONSTANTS
export const kHttpClientHeaders = {
  headers: { "content-type": "application/json" }
};

export function setupHttpAgentMock(
  url: string
): [Interceptable, () => void] {
  const httpDispatcher = httpie.getGlobalDispatcher();
  const mockedHttpAgent = new httpie.MockAgent();

  mockedHttpAgent.disableNetConnect();
  httpie.setGlobalDispatcher(mockedHttpAgent);

  const dispatcher = mockedHttpAgent.get(url);

  return [
    dispatcher,
    () => {
      mockedHttpAgent.enableNetConnect();
      httpie.setGlobalDispatcher(httpDispatcher);
    }
  ];
}
