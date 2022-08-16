import React from "react";

import { Body } from "../atoms/Body";
import { Container } from "../atoms/Container";
import { CreateKey } from "../organisms/CreateKey";
import { Header } from "../organisms/Header";

export const CreateKeyTemplate: React.FC = () => {
  return (
    <Body>
      <Header />
      <Container py="0">
        <CreateKey />
      </Container>
    </Body>
  );
};
