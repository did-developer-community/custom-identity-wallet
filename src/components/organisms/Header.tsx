import { Flex } from "@chakra-ui/react";
import { Icon, Link } from "@chakra-ui/react";
import { HomeIcon, QrcodeIcon } from "@heroicons/react/outline";
import React from "react";

export const Header: React.FC = () => {
  return (
    <Flex bg="blue.400" h={12} p={4} justifyContent="space-between" alignItems="center">
      <Link href="/">
        <Icon color="white" w={6} h={6} as={HomeIcon} />
      </Link>
      <Link href="/scanner">
        <Icon color="white" w={6} h={6} as={QrcodeIcon} />
      </Link>
    </Flex>
  );
};
