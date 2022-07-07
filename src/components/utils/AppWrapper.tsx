import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

import { SignerProvider } from "./Signer/SignerProvider";

export interface AppWrapperProps {
  children: React.ReactNode;
}

export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  return (
    <ChakraProvider>
      <SignerProvider>{children}</SignerProvider>
    </ChakraProvider>
  );
};
