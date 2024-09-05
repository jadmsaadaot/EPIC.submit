import { Chip } from "@mui/material";
import { BCDesignTokens } from "epic.theme";
import { EAOColors } from "epic.theme";

export type SubmissionStatus =
  | "NEW_SUBMISSION"
  | "COMPLETED"
  | "PARTIALLY_COMPLETE"
  | "SUBMITTED";
export const SUBMISSION_STATUS: Record<
  SubmissionStatus,
  { value: SubmissionStatus; label: string }
> = {
  NEW_SUBMISSION: {
    value: "NEW_SUBMISSION",
    label: "New Submission",
  },
  COMPLETED: {
    value: "COMPLETED",
    label: "Completed",
  },
  PARTIALLY_COMPLETE: {
    value: "PARTIALLY_COMPLETE",
    label: "Partially Complete",
  },
  SUBMITTED: {
    value: "SUBMITTED",
    label: "Submitted",
  },
};
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
  const style = statusStyles[status];

  return (
    <Chip
      sx={{
        ...style.sx,
      }}
      label={style.label}
    />
  );
}
