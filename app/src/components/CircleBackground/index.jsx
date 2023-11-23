import { Box, useTheme } from "@mui/material";

export default function CircleBackground() {
  const theme = useTheme();
  const backgroundColor =
    theme.palette.mode === "light" ? "#e5e5f7" : "#2e3135";

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        backgroundColor,
        backgroundImage: `repeating-radial-gradient( circle at 0 0, transparent 0, ${backgroundColor} 140px ), repeating-linear-gradient( #00968855, #009688 )`,
      }}
    />
  );
}
