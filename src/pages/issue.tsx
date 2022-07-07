import axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";

import { IssueTemplate } from "../components/templates/Issue";
import { LOCAL_STORAGE_VC_REQUEST_KEY } from "../configs/constants";
import { getAndRefreshAuthorizationContext } from "../lib/oidc";
import { AcquiredIdToken, Manifest, VCRequest } from "../types";

interface IssuePageProps {
  queryCode: string | string[] | null;
  queryState: string | string[] | null;
}

const IssuePage: React.FC<IssuePageProps> = ({ queryCode, queryState }) => {
  const [vcRequest, setVcRequest] = React.useState<VCRequest>();
  const [manifest, setManifest] = React.useState<Manifest>();
  const [acquiredAttestation, setAcquiredAttestation] = React.useState<AcquiredIdToken>();

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
      const { idTokenKey, idTokenState, codeVerifier } = getAndRefreshAuthorizationContext();

      const manifestUrl = vcRequest.presentation_definition.input_descriptors[0].issuance[0].manifest;
      const manifestResponse = await axios.get<Manifest>(manifestUrl);
      const manifest = manifestResponse.data;

      const acquiredAttestation = {};

      // TODO: ここの部分の分岐を整理する
      // redirect from the external authorization server
      if (queryCode) {
        if (!queryState || queryState !== idTokenState) {
          return {
            redirect: {
              destination: "/scanner",
              permanent: false,
            },
          };
        }
        const openIdConfig = await axios.get(idTokenKey).then((resp) => resp.data as any);
        const idToken = await axios
          .get(
            `${openIdConfig.token_endpoint}&grant_type=authorization_code&code=${queryCode}&code_verifier=${codeVerifier}&client_id=${manifest.input.attestations.idTokens[0].client_id}`
          )
          .then((resp) => resp.data);
        acquiredAttestation[idTokenKey] = idToken;
        console.log(acquiredAttestation);
      }

      // id_token_hint
      if (vcRequest.id_token_hint) {
        acquiredAttestation["idTokens"] = { "https://self-issued.me": vcRequest.id_token_hint };
      }

      setVcRequest(vcRequest);
      setManifest(manifest);
      setAcquiredAttestation(acquiredAttestation);
    })();
  }, [queryCode, queryState]);
  return <IssueTemplate vcRequest={vcRequest} manifest={manifest} acquiredAttestation={acquiredAttestation} />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryCode = ctx.query.code ? ctx.query.code : null;
  const queryState = ctx.query.state ? ctx.query.state : null;
  return {
    props: {
      queryCode,
      queryState,
    },
  };
};

export default IssuePage;
