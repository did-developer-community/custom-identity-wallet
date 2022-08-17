import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Container, Flex, Spacer, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

import { cleanVCRequest } from "../../lib/repository/vc";

export interface ResultProps {
  type: "issue" | "present" | "scanner";
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
              <Box paddingTop={10} paddingBottom={10}>
                <Text fontSize={20} fontWeight={"bold"} textAlign={"center"}>
                  Success!
                </Text>
              </Box>
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
              <Box paddingTop={10} paddingBottom={10}>
                <Text fontSize={20} fontWeight={"bold"} textAlign={"center"}>
                  Sorry...😢 <br />
                  Something went wrong.
                </Text>
                <Text fontSize={15} color="red" paddingTop={"5"}>
                  Error : {errorMessage}
                </Text>
              </Box>
            </Container>
          </Box>
        </>
      );
    }
  };

  return (
    <>
      <Box p={4}>
        <Box paddingTop={"18"} />
        {type === undefined ? (
          <Box paddingTop={"20"} paddingBottom={"15"}>
            <Center>
              <Spinner />
            </Center>
          </Box>
        ) : (
          <>
            <ResultDescription />
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
        )}
      </Box>
    </>
  );
};
