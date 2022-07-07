import { Box, Button, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import React from "react";

import { getKeyPair } from "../../lib/repository/keyPair";
import { KeyPair } from "../../lib/signer";

export interface UnlockProps {
  onUnlock: (key: KeyPair) => void;
}

export const Unlock: React.FC<UnlockProps> = ({ onUnlock }) => {
  const [show, setShow] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const showSecret = () => setShow(!show);
  const unlock = async () => {
    const keyPair = await getKeyPair(password);
    onUnlock(keyPair);
  };

  return (
    <>
      <Text textAlign="center" fontSize="3xl" fontWeight="bold">
        Unlock Your Wallet
      </Text>
      <Box p={"5"}>
        <Text>Password</Text>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            autoCapitalize="current-password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={showSecret}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Box paddingTop={"12"}>
          <Button width={"100%"} rounded={"2xl"} colorScheme="blue" onClick={unlock}>
            Unlock
          </Button>
        </Box>
      </Box>
    </>
  );
};
