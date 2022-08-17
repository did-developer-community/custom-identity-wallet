import axios from "axios";
import qs from "querystring";
import { v4 as uuidv4 } from "uuid";

import { VCRequest } from "../types";
import { getVC } from "./repository/vc";
import { Signer } from "./signer";

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

export const present = async (presentationVCIDs: string[], signer: Signer, vcRequest: VCRequest): Promise<void> => {
  const vcs = [];
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

  const vp = await signer.createVP({
    vcs,
    verifierDID: vcRequest.client_id,
    nonce: vcRequest.nonce,
  });

  const _vp_token = {
    presentation_submission: {
      definition_id: vcRequest.claims.vp_token.presentation_definition.id,
      descriptor_map,
      id: uuidv4().toUpperCase(),
    },
  };

  const verifyRequestIdToken = await signer.siopV2({
    aud: vcRequest.client_id,
    nonce: vcRequest.nonce,
    _vp_token,
  });

  await axios.post(
    vcRequest.redirect_uri ? vcRequest.redirect_uri : vcRequest.client_id,
    qs.stringify({
      id_token: verifyRequestIdToken,
      vp_token: vp,
      state: vcRequest.state,
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
};
