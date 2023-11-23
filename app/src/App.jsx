import {
  Done,
  HighlightOff,
  InfoOutlined,
  WarningAmber,
} from "@mui/icons-material";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { SnackbarProvider } from "notistack";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { CircleBackground, Home, Snackbar } from "./components";
import { darkTheme, lightTheme } from "./theme";

const queryClient = new QueryClient();

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () => createTheme(prefersDarkMode ? darkTheme : lightTheme),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider
          maxSnack={5}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          iconVariant={{
            success: Done,
            error: HighlightOff,
            warning: WarningAmber,
            info: InfoOutlined,
          }}
          Components={{
            success: Snackbar,
            error: Snackbar,
            warning: Snackbar,
            info: Snackbar,
          }}
        >
          <CssBaseline />
          <CircleBackground />
          <Home />
        </SnackbarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
