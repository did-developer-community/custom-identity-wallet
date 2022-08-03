import { Box } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import { AppWrapper } from "../components/utils/AppWrapper";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Box width={"375px"} height={"600px"}>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </Box>
  );
};
export default MyApp;
