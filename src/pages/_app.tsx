import { Layout } from "@/components/@layouts/Layout";
import "@/styles/globals.css";
import NextNProgress from "nextjs-progressbar";

import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout {...pageProps}>
      <NextNProgress color="#000" height={1} />
      <Component {...pageProps} />
    </Layout>
  );
}
