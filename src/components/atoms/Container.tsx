import { Box } from "@chakra-ui/react";
import React from "react";

export interface ContainerProps {
  children: React.ReactNode;
  py: string;
}

export const Container: React.FC<ContainerProps> = ({ children, py }) => {
  return <Box py={py}>{children}</Box>;
};
