import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

import { CredentialCardProps } from "../molecules/CredentialCard";

export const PlainCard: React.FC<CredentialCardProps> = ({ storedVC, isSelected }) => {
  const { card } = storedVC.manifest.display;

  return (
    <Box position="relative" rounded="2xl">
      {isSelected && (
        <Box position="absolute" top="0" left="0" bottom="0" right="0" bg="gray.800" opacity="0.4" rounded="2xl"></Box>
      )}
      <Box
        bg={card.backgroundColor}
        border={"2px"}
        borderColor={"gray.100"}
        rounded="2xl"
        opacity={isSelected ? "0.7" : "1"}
      >
        <Flex p="6" mb="16" justifyContent="space-between" alignItems="center">
          <Image h="12" w="12" fit={"cover"} src={card.logo.uri} alt={card.logo.description} />
          <Text fontSize="xl" color={card.textColor}>
            {card.title}
          </Text>
        </Flex>
        <Flex p="6" justifyContent="space-between" alignItems="center" margin={"0"}>
          <Text fontSize="lg" color={card.textColor}>
            {card.issuedBy}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};
