import axios from "axios";

export type HttpRequestMethod = "get" | "post";

export const proxyHttpRequest = async <T>(method: HttpRequestMethod, url: string, param?: any): Promise<T> => {
  let response;
  const configs = {};
  if (method === "get") {
    response = await axios.get(url, configs);
  } else if (method === "post") {
    response = await axios.post(url, param, configs);
  } else {
    throw new Error("method is invalid");
  }
  const { data } = response;
  return data;
};
