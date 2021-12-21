import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import HeroLoader from "../components/hero-loader";

import { GlobalStyles, theme } from "../config/styled-components";
import { WindowLoadingProvider } from "../context/windowLoadingContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div style={{ position: "relative" }}>
      <WindowLoadingProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <HeroLoader />
          <Component {...pageProps} />
        </ThemeProvider>
      </WindowLoadingProvider>
    </div>
  );
}

export default MyApp;
