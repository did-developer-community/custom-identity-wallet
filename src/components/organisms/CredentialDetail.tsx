import { Box } from "@chakra-ui/react";
import React from "react";

import { Card } from "../../types";
import { CredentialCard } from "../molecules/CredentialCard";

export interface CredentialDetailProps {
  card: Card;
}

export const CredentialDetail: React.FC<CredentialDetailProps> = ({ card }) => {
  return (
    <Box>
      <CredentialCard card={card} />
    </Box>
  );
};
