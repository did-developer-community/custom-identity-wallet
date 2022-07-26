import { Grid } from "@chakra-ui/react";
import React from "react";

import { Manifest } from "../../types";
import { CredentialSummery } from "./CredentialSummary";

export interface CredentialListProps {
  manifests: Manifest[];
}

export const CredentialList: React.FC<CredentialListProps> = ({ manifests }) => {
  return (
    <Grid gap={4}>
      {manifests.map((manifest, i) => {
        return <CredentialSummery key={i} card={manifest.display.card} />; // todo keyにindexはアンチパターン
      })}
    </Grid>
  );
};
