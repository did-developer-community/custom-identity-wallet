import React from "react";

import { SignerContext, SignerContextProps } from "../components/utils/Signer/SignerContext";

export const useSigner = (): SignerContextProps => {
  return React.useContext(SignerContext);
};
