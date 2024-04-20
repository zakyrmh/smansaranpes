import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Layout from "@/components/layouts/root";

export default function App({
  Component,
  pageProps: { session, pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
