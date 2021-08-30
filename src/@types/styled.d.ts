/* eslint-disable @typescript-eslint/no-empty-interface */
import 'styled-components';
import theme from '../global/styles/theme';

declare module 'styled-components' {
  export type ThemeType = typeof theme;

  export interface DefaultTheme extends ThemeType {}
}
