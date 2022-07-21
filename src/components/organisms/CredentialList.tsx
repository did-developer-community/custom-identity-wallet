import { Grid } from "@chakra-ui/react";
import React from "react";

import { Manifest } from "../../types";
import { CredentialDetail } from "./CredentialDetail";

export interface CredentialListProps {
  manifests: Manifest[];
}

export const CredentialList: React.FC<CredentialListProps> = ({ manifests }) => {
  return (
    <Grid gap={4}>
      {manifests.map((manifest, i) => {
        return <CredentialDetail key={i} manifest={manifest} />; // todo keyにindexはアンチパターン
      })}
    </Grid>
  );
};
