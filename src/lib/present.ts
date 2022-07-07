import axios from "axios";
import moment from "moment";
import qs from "querystring";

import { VCRequest } from "../types";
import { getVC } from "./repository/vc";
import { Signer } from "./signer";

interface Descriptor {
  id?: string;
  path?: string;
  encoding?: string;
  format?: string;
}

export const present = async (presentationVCID: string[], signer: Signer, vcRequest: VCRequest): Promise<void> => {
  const vcs = [];
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

  const vp = await signer.createVP(vcs, vcRequest.iss);

  // TODO: 動的に変更する
  const attestations = {
    presentations: { [vcRequest.presentation_definition.input_descriptors[0].id]: vp },
  };

  const verifyRequestIdToken = await signer.siop({
    aud: vcRequest.redirect_uri ? vcRequest.redirect_uri : vcRequest.client_id,
    nonce: vcRequest.nonce,
    state: vcRequest.state,
    attestations,
    presentation_submission: {
      descriptor_map,
    },
    nbf: moment().unix(),
  });
  await axios.post(
    vcRequest.redirect_uri ? vcRequest.redirect_uri : vcRequest.client_id,
    qs.stringify({
      id_token: verifyRequestIdToken,
      state: vcRequest.state,
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
};
