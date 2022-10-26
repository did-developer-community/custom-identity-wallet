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
import React, { useEffect, useState } from "react";

import { getVCsByType } from "../../lib/repository/vc";
import { VCRequest } from "../../types";
import { CredentialCard } from "./CredentialCard";

export interface SelectVCProps {
  vcRequest: VCRequest;
  presentationVCIDs: string[];
  setPresentationVCIDs: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SelectVC: React.FC<SelectVCProps> = ({ vcRequest, presentationVCIDs, setPresentationVCIDs }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedVCType, setSelectedVCType] = React.useState("");
  const [isVCTypeSelected, setIsVCTypeSelected] = React.useState<{ [key: string]: boolean }>({});

  const [vcs, setVCS] = useState<any>({});

  const hundleClick = (vcID: string) => {
    const target = vcID;
    const key = selectedVCType;
    if (presentationVCIDs.includes(target)) {
      console.log(presentationVCIDs);
      console.log(presentationVCIDs.filter((id) => id !== target));
      setPresentationVCIDs(presentationVCIDs.filter((id) => id !== target));
      isVCTypeSelected[key] = false;
      setIsVCTypeSelected(isVCTypeSelected);
    } else {
      console.log("debug");
      setPresentationVCIDs([...presentationVCIDs, target]);
      setIsVCTypeSelected({ ...isVCTypeSelected, [key]: true });
    }
  };

  const selectVCType = (id: string) => {
    setSelectedVCType(id);
    onOpen();
  };

  useEffect(() => {
    if (!selectedVCType) {
      return;
    }
    const vcs = getVCsByType(selectedVCType);
    setVCS(vcs);
  }, [selectedVCType]);

  return (
    <>
      {vcRequest.claims.vp_token.presentation_definition.input_descriptors.map((requiredVC, i) => {
        return (
          <div key={i}>
            <Flex
              bg={"blue.50"}
              py="6"
              px="4"
              cursor={"pointer"}
              justifyContent="space-between"
              alignItems="center"
              onClick={() => selectVCType(requiredVC.id)}
            >
              <Box>
                <Text fontSize="lg" fontWeight="bold">
                  {isVCTypeSelected[requiredVC.id] ? "" : "Select Credential"}
                </Text>
                <Text color={"red.500"} fontWeight="bold">
                  [{requiredVC.id}]
                  {isVCTypeSelected[requiredVC.id] && <Icon w="4" h="4" color="green.400" as={BadgeCheckIcon} />}
                </Text>
              </Box>
              {<Icon w="4" h="4" as={ChevronRightIcon} />}
            </Flex>
          </div>
        );
      })}
      <Drawer size={"full"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Select Credential</DrawerHeader>
          <DrawerBody>
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
                      {presentationVCIDs.includes(vcID) && <Icon w="4" h="4" color="green.400" as={CheckIcon} />}
                    </Box>
                  </ListItem>
                );
              })}
            </List>
            <Button onClick={onClose}>Save</Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
