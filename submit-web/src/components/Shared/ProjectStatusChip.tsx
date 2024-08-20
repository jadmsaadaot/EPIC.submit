import { Chip } from "@mui/material";
import { PROJECT_STATUS } from "../registration/addProjects/ProjectCard/constants";
import { BCDesignTokens } from "epic.theme";

export default function ProjectStatusChip({ status }: { status: string }) {
  if (status === PROJECT_STATUS.APPROVAL) {
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

  if (status === PROJECT_STATUS.IN_REVIEW) {
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

  if (status === PROJECT_STATUS.POST_DECISION) {
    return (
      <Chip sx={{ borderRadius: 1 }} label="Post Decision" color="warning" />
    );
  }

  return <Chip sx={{ borderRadius: 1 }} label="In Review" />;
}
