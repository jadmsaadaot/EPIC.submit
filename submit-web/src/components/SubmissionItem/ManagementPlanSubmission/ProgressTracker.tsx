import { Box, Typography } from "@mui/material";
import { BCDesignTokens } from "epic.theme";

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "0.75rem",
        borderRadius: BCDesignTokens.layoutBorderRadiusMedium,
        overflow: "hidden",
        marginRight: BCDesignTokens.layoutMarginSmall,
        border: `1px solid ${BCDesignTokens.themeBlue20}`,
      }}
    >
      <Box
        sx={{
          width: `${progress}%`,
          height: "100%",
          backgroundColor: "#FACC15",
        }}
      />
    </Box>
  );
}
