import React from "react";

import { Body } from "../atoms/Body";
import { Container } from "../atoms/Container";
import { CredentialDetail } from "../organisms/CredentialDetail";
import { Header } from "../organisms/Header";

export const CredentialDetailTemplate: React.FC = () => {
  return (
    <Body>
      <Header showBackIcon showDeleteIcon />
      <Container py="0">
        <CredentialDetail />
      </Container>
    </Body>
  );
};
