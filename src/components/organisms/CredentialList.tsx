import { Grid } from "@chakra-ui/react";
import React from "react";

import { Manifest } from "../../types";
import { CredentialCard } from "../molecules/CredentialCard";

export interface CredentialListProps {
  manifests: Manifest[];
}

export const CredentialList: React.FC<CredentialListProps> = ({ manifests }) => {
  return (
    <Grid gap={4}>
      {manifests.map((manifest, i) => {
        return <CredentialCard key={i} manifest={manifest} />; // todo keyにindexはアンチパターン
      })}
    </Grid>
  );
};
