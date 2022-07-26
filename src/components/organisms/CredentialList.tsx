import { Box, Grid } from "@chakra-ui/react";
import React from "react";

import { Manifest } from "../../types";
import { CredentialSummery } from "./CredentialSummary";

export interface CredentialListProps {
  manifests: Manifest[];
}

export const CredentialList: React.FC<CredentialListProps> = ({ manifests }) => {
  return (
    <Grid gap={4}>
      {manifests.map((manifest) => {
        return (
          <Box key={manifest.display.contract} marginY={4} textAlign={"center"}>
            <CredentialSummery card={manifest.display.card} />
          </Box>
        );
      })}
    </Grid>
  );
};
