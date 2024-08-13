import { Box, Typography } from "@mui/material";
import React from "react";
import { AppConfig } from "@/utils/config";
import MenuIcon from "@mui/icons-material/Menu";
import { theme } from "@/styles/theme";

export default function MobileNav() {
  return (
    <Box
      sx={{
        p: 1,
        borderBottom: "1px solid #0000001A",
        justifyContent: "space-between",
      }}
      display={"flex"}
    >
      <Typography
        variant="h5"
        color="info"
        component="div"
        paddingLeft={"0.5rem"}
        fontWeight={"bold"}
      >
        {AppConfig.appTitle}
      </Typography>
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="body2" color="info" mr={1}>
          Menu
        </Typography>
        <MenuIcon
          fontSize="small"
          htmlColor={theme.palette.text.primary}
          sx={{ m: 0, p: 0 }}
        />
      </Box>
    </Box>
  );
}
