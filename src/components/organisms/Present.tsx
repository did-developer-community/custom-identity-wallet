import { Box, Button, Grid, Link, Modal, ModalContent, ModalOverlay, Progress, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { INDEX_PAGE_PATH, RESULT_PAGE_PATH } from "../../configs/routing";
import { present } from "../../lib/present";
import { Signer } from "../../lib/signer";
import { KeyPair } from "../../lib/signer";
import { VCRequest } from "../../types";
import { SelectVC } from "../molecules/PresentationSelectVC";
import { Unlock } from "./Unlock";

export interface PresentProps {
  vcRequest: VCRequest;
}

export const Present: React.FC<PresentProps> = ({ vcRequest }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [presentationVCID, setPresentationVCID] = React.useState<string[]>([]);

  const presentVC = async (keyPair: KeyPair) => {
    setIsLoading(true);
    /** VCにexchangeServiceがある場合 VC exchangeをする */
    const signer = new Signer();
    await signer.init(keyPair);
    try {
      await present(presentationVCID, signer, vcRequest);
      router.push(RESULT_PAGE_PATH + "?type=present&result=true");
    } catch (e) {
      router.push(RESULT_PAGE_PATH + "?type=present&result=false&errorMessage=" + e.message);
      console.log("ERROR: " + e.message);
    }
  };

  return (
    <Box>
      {isLoading ? <Progress size="xs" isIndeterminate /> : <Box paddingTop="4px"></Box>}
      <Box mb="8">
        <Text textAlign="center" fontSize="3xl" fontWeight="bold">
          New Permission Request
        </Text>
      </Box>
      <Box px="2" mb="8"></Box>
      <Box paddingBottom={3}>
        {vcRequest && (
          <SelectVC
            vcRequest={vcRequest}
            presentationVCID={presentationVCID}
            setPresentationVCID={setPresentationVCID}
          />
        )}
      </Box>

      <Box px="2">
        <Grid templateColumns="repeat(2, 1fr)" gap="4">
          <Link as={NextLink} href={INDEX_PAGE_PATH}>
            <>
              <Button>Cancel</Button>
            </>
          </Link>
          <Button
            onClick={onOpen}
            colorScheme="blue"
            disabled={
              vcRequest &&
              presentationVCID.length < vcRequest.claims.vp_token.presentation_definition.input_descriptors.length
            }
          >
            Submit
          </Button>
        </Grid>
      </Box>
      <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Unlock onUnlock={presentVC} />
        </ModalContent>
      </Modal>
    </Box>
  );
};
