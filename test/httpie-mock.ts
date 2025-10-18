// Import Third-party Dependencies
import * as httpie from "@openally/httpie";

// CONSTANTS
export const HTTP_CLIENT_HEADERS = {
  headers: { "content-type": "application/json" }
};

export function setupHttpAgentMock(
  url: string
): [httpie.Interceptable, () => void, httpie.MockAgent] {
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
    },
    mockedHttpAgent
  ];
}
