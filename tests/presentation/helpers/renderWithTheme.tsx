import React, { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { RenderOptions, render } from '@testing-library/react-native';
import { lightTheme } from '../../../src/presentation/theme/theme';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: typeof lightTheme;
}

export function renderWithTheme(
  ui: ReactElement,
  { theme = lightTheme, ...renderOptions }: CustomRenderOptions = {},
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react-native';
