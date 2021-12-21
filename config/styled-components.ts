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

  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    xxl: "1.5rem",
  },

  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
  },

  lineHeights: {
    xs: 1.25,
    sm: 1.5,
    md: 1.75,
    lg: 2,
    xl: 2.25,
    xxl: 2.5,
  },

  space: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },

  radii: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },

  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1600,
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
