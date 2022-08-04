import { Flex } from "@chakra-ui/react";
import { Icon, Link } from "@chakra-ui/react";
import { HomeIcon, PlusIcon } from "@heroicons/react/outline";
import React from "react";

import { INDEX_PAGE_PATH, LOAD_REQUEST_PAGE_PATH } from "../../configs/routing";

export const Header: React.FC = () => {
  return (
    <Flex bg="blue.400" h={12} p={4} justifyContent="space-between" alignItems="center">
      <Link href={INDEX_PAGE_PATH}>
        <Icon color="white" w={6} h={6} as={HomeIcon} />
      </Link>
      <Link href={LOAD_REQUEST_PAGE_PATH}>
        <Icon color="white" w={6} h={6} as={PlusIcon} />
      </Link>
    </Flex>
  );
};
