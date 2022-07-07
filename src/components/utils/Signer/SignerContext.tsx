import { createContext } from "react";

import { Signer } from "../../../lib/signer";

export interface SignerContextProps {
  isReady: boolean;
  signer: Signer | undefined;
}

export const SignerContext = createContext<SignerContextProps>({
  isReady: false,
  signer: undefined,
});
