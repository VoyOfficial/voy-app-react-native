const colorsLight = {
  primary: {
    light: '#5742E0',
    dark: '#5452F6',
    contrast: '#FFFFFF',
    contrastLight: '#F8F8FF',
    text: '#212121',
    textLight: '#AEAEAE',
    textDark: '#E6E6FA',
  },
  secondary: {
    light: '#6C7B7F',
    dark: '#5A6B6F',
  },
  neutral: {
    0: '#FFFFFF',
    10: '#F8F9FA',
    20: '#F1F5F6',
    30: '#212121',
    40: '#9E9E9E',
    50: '#FFFFFF',
    60: '#E6E6E6',
    70: '#E6E6E6',
    80: '#424242',
    100: '#FFFFFF',
  },
};

const colorsDark = {
  primary: {
    light: '#6B68FF',
    dark: '#5452F6',
    contrast: '#FFFFFF',
    contrastLight: '#F8F8FF',
    text: '#FFFFFF',
    textLight: '#F8F8FF',
    textDark: '#E6E6FA',
  },
  secondary: {
    light: '#8A9499',
    dark: '#6C7B7F',
  },
  neutral: {
    0: '#FFFFFF',
    10: '#121212',
    20: '#1E1E1E',
    30: '#FFFFFF',
    40: '#000000',
    50: '#757575',
    60: '#9E9E9E',
    70: '#BDBDBD',
    80: '#E0E0E0',
    100: '#000000',
  },
};

const appColors = (theme: 'light' | 'dark') => {
  const colors = theme === 'light' ? colorsLight : colorsDark;
  return {
    listBackground: colors.neutral[100],
    mainBackground: colors.neutral[80],
    mainText: colors.neutral[30],
    mainTextContrast: colors.neutral[40],
  };
};

function colors(theme: 'light' | 'dark') {
  return {
    appColors: appColors(theme),
    themeColors: theme === 'light' ? colorsLight : colorsDark,
  };
}

export default colors;
export { colorsLight, colorsDark };
