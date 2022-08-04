import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  List,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BadgeCheckIcon, CheckIcon, ChevronRightIcon } from "@heroicons/react/outline";
import React from "react";

import { getVCsByType, StoredVC } from "../../lib/repository/vc";
import { Manifest } from "../../types";
import { CredentialCard } from "./CredentialCard";

export interface SelectVCProps {
  manifest: Manifest;
  presentationVCID: string[];
  setPresentationVCID: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SelectVC: React.FC<SelectVCProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVC, setSelectedVC] = React.useState<StoredVC>();

  const SelectiveVC = (props: {
    requiredVC: { credentialType: string };
    setPresentationVCID: React.Dispatch<React.SetStateAction<string[]>>;
    presentationVCID: string[];
  }) => {
    // typeに当てはまるVCを抽出
    const vcs = getVCsByType(props.requiredVC.credentialType);
    const hundleClick = (vcID: string) => {
      if (props.presentationVCID.includes(vcID)) {
        props.setPresentationVCID(props.presentationVCID.filter((id) => id !== vcID));
        setSelectedVC(undefined);
      } else {
        props.setPresentationVCID([...props.presentationVCID, vcID]);
        setSelectedVC(vcs[vcID]);
      }
    };
    return (
      <>
        <List>
          {Object.keys(vcs).map((vcID, index) => {
            const storedVC = vcs[vcID];
            return (
              <ListItem key={index}>
                <Box
                  onClick={() => {
                    hundleClick(vcID);
                  }}
                >
                  <CredentialCard storedVC={storedVC} />
                  {props.presentationVCID.includes(vcID) && <Icon w="4" h="4" color="green.400" as={CheckIcon} />}
                </Box>
              </ListItem>
            );
          })}
        </List>
      </>
    );
  };

  return (
    <>
      {props.manifest.input.attestations.presentations != undefined ? (
        props.manifest.input.attestations.presentations.map((requiredVC, i) => {
          return (
            <div key={i}>
              <Flex
                bg={"blue.50"}
                py="6"
                px="4"
                cursor={"pointer"}
                justifyContent="space-between"
                alignItems="center"
                onClick={onOpen}
              >
                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    {selectedVC ? "" : "Select Credential"}
                  </Text>
                  <Text color={"red.500"} fontWeight="bold">
                    [{requiredVC.credentialType}]
                    {selectedVC && <Icon w="4" h="4" color="green.400" as={BadgeCheckIcon} />}
                  </Text>
                </Box>
                {<Icon w="4" h="4" as={ChevronRightIcon} />}
              </Flex>
              <Drawer size={"full"} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerHeader borderBottomWidth="1px">Select Credential</DrawerHeader>
                  <DrawerBody>
                    <SelectiveVC
                      requiredVC={requiredVC}
                      presentationVCID={props.presentationVCID}
                      setPresentationVCID={props.setPresentationVCID}
                    />
                    <Button onClick={onClose}>Save</Button>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};
