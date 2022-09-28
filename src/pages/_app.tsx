import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { trpc } from "../utils/trpc";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default trpc.withTRPC(MyApp);
