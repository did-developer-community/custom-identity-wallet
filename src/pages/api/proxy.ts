import axios from "axios";

import { PROXY_TARGET_KEY } from "../../configs/constants";

const proxyApi = async (req, res) => {
  const proxyTarget = req.headers[PROXY_TARGET_KEY];
  if (!proxyTarget) {
    throw new Error("target is invalid");
  }
  let proxyResponse;
  if (req.method === "POST") {
    proxyResponse = await axios.post(proxyTarget, req.body);
  } else if (req.method === "GET") {
    proxyResponse = await axios.get(proxyTarget);
  } else {
    throw new Error("method is invalid");
  }
  const { data: proxyData } = proxyResponse;
  res.status(200).json(proxyData);
};

export default proxyApi;
