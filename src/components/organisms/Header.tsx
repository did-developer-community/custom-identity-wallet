import { Flex } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Icon,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronLeftIcon, HomeIcon, QrcodeIcon, TrashIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React from "react";

import { deleteVC } from "../../lib/repository/vc";

interface HeaderProps {
  showHomeIcon?: boolean;
  showQrcodeIcon?: boolean;
  showBackIcon?: boolean;
  showDeleteIcon?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ showHomeIcon, showQrcodeIcon, showBackIcon, showDeleteIcon }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  return (
    <Flex bg="blue.400" h={12} p={4} justifyContent="space-between" alignItems="center">
      {showHomeIcon && (
        <Link href="/">
          <Icon color="white" w={6} h={6} as={HomeIcon} />
        </Link>
      )}
      {showQrcodeIcon && (
        <Link href="/scanner">
          <Icon color="white" w={6} h={6} as={QrcodeIcon} />
        </Link>
      )}
      {showBackIcon && (
        <Box
          onClick={() => {
            router.back();
          }}
        >
          <Icon color="white" w={6} h={6} as={ChevronLeftIcon} />
        </Box>
      )}
      {showDeleteIcon && (
        <>
          <Box onClick={onOpen}>
            <Icon color="white" w={6} h={6} as={TrashIcon} />
          </Box>
          <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Credential
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? <br />
                  You can&apos;t undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      deleteVC(router.query.vcID as string);
                      router.push("/");
                    }}
                    ml={3}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </>
      )}
    </Flex>
  );
};
