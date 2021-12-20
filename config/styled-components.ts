import { DefaultTheme, createGlobalStyle } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    background: "#1A202C",
    textPrimary: "#FFFFFF",
    textSecondary: "#C4C4C4",
    lightRed: "#FE8C8C",
    green: "#1ECB89",
    blue: "#19BCDD",
  },
};

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
  }

  body {
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.textPrimary};
  }
`;
