import colors from './colors';
import { spacings, tokens } from './tokens';

export type ThemeMode = 'light' | 'dark';

const buildTheme = (mode: ThemeMode) => ({
  colors: colors(mode),
  tokens,
  spacings,
});

export const lightTheme = buildTheme('light');
export const darkTheme = buildTheme('dark');

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export type AppThemeShape = typeof lightTheme;
