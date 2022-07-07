import React from "react";

import { Signer } from "../../../lib/signer";
import { SignerContext } from "./SignerContext";

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const SignerProvider: React.VFC<AuthProviderProps> = ({ children }) => {
  const [signer, setSigner] = React.useState<Signer>();
  const [isReady, setIsReady] = React.useState(false);

  return <SignerContext.Provider value={{ isReady, signer }}>{children}</SignerContext.Provider>;
};
