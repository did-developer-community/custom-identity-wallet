import { Box } from "@chakra-ui/react";
import React from "react";

import { StoredVC } from "../../lib/repository/vc";
import { Body } from "../atoms/Body";
import { Container } from "../atoms/Container";
import { CredentialList } from "../organisms/CredentialList";
import { Header } from "../organisms/Header";

export interface HomeTemplateProps {
  storedVCs: StoredVC[];
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({ storedVCs }) => {
  return (
    <Body>
      <Header />
      <Container py="8">
        <Box px="4">
          <CredentialList storedVCs={storedVCs} />
        </Box>
      </Container>
    </Body>
  );
};
