import axios from "axios";
import React from "react";

import { IssueTemplate } from "../components/templates/Issue";
import { LOCAL_STORAGE_VC_REQUEST_KEY } from "../configs/constants";
import { LOAD_REQUEST_PAGE_PATH } from "../configs/routing";
import { AcquiredIdToken, Manifest, VCRequest } from "../types";

const IssuePage: React.FC = () => {
  const [vcRequest, setVcRequest] = React.useState<VCRequest>();
  const [manifest, setManifest] = React.useState<Manifest>();
  const [acquiredAttestation, setAcquiredAttestation] = React.useState<AcquiredIdToken>();

  React.useEffect(() => {
    (async () => {
      const vcRequestString = localStorage.getItem(LOCAL_STORAGE_VC_REQUEST_KEY);
      if (!vcRequestString) {
        return {
          redirect: {
            destination: LOAD_REQUEST_PAGE_PATH,
            permanent: false,
          },
        };
      }
      const vcRequest = JSON.parse(vcRequestString);
      const manifestUrl = vcRequest.claims.vp_token.presentation_definition.input_descriptors[0].issuance[0].manifest;
      const manifestResponse = await axios.get<Manifest>(manifestUrl);
      const manifest = manifestResponse.data;

      const acquiredAttestation = {};

      // id_token_hint
      if (vcRequest.id_token_hint) {
        acquiredAttestation["idTokens"] = { "https://self-issued.me": vcRequest.id_token_hint };
      }

      setVcRequest(vcRequest);
      setManifest(manifest);
      setAcquiredAttestation(acquiredAttestation);
    })();
  }, []);
  return <IssueTemplate vcRequest={vcRequest} manifest={manifest} acquiredAttestation={acquiredAttestation} />;
};

export default IssuePage;
