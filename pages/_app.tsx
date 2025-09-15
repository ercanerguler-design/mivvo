import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import "../styles.css";
import "../styles/globals.css";
import "../styles/register.css";
import "../styles/responsive.css";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
        <title>Mivvo AI - Yapay Zeka Destekli Araç Analizi</title>
        <meta name="description" content="VIN analizi, boya tespiti ve motor durumu kontrolü için %98.7 doğrulukla çalışan AI teknolojisi. Dakikalar içinde profesyonel ekspertiz raporu alın." />
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
