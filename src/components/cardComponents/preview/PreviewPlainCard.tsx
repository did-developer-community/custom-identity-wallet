import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

import { Manifest } from "../../../types";

interface PreviewPlainCardProps {
  manifest: Manifest;
}

export const PreviewPlainCard: React.FC<PreviewPlainCardProps> = ({ manifest }) => {
  const { card } = manifest.display;

  return (
    <Box bg={card.backgroundColor} border={"2px"} borderColor={"gray.100"} rounded="2xl">
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
  );
};
