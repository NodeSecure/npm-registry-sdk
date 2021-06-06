// Import Node.js dependencies
import { Readable } from "stream";
import { UrlObject } from "url";

// Import third-party dependencies
import undici from "undici";

async function parseRequestBody<T>(body: Readable) {
  body.setEncoding("utf-8");
  let data = "";
  for await (const chunk of body) {
    data += chunk;
  }

  return JSON.parse(data) as T;
}

export interface RequestOptions {
  payload?: any;
  headers?: Record<string, any>;
  method: "GET" | "POST" | "PUT";
}

export interface RequestResponse<T> {
  statusCode: number;
  body: T;
}

export async function request<T>(path: string | URL | UrlObject, options: RequestOptions = Object.create(null)): Promise<RequestResponse<T>> {
  const { payload = null, headers = {}, method = "GET" } = options;
  if (payload !== null) {
    headers["content-type"] = "application/json";
  }

  const { statusCode, body: rawBody } = await undici.request(path, {
    method,
    headers,
    body: payload === null ? void 0 : JSON.stringify(payload)
  });

  const body = await parseRequestBody<T>(rawBody);

  return { statusCode, body }
}
