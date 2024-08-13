import { theme } from "@/styles/theme";
import { Box, Paper, Typography } from "@mui/material";
import { BCPalette } from "epic.theme";
import React from "react";

export const ProjectCard = () => {
  return (
    <Paper
      sx={{
        width: "380px",
        height: "301px",
      }}
    >
      <Box
        bgcolor={theme.palette.primary.main}
        height={54}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={600}
          px={2}
          color={BCPalette.typography.primaryInvert}
        >
          Project Name
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
      ></Box>
    </Paper>
  );
};
