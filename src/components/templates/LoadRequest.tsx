import React from "react";

import { Body } from "../atoms/Body";
import { Container } from "../atoms/Container";
import { Header } from "../organisms/Header";
import { LoadRequest } from "../organisms/LoadRequest";

export const LoadRequestTemplate: React.FC = () => {
  return (
    <Body>
      <Header />
      <Container py="0">
        <LoadRequest />
      </Container>
    </Body>
  );
};
