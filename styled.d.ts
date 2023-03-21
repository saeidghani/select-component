import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryLight: string;
      gray: string;
      grayDark: string;
      grayLight: string;
    };
  }
}
