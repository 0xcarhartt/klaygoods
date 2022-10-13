import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme, Fade } from "@chakra-ui/react";

import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

const alchemyId = process.env.ALCHEMY_ID;

const client = createClient(
  getDefaultClient({
    appName: "Your App Name",
    alchemyId,
  })
);

/* Theming */
const theme = extendTheme({
  styles: {
    global: {
      "*": {
        fontFamily: "Space Grotesk",
        color: "black",
      },
      a: {
        _hover: {
          textDecoration: "underline",
        },
      },
      h1: {
        fontSize: "4xl",
        fontWeight: "bold",
      },
      h2: {
        fontSize: "2xl",
        fontWeight: "bold",
      },
      h3: {
        fontSize: "lg",
      },
      h4: {
        fontSize: "md",
      },
    },
  },
});

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="soft">
        <ChakraProvider theme={theme}>
          <Navbar />
          <Fade key={router.route} in>
            <Component {...pageProps} />
          </Fade>
          <Footer />
        </ChakraProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
