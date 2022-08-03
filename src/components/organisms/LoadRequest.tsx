import { Box, Button, Input, InputGroup, Text } from "@chakra-ui/react";
import ION from "@decentralized-identity/ion-tools";
import { useRouter } from "next/router";
import React from "react";

import { LOCAL_STORAGE_VC_REQUEST_KEY } from "../../configs/constants";
import { INDEX_PAGE_PATH, ISSUE_PAGE_PATH, PRESENT_PAGE_PATH } from "../../configs/routing";
import { proxyHttpRequest } from "../../lib/http";
import { getProtectedHeaderFromVCRequest, getRequestFromVCRequest, getRequestUrlFromMessage } from "../../lib/utils";

export const LoadRequest: React.FC = () => {
  const [redirectUrl, setRedirectUrl] = React.useState("");
  const router = useRouter();

  const handleRequest = async () => {
    const requestUrl = getRequestUrlFromMessage(redirectUrl);
    const vcRequestInJwt = await proxyHttpRequest<string>("get", requestUrl);

    /**
     * TODO: エラー発生時にエラーページに遷移する
     */
    const header = getProtectedHeaderFromVCRequest(vcRequestInJwt);
    const issDIDDocument = await ION.resolve(header.kid);
    const vcRequestVerified = await ION.verifyJws({
      jws: vcRequestInJwt,
      publicJwk: issDIDDocument.didDocument.verificationMethod[0].publicKeyJwk,
    });
    if (!vcRequestVerified) {
      return {
        redirect: {
          destination: INDEX_PAGE_PATH,
          permanent: false,
        },
      };
    }

    const { vcRequestType, vcRequest } = getRequestFromVCRequest(vcRequestInJwt);

    localStorage.setItem(LOCAL_STORAGE_VC_REQUEST_KEY, JSON.stringify(vcRequest));
    router.push(vcRequestType == "issue" ? ISSUE_PAGE_PATH : PRESENT_PAGE_PATH);
  };
  return (
    <>
      <Text textAlign="center" fontSize="3xl" fontWeight="bold">
        Input Request URL
      </Text>
      <Box p={"5"}>
        <Text>Request URL</Text>
        <InputGroup size="md">
          <Input pr="4.5rem" placeholder="Enter Request URL" onChange={(e) => setRedirectUrl(e.target.value)} />
        </InputGroup>
        <Box paddingTop={"12"}>
          <Button
            width={"100%"}
            rounded={"2xl"}
            colorScheme="blue"
            onClick={async () => {
              await handleRequest();
            }}
          >
            Request
          </Button>
        </Box>
      </Box>
    </>
  );
};
