import { YellowBar } from "@/components/Shared/YellowBar";
import { Box, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { BCDesignTokens } from "epic.theme";

export const Route = createFileRoute(
  "/_authenticated/_dashboard/projects/$projectId/_projectLayout/submission/$submissionId"
)({
  component: () => NewManagementPlan,
});

export function NewManagementPlan() {
  return (
    <Box
      sx={{
        padding: "24px 16px 16px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        borderRadius: "4px",
        border: `1px solid ${BCDesignTokens.surfaceColorBorderDefault}`,
        gap: BCDesignTokens.layoutPaddingSmall,
      }}
    >
      <YellowBar />
      <Typography variant="h5">New Submission</Typography>
    </Box>
  );
}
