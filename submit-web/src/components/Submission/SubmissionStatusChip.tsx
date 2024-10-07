import { SubmissionStatus } from "@/models/Submission";
import { Chip } from "@mui/material";
import { BCDesignTokens } from "epic.theme";
import { EAOColors } from "epic.theme";

type StyleProps = {
  sx: Record<string, string | number>;
  label: string;
};

const statusStyles: Record<SubmissionStatus, StyleProps> = {
  NEW_SUBMISSION: {
    sx: {
      borderRadius: 1,
      border: `2px solid ${EAOColors.DecisionDark}`,
      background: EAOColors.DecisionLight,
    },
    label: "New Submission",
  },
  COMPLETED: {
    sx: {
      borderRadius: 1,
      border: `2px solid ${BCDesignTokens.supportBorderColorSuccess}`,
      background: BCDesignTokens.supportSurfaceColorSuccess,
    },
    label: "Completed",
  },
  PARTIALLY_COMPLETE: {
    label: "Partially Complete",
    sx: {
      borderRadius: 1,
      border: `2px solid ${BCDesignTokens.supportBorderColorWarning}`,
      background: BCDesignTokens.supportSurfaceColorWarning,
    },
  },
  SUBMITTED: {
    label: "Submitted",
    sx: {
      borderRadius: 1,
      border: `2px solid ${BCDesignTokens.themeBlue100}`,
      background: BCDesignTokens.themeBlue20,
    },
  },
};

export default function SubmissionStatusChip({
  status,
}: {
  status: SubmissionStatus;
}) {
  const style = statusStyles[status] || statusStyles.NEW_SUBMISSION;

  return (
    <Chip
      sx={{
        ...style.sx,
      }}
      label={style.label}
    />
  );
}
