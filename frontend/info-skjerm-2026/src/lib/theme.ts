import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    experience: Palette["primary"];
    mana: Palette["primary"];
    health: Palette["primary"];
  }

  interface PaletteOptions {
    experience?: PaletteOptions["primary"];
    mana?: PaletteOptions["primary"];
    health?: PaletteOptions["primary"];
    gold?: PaletteOptions["primary"];
    arenatoken?: PaletteOptions["primary"];
    gemstones?: PaletteOptions["primary"];
    tqwhite?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/LinearProgress" {
  interface LinearProgressPropsColorOverrides {
    experience: true;
    mana: true;
    health: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    experience: true;
    mana: true;
    health: true;
    gold: true;
    arenatoken: true;
    gemstones: true;
    tqwhite: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    experience: true;
    mana: true;
    health: true;
    gold: true;
    arenatoken: true;
    gemstones: true;
    tqwhite: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsColorOverrides {
    experience: true;
    mana: true;
    health: true;
    gold: true;
    arenatoken: true;
    gemstones: true;
  }
}

export const TillerQuestTheme = createTheme({
  palette: {
    text: {
      primary: "#e2e2e2",
    },
    primary: {
      main: "#6E40C9",
      contrastText: "#e2e2e2",
    },
    secondary: {
      main: "#C06EFF",
      contrastText: "#0d1117",
    },
    error: {
      main: "#FF3B43",
      contrastText: "#0d1117",
    },
    success: {
      main: "#6EC348",
    },
    info: {
      main: "#3DBCEA",
      contrastText: "#0d1117",
    },
    warning: {
      main: "#FFA726",
      contrastText: "#0d1117",
    },
    background: {
      paper: "#0d1117",
    },
    mode: "dark",
    experience: {
      main: "#f97316",
    },
    mana: {
      main: "#2196f3",
    },
    health: {
      main: "#f44336",
    },
    gold: {
      main: "#FFD700",
    },
    arenatoken: {
      main: "#FFA500",
    },
    gemstones: {
      main: "#00FFFF",
      contrastText: "#0d1117",
    },
    tqwhite: {
      main: "#e2e2e2",
      contrastText: "#0d1117",
    },
  },
  typography: {
    allVariants: {
      fontFamily: '"Inter Variable", Inter, sans-serif',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        },
        "*::-webkit-scrollbar": {
          display: "none",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          height: 10,
          backgroundColor: "#3f3f46",
        },
        bar: {
          borderRadius: 5,
        },
      },
    },
  },
});
