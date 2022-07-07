import { Box } from "@chakra-ui/react";
import React from "react";

import { Manifest } from "../../types";
import { Body } from "../atoms/Body";
import { Container } from "../atoms/Container";
import { CredentialList } from "../organisms/CredentialList";
import { Header } from "../organisms/Header";

export interface HomeTemplateProps {
  manifests: Manifest[];
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({ manifests }) => {
  return (
    <Body>
      <Header />
      <Container py="8">
        <Box px="4">
          <CredentialList manifests={manifests} />
        </Box>
      </Container>
    </Body>
  );
};
