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
      <Flex
        p={"6"}
        mb={"16"}
        justifyContent={"left"}
        alignItems={"center"}
        margin={"0"}
        paddingTop={"4px"}
        paddingBottom={"4px"}
      >
        <Text fontSize={"xl"} color={card.textColor}>
          <>
            名前: {claims["vc.credentialSubject.lastName"].label} {claims["vc.credentialSubject.firstName"].label}
          </>
        </Text>
      </Flex>
      <Flex
        p={"6"}
        mb={"16"}
        justifyContent={"left"}
        alignItems={"center"}
        margin={"0"}
        paddingTop={"4px"}
        paddingBottom={"4px"}
      >
        <Text fontSize={"xl"} color={card.textColor}>
          <>表示名: {claims["vc.credentialSubject.displayName"].label}</>
        </Text>
      </Flex>
      <Flex
        p={"6"}
        mb={"16"}
        justifyContent={"left"}
        alignItems={"center"}
        margin={"0"}
        paddingTop={"4px"}
        paddingBottom={"4px"}
      >
        <Text fontSize={"xl"} color={card.textColor}>
          <>スポンサー: {claims["vc.credentialSubject.sponsorName"].label}</>
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
