import React from "react";

import { Body } from "../atoms/Body";
import { Container } from "../atoms/Container";
import { Header } from "../organisms/Header";
import { Scanner } from "../organisms/Scanner";

export const ScannerTemplate: React.FC = () => {
  return (
    <Body>
      <Header showHomeIcon={true} />
      <Container py="8">
        <Scanner />
      </Container>
    </Body>
  );
};
