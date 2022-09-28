import React from "react";

import { Body } from "../atoms/Body";
import { Container } from "../atoms/Container";
import { Header } from "../organisms/Header";
import { Redirect } from "../organisms/Redirect";

export const RedirectTemplate: React.FC = () => {
  return (
    <Body>
      <Header showHomeIcon={true} />
      <Container py="8">
        <Redirect />
      </Container>
    </Body>
  );
};
