import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

import { Card, Manifest } from "../../types";

export interface CredentialSummaryProps {
  card: Card;
}

export const CredentialSummery: React.FC<CredentialSummaryProps> = ({ card }) => {
  return (
    <Button
      onClick={() => {
        console.log("page transition to credential detail");
      }}
    >
      <Box bg={card.backgroundColor} rounded="2xl">
        <Flex
          p="6"
          mb="16"
          justifyContent="space-between"
          alignItems="center"
          margin={"0"}
          paddingTop={"4px"}
          paddingBottom={"4px"}
        >
          <Image h="12" w="12" src={card.logo.uri} alt={card.logo.description} />
          <Text fontSize="xl" color={card.textColor}>
            {card.title}
          </Text>
        </Flex>
      </Box>
    </Button>
  );
};
