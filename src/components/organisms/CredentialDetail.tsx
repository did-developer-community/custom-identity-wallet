import { Box } from "@chakra-ui/react";
import React from "react";

import { Manifest } from "../../types";
import { CredentialCard } from "../molecules/CredentialCard";

export interface CredentialDetailProps {
  manifest: Manifest;
}

export const CredentialDetail: React.FC<CredentialDetailProps> = ({ manifest }) => {
  return (
    <Box>
      <CredentialCard manifest={manifest} />
    </Box>
  );
};
