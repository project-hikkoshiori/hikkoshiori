import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { Layout } from "../src/utils/layout";
import { SessionProvider } from "next-auth/react";

const colors = {
  brand: {
    900: "#9d295e",
    800: "#c23165",
    700: "#d83669",
    600: "#ef3b6e",
    500: "#ff4072",
    400: "#ff5687",
    300: "#ff739e",
    200: "#ff9bba",
    100: "#ffc2d5",
    50: "#ffe7ee",
  },
};
const font = {
  styles: {
    global: {
      body: {
        color: "#333",
      },
    },
  },
};

const theme = extendTheme({ colors, font });

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Head>
          <title>hikkoshiori</title>
          <meta
            property="description"
            content="一人暮らしを始めるあなたをお手伝いします。探した物件をまとめて記録したり、あなた好みのレイアウトを探したり、あなたの引越しに必要な手続きリストを作成したり。引っ越し資金の試算の試算もできます。さらに、一人暮らしの先輩からアドバイスをもらうことも。"
          />
          <link rel="icon" href="favicon.ico" type="image/x-icon" />
          <meta property="og:site_name" content="hikkoshiori" />
          <meta property="og:title" content="hikkoshiori" />
          <meta
            property="og:description"
            content="一人暮らしを始めるあなたをお手伝いします"
          />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="hikkoshiori" />
          <meta
            name="twitter:description"
            content="一人暮らしを始めるあなたをお手伝いします"
          />
        </Head>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
