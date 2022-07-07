import axios from "axios";

import { AcquiredIdToken, Manifest, VCRequest } from "../types";
import { saveVC } from "./repository/vc";
import { getVC } from "./repository/vc";
import { Signer } from "./signer";
import { getVCTypeFromJWT } from "./utils";

interface Descriptor {
  id?: string;
  path?: string;
  encoding?: string;
  format?: string;
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
  presentationVCID: string[]
): Promise<void> => {
  const vcs = [];
  let attestations: any = { ...acquiredIdToken };

  const descriptor_map: [Descriptor?] = [];
  for (let i = 0; presentationVCID.length > i; i++) {
    // 選択したVCを抽出する
    const key = presentationVCID[i];
    const vc = getVC(key);
    vcs.push(vc.vc);
    descriptor_map.push({
      path: `$.attestations.presentations.${vcRequest.presentation_definition.input_descriptors[0].id}`,
      id: `${vcRequest.presentation_definition.input_descriptors[i].id}`,
      encoding: "base64Url",
      format: vc.format === "jwt_vc" ? "JWT" : "JSON-LD",
    });
  }
  if (vcs.length !== 0) {
    const vp = await signer.createVP(vcs, vcRequest.iss);
    // TODO: ここの部分のidの指定の仕方
    attestations = {
      ...attestations,
      presentations: { [manifest.input.attestations.presentations[0].credentialType]: vp },
    };
  }

  const issueRequestIdToken = await signer.siop({
    aud: manifest.input.credentialIssuer,
    contract: manifest.display.contract,
    attestations,
  });
  console.log(issueRequestIdToken);
  const issueResponse = await axios.post<string, IIssueResponse>(manifest.input.credentialIssuer, issueRequestIdToken, {
    headers: { "Content-Type": "text/plain" },
  });
  const vc = issueResponse.data.vc;
  const vcType = getVCTypeFromJWT(vc);

  // TODO: formatは動的に設定する
  saveVC(vcRequest.presentation_definition.input_descriptors[0].issuance[0].manifest, {
    format: "jwt_vc",
    vc: vc,
    manifest,
    type: vcType,
  });
  await axios.post(vcRequest.redirect_uri ? vcRequest.redirect_uri : vcRequest.client_id, {
    state: vcRequest.state,
    code: "issuance_successful",
  });
};
