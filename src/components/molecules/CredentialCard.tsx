import { Box, Flex, FlexProps, Image, Text } from "@chakra-ui/react";
import React from "react";

import { Manifest } from "../../types";

export interface CredentialCardProps {
  manifest: Manifest;
}

export const CredentialCard: React.FC<CredentialCardProps> = ({ manifest }) => {
  const { card, claims } = manifest.display;

  return (
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
  );
};
