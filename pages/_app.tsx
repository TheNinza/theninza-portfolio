import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import CustomCursor from "../components/custom-cursor";
import HeroLoader from "../components/hero-loader";

import { GlobalStyles, theme } from "../config/styled-components";
import { WindowLoadingProvider } from "../context/window-loading-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div style={{ position: "relative" }}>
      <WindowLoadingProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <CustomCursor />
          <HeroLoader />
          <Component {...pageProps} />
        </ThemeProvider>
      </WindowLoadingProvider>
    </div>
  );
}

export default MyApp;
