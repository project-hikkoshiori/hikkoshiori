import "../styles/globals.css";
import type { AppProps } from "next/app";
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
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
