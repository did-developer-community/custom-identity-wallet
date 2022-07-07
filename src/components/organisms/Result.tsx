import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Container, Flex, Spacer, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

import { cleanVCRequest } from "../../lib/repository/vc";

export interface ResultProps {
  type: "issue" | "present";
  result: boolean;
  errorMessage: string | undefined;
}

export const Result: React.FC<ResultProps> = ({ type, result, errorMessage }) => {
  const router = useRouter();
  const ResultDescription = () => {
    if (result) {
      return (
        <>
          <Box>
            <Center>
              <CheckIcon w={20} h={20} color={"green.300"} />
            </Center>
            <Container>
              <Text fontSize={20} fontWeight={"bold"}>
                Success!
              </Text>
            </Container>
          </Box>
        </>
      );
    } else {
      return (
        <>
          <Box paddingTop={30} paddingBottom={30}>
            <Center>
              <CloseIcon w={20} h={20} color={"red.300"} />
            </Center>
            <Container maxW="2xl">
              <Text fontSize={"2xl"}>Error : {errorMessage}</Text>
            </Container>
          </Box>
        </>
      );
    }
  };

  return (
    <>
      {console.log(type)}
      {type === undefined ? (
        <>
          <Center>
            <Spinner />
          </Center>
        </>
      ) : (
        <ResultDescription />
      )}
      <Flex>
        <Spacer />
        <Button
          mr="4"
          colorScheme="blue"
          onClick={() => {
            cleanVCRequest();
            router.push("/");
          }}
        >
          OK
        </Button>
      </Flex>
    </>
  );
};
