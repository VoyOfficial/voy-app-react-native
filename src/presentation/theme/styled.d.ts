import 'styled-components/native';
import { AppThemeShape } from './theme';

declare module 'styled-components/native' {
  export interface DefaultTheme extends AppThemeShape {}
}
