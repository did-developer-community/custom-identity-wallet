import { Box } from "@chakra-ui/react";
import React from "react";

import { Manifest } from "../../types";
import { CredentialCard } from "../molecules/CredentialCard";
import EmployeeCard from "./CredentialCards/EmployeeCard";

export interface CredentialDetailProps {
  manifest: Manifest;
}

export const CredentialDetail: React.FC<CredentialDetailProps> = ({ manifest }) => {
  const renderSwitch = () => {
    switch (manifest.id) {
      case "sclvcdev02":
        return <EmployeeCard manifest={manifest} />;
      default:
        return <CredentialCard manifest={manifest} />;
    }
  };

  return <Box>{renderSwitch()}</Box>;
};
