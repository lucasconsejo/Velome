import { Box, Card, CardActions, Icon, Typography } from "@mui/material";
import { SnackbarContent } from "notistack";
import React from "react";

const Snackbar = React.forwardRef(({ variant, iconVariant, message }, ref) => (
  <SnackbarContent ref={ref}>
    <Card sx={{ width: "100%" }}>
      <CardActions sx={{ padding: "10px", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Icon
            component={iconVariant[variant]}
            sx={(theme) => ({
              mr: 1,
              color: theme.palette.snackbar[variant],
            })}
          />
          <Typography variant="body2">{message}</Typography>
        </Box>
      </CardActions>
    </Card>
  </SnackbarContent>
));

export default Snackbar;
