import { colors } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colors.teal[500],
    },
    secondary: {
      main: colors.orange[600],
    },
    background: {
      default: "white",
    },
    snackbar: {
      success: colors.teal[500],
      error: colors.red.A400,
      warning: colors.orange.A400,
      info: colors.blue[500],
    },
  },
  components: {
    MuiPaper: {
      variants: [
        {
          props: { variant: "transparent" },
          style: ({ theme }) => ({
            backgroundColor: "#ffffffdb",
            boxShadow: theme.shadows[5],
          }),
        },
      ],
    },
  },
});

export default lightTheme;
