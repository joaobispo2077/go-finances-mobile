import 'styled-components';
import theme from '../global/styles/theme';

declare module 'styled-components' {
  export type ThemeType = typeof theme;

   export interface DefaultTheme extends ThemeType {}
}
