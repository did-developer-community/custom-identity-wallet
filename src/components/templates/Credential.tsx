import React from "react";

import { Card } from "../../types";
import { Body } from "../atoms/Body";
import { Container } from "../atoms/Container";
import { CredentialDetail } from "../organisms/CredentialDetail";
import { Header } from "../organisms/Header";

export interface CredentialTemplateProps {
  card: Card;
}

export const CredentialTemplate: React.FC<CredentialTemplateProps> = ({ card }) => {
  return (
    <Body>
      <Header />
      <Container py="0">
        <CredentialDetail card={card} />
      </Container>
    </Body>
  );
};
