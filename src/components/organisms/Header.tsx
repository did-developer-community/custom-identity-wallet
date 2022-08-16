import { Flex } from "@chakra-ui/react";
import { Box, Icon, Link } from "@chakra-ui/react";
import { ChevronLeftIcon, HomeIcon, QrcodeIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React from "react";

interface HeaderProps {
  showHomeIcon?: boolean;
  showQrcodeIcon?: boolean;
  showBackIcon?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ showHomeIcon, showQrcodeIcon, showBackIcon }) => {
  const router = useRouter();
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
    </Flex>
  );
};
