import { alpha } from "@mui/material";
import { customShadows } from "./custom-shadows";
import { palette } from "./palette";
import { BORDER_RADIUS } from "./border-radius";

export const components = {
  MuiCssBaseline: {
    styleOverrides: {
      "*": {
        boxSizing: "border-box",
      },
      html: {
        margin: 0,
        padding: 0,
        width: "100%",
        height: "100%",
        WebkitOverflowScrolling: "touch",
      },
      body: {
        margin: 0,
        padding: 0,
        width: "100%",
        height: "100%",
      },
      "#root": {
        width: "100%",
        height: "100%",
      },
      input: {
        "&[type=number]": {
          MozAppearance: "textfield",
          "&::-webkit-outer-spin-button": {
            margin: 0,
            WebkitAppearance: "none",
          },
          "&::-webkit-inner-spin-button": {
            margin: 0,
            WebkitAppearance: "none",
          },
        },
      },
      img: {
        maxWidth: "100%",
        display: "inline-block",
        verticalAlign: "bottom",
      },
    },
  },
  MuiBackdrop: {
    styleOverrides: {
      root: {
        backgroundColor: alpha(palette.grey[900], 0.8),
      },
      invisible: {
        background: "transparent",
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none", // Remove default text transformation
        fontWeight: 600,
      },
      containedInherit: {
        color: palette.common.white,
        backgroundColor: palette.grey[800],
        "&:hover": {
          color: palette.common.white,
          backgroundColor: palette.grey[800],
        },
        textTransform: "none",
      },
      sizeLarge: {
        minHeight: 48,
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        padding: 0,
      },
      head: {
        color: palette.text.secondary,
        backgroundColor: palette.background.neutral,
        paddingTop: 6,
        paddingBottom: 6,
        fontWeight: 600,
      },
    },
  },

  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        boxShadow: customShadows().card,
        borderRadius: BORDER_RADIUS * 2,
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        // Your styles for the default state of the button
        // backgroundColor: palette.primary.lighter,
        color: palette.text.primary,
        borderRadius: BORDER_RADIUS,
        "&:hover": {
          // Styles on hover
          backgroundColor: palette.primary.light,
        },
      },
    },
  },
};
