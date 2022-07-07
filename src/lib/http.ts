import axios from "axios";

import { PROXY_API, PROXY_TARGET_KEY } from "../configs/constants";
export type HttpRequestMethod = "get" | "post";

export const proxyHttpRequest = async <T>(method: HttpRequestMethod, url: string, param?: any): Promise<T> => {
  let response;
  const configs = {
    headers: {
      [PROXY_TARGET_KEY]: url,
    },
  };
  if (method === "get") {
    response = await axios.get(PROXY_API, configs);
  } else if (method === "post") {
    response = await axios.post(PROXY_API, param, configs);
  } else {
    throw new Error("method is invalid");
  }
  const { data } = response;
  return data;
};
