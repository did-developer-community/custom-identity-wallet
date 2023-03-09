import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { AcquiredIdToken, Manifest, VCRequest } from "../types";
import { saveVC } from "./repository/vc";
import { getVC } from "./repository/vc";
import { Signer } from "./signer";
import { decodeJWTToVCData } from "./utils";

interface Descriptor {
  id?: string;
  path?: string;
  encoding?: string;
  format?: string;
  path_nested?: {
    id?: string;
    format?: string;
    path?: string;
  };
}

interface IIssueResponse {
  data: {
    vc: string;
  };
}

export const issue = async (
  signer: Signer,
  vcRequest: VCRequest,
  manifest: Manifest,
  acquiredIdToken: AcquiredIdToken,
  presentationVCIDs: string[],
  options?: { [key: string]: any }
): Promise<void> => {
  const vcs = [];
  let attestations: any = { ...acquiredIdToken };

  const descriptor_map: [Descriptor?] = [];
  for (let i = 0; presentationVCIDs.length > i; i++) {
    // 選択したVCを抽出する
    const key = presentationVCIDs[i];
    const vc = getVC(key);
    vcs.push(vc.vc);
    descriptor_map.push({
      path: `$`,
      id: `${vcRequest.claims.vp_token.presentation_definition.input_descriptors[i].id}`,
      format: vc.format === "jwt_vc" ? "jwt_vc" : "JSON-LD",
      path_nested: {
        id: `${vcRequest.claims.vp_token.presentation_definition.input_descriptors[i].id}`,
        format: vc.format === "jwt_vc" ? "jwt_vc" : "JSON-LD",
        path: `$.verifiableCredential[${i}]`,
      },
    });
  }
  if (vcs.length !== 0) {
    const vp = await signer.createVP({
      vcs,
      verifierDID: vcRequest.client_id,
      nonce: vcRequest.nonce,
    });

    // TODO: ここの部分のidの指定の仕方 credentialTypeなのかidなのか
    attestations = {
      ...attestations,
      presentations: { [manifest.input.attestations.presentations[0].credentialType]: vp },
    };
  }

  const issueRequestIdToken = await signer.siop({
    aud: manifest.input.credentialIssuer,
    contract: manifest.display.contract,
    attestations,
    pin: options?.pin,
  });

  const issueResponse = await axios.post<string, IIssueResponse>(manifest.input.credentialIssuer, issueRequestIdToken, {
    headers: { "Content-Type": "text/plain" },
  });
  const vc = issueResponse.data.vc;
  const vcDecodedData = decodeJWTToVCData(vc);

  // TODO: formatは動的に設定する
  // TODO: VCのIDは要検討
  const storedVCID = uuidv4().toUpperCase();
  saveVC(storedVCID, {
    id: storedVCID,
    format: "jwt_vc",
    vc: vc,
    manifest,
    type: vcDecodedData.vc.type,
    credentialSubject: vcDecodedData.vc.credentialSubject,
    vcHistory: [{ timestamp: Date.now(), message: "Certificate issued." }],
  });
  await axios.post(vcRequest.redirect_uri ? vcRequest.redirect_uri : vcRequest.client_id, {
    state: vcRequest.state,
    code: "issuance_successful",
  });
};
