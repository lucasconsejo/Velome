import { colors } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.teal[500],
    },
    secondary: {
      main: colors.orange[400],
    },
    background: {
      default: "#181b1f",
    },
    snackbar: {
      success: colors.teal[500],
      error: colors.red.A400,
      warning: colors.orange.A400,
      info: colors.blue[500],
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ccccdc80",
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
          },
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#181b1f",
          border: "1px solid #2e3135",
        },
      },
      variants: [
        {
          props: { variant: "transparent" },
          style: ({ theme }) => ({
            backgroundColor: "#181b1ff5",
            boxShadow: theme.shadows[5],
          }),
        },
      ],
    },
  },
});

export default darkTheme;
