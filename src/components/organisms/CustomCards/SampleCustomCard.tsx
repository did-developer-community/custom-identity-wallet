import { Box, Flex, Image, Text } from "@chakra-ui/react";

const firstNameKey = "vc.credentialSubject.firstName";
const lastNameKey = "vc.credentialSubject.lastName";
const displayNameKey = "vc.credentialSubject.displayName";
const sponsorNameKey = "vc.credentialSubject.sponsorName";

import React from "react";

import { CredentialCardProps } from "../../molecules/CredentialCard";

const SampleCustomCard: React.FC<CredentialCardProps> = ({ manifest }) => {
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
            名前: {claims[lastNameKey].label} {claims[firstNameKey].label}
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
          <>表示名: {claims[displayNameKey].label}</>
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
          <>スポンサー: {claims[sponsorNameKey].label}</>
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

export default SampleCustomCard;
