import type { AppProps } from "next/app";
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
    </>
  );
}

export default MyApp;
