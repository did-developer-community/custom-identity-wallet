import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

import { Card } from "../../types";

export interface CredentialCardProps {
  card: Card;
}

export const CredentialCard: React.FC<CredentialCardProps> = ({ card }) => {
  return (
    <Box bg={card.backgroundColor} rounded="2xl">
      <Flex p="6" mb="16" justifyContent="space-between" alignItems="center">
        <Image h="12" w="12" src={card.logo.uri} alt={card.logo.description} />
        <Text fontSize="xl" color={card.textColor}>
          {card.title}
        </Text>
      </Flex>
      <Flex p="6" justifyContent="space-between" alignItems="center">
        <Text fontSize="lg" color={card.textColor}>
          {card.issuedBy}
        </Text>
      </Flex>
    </Box>
  );
};
