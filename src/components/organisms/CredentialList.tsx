import { Box, Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

import { StoredVC } from "../../lib/repository/vc";
import { CredentialCard } from "../molecules/CredentialCard";

export interface CredentialListProps {
  storedVCs: StoredVC[];
}

export const CredentialList: React.FC<CredentialListProps> = ({ storedVCs }) => {
  const router = useRouter();
  return (
    <Grid gap={4}>
      {storedVCs.map((storedVC) => {
        return (
          <Box key={storedVC.manifest.display.contract}>
            <Box
              onClick={() => {
                router.push(`/credentialDetail/${storedVC.id}`);
              }}
            >
              <CredentialCard storedVC={storedVC} />
            </Box>
          </Box>
        );
      })}
    </Grid>
  );
};

export default CredentialList;
