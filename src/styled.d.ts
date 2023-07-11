import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;
    cardBgColor: string;
    textColor: string;
    greyColor: string;
    accentColor: string;
    upwardColor: string;
    downwardColor: string;
  }
}