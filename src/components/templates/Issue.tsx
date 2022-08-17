import React from "react";

import { AcquiredIdToken, Manifest, VCRequest } from "../../types";
import { Body } from "../atoms/Body";
import { Container } from "../atoms/Container";
import { Header } from "../organisms/Header";
import { Issue } from "../organisms/Issue";

export interface IssueTemplateProps {
  vcRequest: VCRequest;
  manifest: Manifest;
  acquiredAttestation: AcquiredIdToken;
}

export const IssueTemplate: React.FC<IssueTemplateProps> = ({ vcRequest, manifest, acquiredAttestation }) => {
  return (
    <Body>
      <Header showHomeIcon={true} />
      <Container py="0">
        <Issue vcRequest={vcRequest} manifest={manifest} acquiredAttestation={acquiredAttestation} />
      </Container>
    </Body>
  );
};
