import { UnlockIcon, WarningIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import React from "react";

import { getKeyPair } from "../../lib/repository/keyPair";
import { KeyPair } from "../../lib/signer";

export interface UnlockProps {
  onUnlock: (key: KeyPair) => void;
}

export const Unlock: React.FC<UnlockProps> = ({ onUnlock }) => {
  const [show, setShow] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [inputError, setInputError] = React.useState("");
  const showSecret = () => setShow(!show);
  const unlock = async () => {
    try {
      const keyPair = await getKeyPair(password);
      onUnlock(keyPair);
    } catch (e) {
      setInputError("Wrong password");
    }
  };

  return (
    <>
      <Text m={"3"} textAlign="center" fontSize="3xl" fontWeight="bold">
        Unlock Your Wallet
      </Text>
      <Box p={"5"}>
        <Heading size={"md"} as="h1" marginBottom={1}>
          Password
        </Heading>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            isInvalid={inputError !== ""}
            onChange={(e) => setPassword(e.target.value)}
            autoCapitalize="current-password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={showSecret}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {inputError && (
          <Flex>
            <WarningIcon m={1} color={"red"}></WarningIcon>
            <Text color="red">{inputError}</Text>
          </Flex>
        )}
        <Box paddingTop={"5"}>
          <Button width={"100%"} rounded={"2xl"} colorScheme="blue" onClick={unlock}>
            <UnlockIcon m={1}></UnlockIcon>
            <Text m={1}>Unlock</Text>
          </Button>
        </Box>
      </Box>
    </>
  );
};
