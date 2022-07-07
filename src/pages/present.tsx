import axios from "axios";
import React from "react";

import { PresentTemplate } from "../components/templates/Present";
import { LOCAL_STORAGE_VC_REQUEST_KEY } from "../configs/constants";
import { Manifest, VCRequest } from "../types";

const PresentPage: React.FC = () => {
  const [manifest, setManifest] = React.useState<Manifest>();
  const [vcRequest, setVcRequest] = React.useState<VCRequest>();

  React.useEffect(() => {
    (async () => {
      const vcRequestString = localStorage.getItem(LOCAL_STORAGE_VC_REQUEST_KEY);
      if (!vcRequestString) {
        return {
          redirect: {
            destination: "/scanner",
            permanent: false,
          },
        };
      }
      const vcRequest = JSON.parse(vcRequestString);
      const manifestUrl = vcRequest.presentation_definition.input_descriptors[0].issuance[0].manifest;

      const manifestResponse = await axios.get(manifestUrl);
      const { data: manifest } = manifestResponse;
      setVcRequest(vcRequest);
      setManifest(manifest);
    })();
  }, []);
  return <PresentTemplate manifest={manifest} vcRequest={vcRequest} />;
};

export default PresentPage;
