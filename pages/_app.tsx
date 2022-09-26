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
        data-website-id="eaa1a3d5-2ef4-4c07-ae14-4ac201b97001"
        src="https://umami.theninza.me/umami.js"
      ></Script>
    </>
  );
}

export default MyApp;
