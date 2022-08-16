import { Box } from "@chakra-ui/react";
import React from "react";

import { Body } from "../atoms/Body";
import { Container } from "../atoms/Container";
import { CredentialList } from "../organisms/CredentialList";
import { Header } from "../organisms/Header";

export const HomeTemplate: React.FC = () => {
  return (
    <Body>
      <Header />
      <Container py="8">
        <Box px="4">
          <CredentialList />
        </Box>
      </Container>
    </Body>
  );
};
