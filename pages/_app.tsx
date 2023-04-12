import { AppProps } from "next/app";
import Layout from "../components/layout";
import "../styles/index.css";
import Head from "next/head";
import Script from "next/script";

// import { GA_MEASUREMENT_ID } from "../lib/gtag";
import Router from "next/router";
import { useEffect } from "react";
import * as gtag from "../lib/gtag";

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    Router.events.on("routeChangeComplete", handleRouteChange);
  });

  return (
    <>
      <Head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtag.GA_MEASUREMENT_ID}');
        `,
          }}
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
