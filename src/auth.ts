// VARS
let localAuthenticationBearer: string | null = null;

export function setAuthenticationBearerToken(token: string): string {
  // Example - login:password
  const isBasicAuthToken = token.includes(":");

  localAuthenticationBearer = isBasicAuthToken ?
    `Basic ${Buffer.from(token).toString("base64")}` :
    `Bearer ${token}`;

  return localAuthenticationBearer;
}

export function getAuthenticationHeader(token: string | null = null): Record<string, string> {
  const hasToken = localAuthenticationBearer !== null || token !== null;

  return hasToken ? {
    "Authorization": token as any || localAuthenticationBearer
  } : {};
}
