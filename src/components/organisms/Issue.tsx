import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Icon,
  Link,
  Modal,
  ModalContent,
  ModalOverlay,
  Progress,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { BadgeCheckIcon, ChevronRightIcon } from "@heroicons/react/outline";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

import { proxyHttpRequest } from "../../lib/http";
import { issue } from "../../lib/issue";
import { authorize } from "../../lib/oidc";
import { KeyPair, Signer } from "../../lib/signer";
import { AcquiredIdToken, IdTokenConfiguration, Manifest, RequiredToken, VCRequest } from "../../types";
import { CredentialCard } from "../molecules/CredentialCard";
import { SelectVC } from "../molecules/IssueanceSelectVC";
import { Unlock } from "./Unlock";
const PinInput = dynamic(() => import("react-pin-input"), { ssr: false });

export interface IssueProps {
  vcRequest: VCRequest;
  manifest: Manifest;
  acquiredAttestation: AcquiredIdToken;
}

// TODO: redirectUriを動的に設定する
// TODO: https://wallet-selmid.vercel.app/issueに変更
export const Issue: React.FC<IssueProps> = ({ vcRequest, manifest, acquiredAttestation }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [isLoading, setIsLoading] = React.useState(false);
  const [presentationVCID, setPresentationVCID] = React.useState<string[]>([]);
  const [pinStatus, setPinStatus] = React.useState<undefined | "success" | "no entered">(undefined);

  React.useEffect(() => {
    setPinStatus("no entered");
  }, [manifest]);

  const getIdToken = async (RequiredToken: RequiredToken) => {
    const idTokenConfigulation = await proxyHttpRequest<IdTokenConfiguration>("get", RequiredToken.configuration);
    const redirectUri = RequiredToken.redirect_uri ? RequiredToken.redirect_uri : "https://wallet-selmid.vercel.app";

    authorize({
      key: RequiredToken.configuration,
      authorizationEndpoint: idTokenConfigulation.authorization_endpoint,
      clientId: RequiredToken.client_id,
      redirectUri,
    });
  };

  const issueVC = async (keyPair: KeyPair) => {
    setIsLoading(true);
    const signer = new Signer();
    await signer.init(keyPair);
    try {
      await issue(signer, vcRequest, manifest, acquiredAttestation, presentationVCID);
      router.push({ pathname: "/result", query: { type: "issue", result: "true" } });
    } catch (e) {
      router.push({ pathname: "/result", query: { type: "issue", result: "false", errorMessage: e.message } });
      console.log(e);
    }
  };

  return (
    <Box>
      {isLoading ? <Progress size="xs" isIndeterminate /> : <Box paddingTop="4px"></Box>}
      <Box mb="8">
        <Text textAlign="center" fontSize="3xl" fontWeight="bold">
          Add a credential
        </Text>
      </Box>
      {manifest && acquiredAttestation ? (
        manifest &&
        acquiredAttestation && (
          <>
            <Box px="4" mb="8">
              <CredentialCard card={manifest.display.card} />
            </Box>
            <Box mb="8">
              {manifest.input.attestations.idTokens.map((idToken, i) => {
                const { host } = new URL(idToken.configuration);

                if (idToken.configuration === "https://self-issued.me") {
                  return <div key={i}></div>;
                }
                const fulfilled = acquiredAttestation && acquiredAttestation[idToken.configuration] !== undefined;
                const bg = fulfilled ? "gray.50" : "blue.50";
                const cursor = fulfilled ? undefined : "pointer";
                const onclick = fulfilled ? undefined : () => getIdToken(idToken);

                return (
                  <Flex
                    key={i}
                    bg={bg}
                    py="6"
                    px="4"
                    cursor={cursor}
                    justifyContent="space-between"
                    alignItems="center"
                    onClick={onclick}
                    _disabled={{ opacity: 0.6 }}
                    // TODO: Sign in が終わっていたらdisabledにする
                    // disabled={fulfilled}
                  >
                    <Box>
                      <Text fontSize="lg" fontWeight="bold">
                        Sign in to your account{" "}
                        {fulfilled && <Icon w="4" h="4" color="green.400" as={BadgeCheckIcon} />}
                      </Text>
                      <Text fontSize="sm">{host}</Text>
                    </Box>
                    {!fulfilled && <Icon w="4" h="4" as={ChevronRightIcon} />}
                  </Flex>
                );
              })}
            </Box>
            <Box paddingBottom={3}>
              {vcRequest && (
                <SelectVC
                  manifest={manifest}
                  presentationVCID={presentationVCID}
                  setPresentationVCID={setPresentationVCID}
                />
              )}
            </Box>
            {pinStatus && (
              <Box>
                <Text textAlign="center" fontSize="lg" fontWeight="bold">
                  Input Pin Code
                </Text>
                <Box p={3}>
                  <Center>
                    <PinInput
                      length={4}
                      initialValue=""
                      type="numeric"
                      inputMode="number"
                      onChange={(value, index) => {
                        // TODO: 動的にpin valueを設定する
                        if (value === "1234") {
                          setPinStatus("success");
                        } else {
                          setPinStatus("no entered");
                        }
                      }}
                    />
                  </Center>
                </Box>
              </Box>
            )}

            <Box px="4">
              <Grid templateColumns="repeat(2, 1fr)" gap="4">
                <Link href="/">
                  <Button w="100%">Cancel</Button>
                </Link>
                <Button
                  disabled={
                    Object.keys(acquiredAttestation).length < manifest.input.attestations.idTokens.length ||
                    pinStatus === "no entered"
                  }
                  onClick={onOpen}
                  colorScheme="blue"
                >
                  Submit
                </Button>
              </Grid>
            </Box>
          </>
        )
      ) : (
        <>
          <Center>
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl"></Spinner>
          </Center>
        </>
      )}
      <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Unlock onUnlock={issueVC} />
        </ModalContent>
      </Modal>
    </Box>
  );
};
