import React from "react";

import { Manifest, VCRequest } from "../../types";
import { Body } from "../atoms/Body";
import { Container } from "../atoms/Container";
import { Header } from "../organisms/Header";
import { Present } from "../organisms/Present";

export interface PresentTemplateProps {
  vcRequest: VCRequest;
  manifest: Manifest;
}

export const PresentTemplate: React.FC<PresentTemplateProps> = ({ vcRequest, manifest }) => {
  return (
    <Body>
      <Header />
      <Container py="0">
        <Present manifest={manifest} vcRequest={vcRequest} />
      </Container>
    </Body>
  );
};
