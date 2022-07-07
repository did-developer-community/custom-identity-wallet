import type { AppProps } from "next/app";

import { AppWrapper } from "../components/utils/AppWrapper";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
};
export default MyApp;
