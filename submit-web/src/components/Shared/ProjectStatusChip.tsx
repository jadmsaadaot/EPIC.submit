import { Chip } from "@mui/material";
import { BCDesignTokens } from "epic.theme";

export default function ProjectStatusChip({
  isCompleted,
}: {
  isCompleted: boolean;
}) {
  if (isCompleted) {
    return (
      <Chip
        sx={{
          borderRadius: 1,
          border: `2px solid ${BCDesignTokens.supportBorderColorSuccess}`,
          background: BCDesignTokens.supportSurfaceColorSuccess,
        }}
        label="Approved"
      />
    );
  }

  if (!isCompleted) {
    return (
      <Chip
        sx={{
          borderRadius: 0.5,
          border: `2px solid ${BCDesignTokens.themeBlue100}`,
          background: BCDesignTokens.themeBlue20,
        }}
        label="In Review"
      />
    );
  }

  return <Chip sx={{ borderRadius: 1 }} label="In Review" />;
}
