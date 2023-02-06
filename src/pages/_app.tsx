import { Layout } from "@/components/@layouts/Layout";
import "@/styles/globals.css";

import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}
