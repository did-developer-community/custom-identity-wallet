import { Box, Center, Spinner } from "@chakra-ui/react";
import ION from "@decentralized-identity/ion-tools";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { LOCAL_STORAGE_VC_REQUEST_KEY } from "../../configs/constants";
import { proxyHttpRequest } from "../../lib/http";
import { getProtectedHeaderFromVCRequest, getRequestFromVCRequest, getRequestUrlFromUrlMessage } from "../../lib/utils";

export const Redirect: React.FC = () => {
  const router = useRouter();
  const { url } = router.query;

  useEffect(() => {
    if (router && url) {
      (async () => {
        console.log("url", url);
        const requestUrl = getRequestUrlFromUrlMessage(url as string);
        console.log("requestUrl: " + requestUrl);
        let vcRequestInJwt = "";
        let vcRequestVerified = "";
        try {
          vcRequestInJwt = await proxyHttpRequest<string>("get", requestUrl);
          const header = getProtectedHeaderFromVCRequest(vcRequestInJwt);
          const issDIDDocument = await ION.resolve(header.kid);
          vcRequestVerified = await ION.verifyJws({
            jws: vcRequestInJwt,
            publicJwk: issDIDDocument.didDocument.verificationMethod[0].publicKeyJwk,
          });
        } catch (e) {
          router.push({
            pathname: "/result",
            query: { type: "scanner", result: "false", errorMessage: "This URL is not suitable" },
          });
        }

        if (!vcRequestVerified) {
          return {
            redirect: {
              destination: "/",
              permanent: false,
            },
          };
        }

        const { vcRequestType, vcRequest } = getRequestFromVCRequest(vcRequestInJwt);

        localStorage.setItem(LOCAL_STORAGE_VC_REQUEST_KEY, JSON.stringify(vcRequest));

        router.push(`/${vcRequestType}`);
      })();
    }
  }, [router, url]);

  return (
    <>
      <Center>
        <Box>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Box>
      </Center>
    </>
  );
};
