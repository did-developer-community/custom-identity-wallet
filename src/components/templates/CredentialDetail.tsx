import React from "react";

import { StoredVC } from "../../lib/repository/vc";
import { Body } from "../atoms/Body";
import { Container } from "../atoms/Container";
import { CredentialDetail } from "../organisms/CredentialDetail";
import { Header } from "../organisms/Header";

interface CredentialDetailProps {
  storedVC: StoredVC;
}

export const CredentialDetailTemplate: React.FC<CredentialDetailProps> = ({ storedVC }) => {
  return (
    <Body>
      <Header showBackIcon={true} />
      <Container py="0">{storedVC && <CredentialDetail storedVC={storedVC} />}</Container>
    </Body>
  );
};
