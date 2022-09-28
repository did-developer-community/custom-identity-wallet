import jsonwebtoken from "jsonwebtoken";

import { QR_REQUEST_URI_KEY } from "../configs/constants";
import { Manifest, VCRequest } from "../types";

export type VCRequestType = "issue" | "present";

export interface JWTHeader {
  kid: string;
}

export interface VCData {
  vc: {
    type: string[];
    credentialSubject: Record<string, string>;
  };
}

export const getRequestUrlFromUrlMessage = (message: string): string => {
  const urlSearchParams = new URLSearchParams(message);
  const requestUrl = urlSearchParams.get(QR_REQUEST_URI_KEY);
  if (!requestUrl) {
    console.error("QR code does not contains request url");
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

export const decodeJWTToVCData = (jwt: string): VCData => {
  const vcData = <VCData>jsonwebtoken.decode(jwt);
  return vcData;
};

export const getManifestFromJWT = (jwt: string): Manifest => {
  return <Manifest>jsonwebtoken.decode(jwt);
};
