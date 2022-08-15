import type { AppProps } from "next/app";
import Head from "next/head";

import { AppWrapper } from "../components/utils/AppWrapper";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Identity Wallet</title>
      </Head>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </>
  );
};
export default MyApp;
