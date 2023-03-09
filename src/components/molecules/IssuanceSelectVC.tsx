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

import { getVCsByType } from "../../lib/repository/vc";
import { RequiredPresentation } from "../../types";
import { CredentialCard } from "./CredentialCard";

export interface SelectVCProps {
  requiredVC: RequiredPresentation;
  presentationVCIDs: string[];
  setPresentationVCIDs: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SelectVC: React.FC<SelectVCProps> = ({ requiredVC, presentationVCIDs, setPresentationVCIDs }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSelected, setIsSelected] = React.useState(false);

  const SelectiveVC: React.FC<{ requiredVCID: string }> = ({ requiredVCID }) => {
    const vcs = getVCsByType(requiredVCID);
    const handleVCClick = (vcID: string) => {
      if (presentationVCIDs.includes(vcID)) {
        setPresentationVCIDs(presentationVCIDs.filter((id) => id !== vcID));
        setIsSelected(false);
      } else {
        setPresentationVCIDs([vcID]);
        setIsSelected(true);
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
                    handleVCClick(vcID);
                  }}
                >
                  <CredentialCard storedVC={storedVC} />
                  {presentationVCIDs.includes(vcID) && <Icon w="4" h="4" color="green.400" as={CheckIcon} />}
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
      <div>
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
              {isSelected ? "" : "Select Credential"}
            </Text>
            <Text color={"red.500"} fontWeight="bold">
              [{requiredVC.credentialType}]{isSelected && <Icon w="4" h="4" color="green.400" as={BadgeCheckIcon} />}
            </Text>
          </Box>
          {<Icon w="4" h="4" as={ChevronRightIcon} />}
        </Flex>
        <Drawer size={"full"} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Select Credential</DrawerHeader>
            <DrawerBody>
              <SelectiveVC requiredVCID={requiredVC.id} />
              <Button onClick={onClose}>Save</Button>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};
