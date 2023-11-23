import { Box, FormControlLabel, Switch } from "@mui/material";

export default function SwitchMeasurement(props) {
  const [checked, setChecked] = props.useChecked;

  return (
    <Box sx={{ mt: 2 }}>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            inputProps={{ name: "status" }}
          />
        }
        label={checked ? "Measurement ON" : "Measurement OFF"}
      />
    </Box>
  );
}
