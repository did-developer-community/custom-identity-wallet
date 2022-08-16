import { Box, Grid } from "@chakra-ui/react";
import React from "react";

import { StoredVC } from "../../lib/repository/vc";
import { CredentialCard } from "../molecules/CredentialCard";

export interface CredentialListProps {
  storedVCs: StoredVC[];
}

export const CredentialList: React.FC<CredentialListProps> = ({ storedVCs }) => {
  return (
    <Grid gap={4}>
      {storedVCs.map((storedVC) => {
        return (
          <Box key={storedVC.manifest.display.contract}>
            <Box
              cursor={"pointer"}
              _hover={{ opacity: 0.9, transition: "0.2s" }}
              onClick={() => {
                // TODO: CredentialDetailに遷移する
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
