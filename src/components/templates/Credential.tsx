import React from "react";

import { Manifest } from "../../types";
import { Body } from "../atoms/Body";
import { Container } from "../atoms/Container";
import { CredentialDetail } from "../organisms/CredentialDetail";
import { Header } from "../organisms/Header";

export interface CredentialTemplateProps {
  manifest: Manifest;
}

export const CredentialTemplate: React.FC<CredentialTemplateProps> = ({ manifest }) => {
  return (
    <Body>
      <Header />
      <Container py="0">
        <CredentialDetail manifest={manifest} />
      </Container>
    </Body>
  );
};
