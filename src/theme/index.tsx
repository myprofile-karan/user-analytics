import React from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { palette } from "./palette";
import { components } from "./components";
import { BORDER_RADIUS } from "./border-radius";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = createTheme({
    palette: palette,
    //@ts-ignore
    components: components,
    ...responsiveFontSizes,
    shape: { borderRadius: BORDER_RADIUS },

  });

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;
