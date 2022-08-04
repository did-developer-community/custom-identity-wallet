import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

import { CredentialCardProps } from "../molecules/CredentialCard";

export const SampleCustomCard: React.FC<CredentialCardProps> = ({ storedVC }) => {
  const { card } = storedVC.manifest.display;
  const credentialSubject = storedVC.credentialSubject;

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
        <Text>Sponser Name:{credentialSubject.displayName}</Text>
        <Text>Sponser Name:{credentialSubject.sponsorName}</Text>
      </Box>
      <Flex p="6" justifyContent="space-between" alignItems="center" margin={"0"}>
        <Text fontSize="lg" color={card.textColor}>
          {card.issuedBy}
        </Text>
      </Flex>
    </Box>
  );
};
