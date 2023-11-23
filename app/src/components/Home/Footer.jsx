import { Link, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Typography variant="body2" align="center" sx={{ mt: 5 }}>
      {"Made by "}
      <Link color="inherit" href="https://lucasconsejo.fr" target="_blank">
        Lucas Consejo
      </Link>{" "}
      {"⚡"}
    </Typography>
  );
}
