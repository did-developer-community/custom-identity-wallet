import ION from "@decentralized-identity/ion-tools";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

import { LOCAL_STORAGE_VC_REQUEST_KEY } from "../../configs/constants";
import { proxyHttpRequest } from "../../lib/http";
import {
  getProtectedHeaderFromVCRequest,
  getRequestFromVCRequest,
  getRequestUrlFromQRCodeMessage,
} from "../../lib/utils";

const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false }) as any;

export const Scanner: React.FC = () => {
  const [isProcessing, setIsProcessing] = React.useState(false);

  const router = useRouter();

  const handleQrReaderScanned = async (message) => {
    if (!message || isProcessing) {
      return;
    }
    setIsProcessing(true);
    const requestUrl = getRequestUrlFromQRCodeMessage(message);
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
          destination: "/",
          permanent: false,
        },
      };
    }

    const { vcRequestType, vcRequest } = getRequestFromVCRequest(vcRequestInJwt);

    localStorage.setItem(LOCAL_STORAGE_VC_REQUEST_KEY, JSON.stringify(vcRequest));

    router.push(`/${vcRequestType}`);
  };

  const handleQrReaderError = (err) => {
    console.error(err);
  };

  return <QrReader onError={handleQrReaderError} onScan={handleQrReaderScanned} />;
};
