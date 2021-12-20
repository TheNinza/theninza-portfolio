import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      textPrimary: string;
      textSecondary: string;
      lightRed: string;
      green: string;
      blue: string;
    };
  }
}

// Above is the configuration to use typescript with styled-components.
