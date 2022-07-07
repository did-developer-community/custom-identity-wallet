import { Box } from "@chakra-ui/react";
import React from "react";

import { Body } from "../atoms/Body";
import { Container } from "../atoms/Container";
import { CreateKey } from "../organisms/CreateKey";

export const CreateKeyTemplate: React.FC = () => {
  return (
    <Body>
      <Box bg="blue.400" h={12} p={4} alignItems="center"></Box>
      <Container py="0">
        <CreateKey />
      </Container>
    </Body>
  );
};
