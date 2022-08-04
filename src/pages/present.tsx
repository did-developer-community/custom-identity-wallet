import React from "react";

import { PresentTemplate } from "../components/templates/Present";
import { LOCAL_STORAGE_VC_REQUEST_KEY } from "../configs/constants";
import { LOAD_REQUEST_PAGE_PATH } from "../configs/routing";
import { VCRequest } from "../types";

const PresentPage: React.FC = () => {
  const [vcRequest, setVcRequest] = React.useState<VCRequest>();

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
      setVcRequest(vcRequest);
    })();
  }, []);
  return <PresentTemplate vcRequest={vcRequest} />;
};

export default PresentPage;
