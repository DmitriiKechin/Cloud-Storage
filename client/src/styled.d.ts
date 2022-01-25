import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      accent: string;
      darkPrimary: string;
      darkSecondary: string;
      lightPrimary: string;
      lightSecondary: string;
    };
    sizes: {
      wrapper: string;
    };
    media: {
      mobile: string;
      desktop: string;
    };
  }
}
