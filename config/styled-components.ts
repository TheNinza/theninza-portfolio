import styled, { DefaultTheme, createGlobalStyle } from "styled-components";

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
    text-decoration: none;
  }

  body {
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.textPrimary};
  }

  a {
    color: ${(props) => props.theme.colors.textPrimary};
  }


  /* Manually controlling autofill defaults */
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    -webkit-text-fill-color: white;
    box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

// common styles
export const SectionTitle = styled.h2`
  font-size: 7vw;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-left: auto;
  margin-right: auto;

  text-align: center;

  opacity: 0;

  .emphasisRedText {
    color: ${({ theme }) => theme.colors.lightRed};
  }

  .emphasisGreenText {
    color: ${({ theme }) => theme.colors.green};
  }

  .emphasisBlueText {
    color: ${({ theme }) => theme.colors.blue};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.xl}px) {
    font-size: 6.9vw;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    font-size: 10vw;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    font-size: 12vw;
  }
`;

export const GlassBox = styled.div`
  background: rgba(97, 149, 251, 0.07);
  backdrop-filter: blur(40px);
  border-radius: 26px;
  border: 1px solid white;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    padding: ${({ theme }) => theme.space.md} !important;
    border-radius: 16px;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding: ${({ theme }) => theme.space.sm} !important;
  }
`;

export const CardContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 26px;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    border-radius: 16px;
  }
`;

export const Blob = styled.div`
  position: absolute;
  border-radius: 50%;
  z-index: -10;
`;
