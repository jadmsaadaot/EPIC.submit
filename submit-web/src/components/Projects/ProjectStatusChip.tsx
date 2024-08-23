import { PackageStatus } from "@/models/Package";
import { Chip } from "@mui/material";
import { BCDesignTokens } from "epic.theme";

const statusStyles: Record<PackageStatus, Record<string, any>> = {
  APPROVED: {
    borderRadius: 1,
    border: `2px solid ${BCDesignTokens.supportBorderColorSuccess}`,
    background: BCDesignTokens.supportSurfaceColorSuccess,
    label: "Approved",
  },
  IN_REVIEW: {
    borderRadius: 0.5,
    border: `2px solid ${BCDesignTokens.themeBlue100}`,
    background: BCDesignTokens.themeBlue20,
    label: "In Review",
  },
  REJECTED: {},
};

export default function PackageStatusChip({
  status,
}: {
  status: PackageStatus;
}) {
  const style = statusStyles[status];

  return (
    <Chip
      sx={{
        borderRadius: style.borderRadius,
        border: style.border,
        background: style.background,
      }}
      label={style.label}
    />
  );
}
