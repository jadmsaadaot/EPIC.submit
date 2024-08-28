import { Box, Divider, Typography } from "@mui/material";
import { BCDesignTokens } from "epic.theme";

export const Conditions = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 400,
          color: BCDesignTokens.typographyColorPlaceholder,
        }}
      >
        Condition(s)
      </Typography>
      <Divider />
      <Box
        sx={{
          padding: "16px 0px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <Typography variant="body1">
          What condition is this management plan for?
        </Typography>
        <Typography
          variant="body2"
          color={BCDesignTokens.typographyColorPlaceholder}
        >
          Please note: you can only submit one Management Plan per submission
        </Typography>
      </Box>
    </Box>
  );
};
