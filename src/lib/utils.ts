import jsonwebtoken from "jsonwebtoken";

import { QR_REQUEST_URI_KEY } from "../configs/constants";
import { VCRequest } from "../types";

export type VCRequestType = "issue" | "present";

export interface JWTHeader {
  kid: string;
}

export interface VCData {
  vc: {
    type: string[];
  };
}

export const getRequestUrlFromQRCodeMessage = (message: string): string => {
  const urlSearchParams = new URLSearchParams(message);
  const requestUrl = urlSearchParams.get(QR_REQUEST_URI_KEY);
  if (!requestUrl) {
    throw new Error("QR code does not contains request url");
  }
  return requestUrl;
};

export const getProtectedHeaderFromVCRequest = (jwt: string): JWTHeader => {
  const { header } = jsonwebtoken.decode(jwt, { complete: true });
  return header as JWTHeader;
};

export const getRequestFromVCRequest = (
  jwt: string
): {
  vcRequestType: VCRequestType;
  vcRequest: VCRequest;
} => {
  const decodedRequestData = <VCRequest>jsonwebtoken.decode(jwt);
  return {
    vcRequestType: decodedRequestData.prompt === "create" ? "issue" : "present",
    vcRequest: decodedRequestData,
  };
};

export const getVCTypeFromJWT = (jwt: string): string[] => {
  const vcData = <VCData>jsonwebtoken.decode(jwt);
  return vcData.vc.type;
};
