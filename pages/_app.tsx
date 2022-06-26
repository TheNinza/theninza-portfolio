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
        data-website-id="5ee58554-0585-4346-8dbc-1cbda88d65df"
        src="https://umami.theninza.me/umami.js"
      ></Script>
    </>
  );
}

export default MyApp;
