import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

interface ColorScheme {
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText?: string;
}

// SETUP COLORS

export const grey = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

export const primary: ColorScheme = {
  lighter: '#C6E8F8',
  light: '#55A0D5',
  main: '#003975',
  dark: '#002054',
  darker: '#001038',
  contrastText: '#FFFFFF',
};

export const secondary: ColorScheme = {
  lighter: '#FEDFD1',
  light: '#F98775',
  main: '#ED1C24',
  dark: '#AA0E2F',
  darker: '#71052F',
  contrastText: '#FFFFFF',
};

export const info: ColorScheme = {
  lighter: '#CAFDF5',
  light: '#61F3F3',
  main: '#00B8D9',
  dark: '#006C9C',
  darker: '#003768',
  contrastText: '#FFFFFF',
};

export const success: ColorScheme = {
  lighter: '#C8FAD6',
  light: '#5BE49B',
  main: '#00A76F',
  dark: '#007867',
  darker: '#004B50',
  contrastText: '#FFFFFF',
};

export const warning: ColorScheme = {
  lighter: '#FFF5CC',
  light: '#FFD666',
  main: '#FFAB00',
  dark: '#B76E00',
  darker: '#7A4100',
  contrastText: grey[800],
};

export const error: ColorScheme = {
  lighter: '#FFE9D5',
  light: '#FFAC82',
  main: '#FF5630',
  dark: '#B71D18',
  darker: '#7A0916',
  contrastText: '#FFFFFF',
};

// export const common = {
//   black: '#000000',
//   white: '#FFFFFF',
// };

export const action = {
  hover: alpha(grey[500], 0.08),
  selected: alpha(grey[500], 0.16),
  disabled: alpha(grey[500], 0.8),
  disabledBackground: alpha(grey[500], 0.24),
  focus: alpha(grey[500], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};
export const common = {
  black: '#000000',
  white: '#FFFFFF',
};


const base = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey,
  common,
  divider: alpha(grey[500], 0.2),
  borderColor: "#c4c4c4",
  action,
};

// ----------------------------------------------------------------------

export const palette =  {
  ...base,
  text: {
    primary: grey[700],
    secondary: grey[600],
    disabled: grey[500],
  },
  background: {
    paper: '#FFFFFF',
    default: grey[100],
    neutral: grey[200],
    primary: primary.main
  },
  action: {
    ...base.action,
    active: grey[600],
  },
}
