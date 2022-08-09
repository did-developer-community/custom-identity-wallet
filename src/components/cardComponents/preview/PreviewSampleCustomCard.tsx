import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

import { PreviewCredentialCardProps } from "../../molecules/PreviewCredentialCard";

const fixtures = {
  displayName: "XXX XXX",
  sponsorName: "XXX XXX",
};

export const PreviewSampleCustomCard: React.FC<PreviewCredentialCardProps> = ({ manifest }) => {
  const { card } = manifest.display;

  // TODO: credentialSubjectのundifiened対策をする
  return (
    <Box bg={card.backgroundColor} border={"2px"} borderColor={"gray.100"} rounded="2xl">
      <Flex p="6" justifyContent="space-between" alignItems="center">
        <Image h="12" w="12" fit={"cover"} src={card.logo.uri} alt={card.logo.description} />
        <Text fontSize="xl" color={card.textColor}>
          {card.title}
        </Text>
      </Flex>
      <Box paddingLeft={"6"}>
        <Text>Sponser Name:{fixtures.displayName}</Text>
        <Text>Sponser Name:{fixtures.sponsorName}</Text>
      </Box>
      <Flex p="6" justifyContent="space-between" alignItems="center" margin={"0"}>
        <Text fontSize="lg" color={card.textColor}>
          {card.issuedBy}
        </Text>
      </Flex>
    </Box>
  );
};
