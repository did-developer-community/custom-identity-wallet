import { Grid } from "@chakra-ui/react";
import React from "react";

import { Card } from "../../types";
import { CredentialCard } from "../molecules/CredentialCard";

export interface CredentialListProps {
  cards: Card[];
}

export const CredentialList: React.FC<CredentialListProps> = ({ cards }) => {
  return (
    <Grid gap={4}>
      {cards.map((card, i) => {
        return <CredentialCard key={i} card={card} />;
      })}
    </Grid>
  );
};
