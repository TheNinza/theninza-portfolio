import type { AppProps } from "next/app";
import Script from "next/script";
import { ThemeProvider } from "styled-components";
import CustomCursor from "../components/custom-cursor";
import HeroLoader from "../components/hero-loader";

import { GlobalStyles, theme } from "../config/styled-components";
import RootContextProvider from "../context/root-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RootContextProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <CustomCursor />
          <HeroLoader />
          <Component {...pageProps} />
        </ThemeProvider>
      </RootContextProvider>

      {/* analytics */}
      <Script
        async
        defer
        data-website-id="94b02f9a-ba9d-4854-b180-e5f1e1bdc9b1"
        src="https://umami-analytics-beige.vercel.app/umami.js"
      ></Script>
    </>
  );
}

export default MyApp;
