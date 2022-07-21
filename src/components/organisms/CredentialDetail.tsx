import { Box } from "@chakra-ui/react";
import React from "react";

import { Manifest } from "../../types";
import { CredentialCard } from "../molecules/CredentialCard";
import SampleCustomCard from "./CustomCards/SampleCustomCard";

export interface CredentialDetailProps {
  manifest: Manifest;
}

export const CredentialDetail: React.FC<CredentialDetailProps> = ({ manifest }) => {
  const renderSwitch = () => {
    switch (manifest.id) {
      case "sclvcdev02":
        return <SampleCustomCard manifest={manifest} />;
      default:
        return <CredentialCard manifest={manifest} />;
    }
  };

  return <Box>{renderSwitch()}</Box>;
};
