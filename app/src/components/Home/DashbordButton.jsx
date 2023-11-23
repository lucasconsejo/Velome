import BarChartIcon from "@mui/icons-material/BarChart";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box, Button } from "@mui/material";

const DASHBOARD_URL =
  import.meta.env.VITE_DASHBOARD_URL || "http://localhost:4000/";

export default function DashbordButton() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        my: 7,
      }}
    >
      <Button
        href={DASHBOARD_URL}
        target="_blank"
        variant="contained"
        color="inherit"
        disableRipple
        startIcon={<BarChartIcon color="secondary" />}
        endIcon={<KeyboardArrowRightIcon />}
        sx={{
          backgroundColor: "background.default",
          textTransform: "none",
          borderRadius: 10,
        }}
      >
        Open dashboard
      </Button>
    </Box>
  );
}
