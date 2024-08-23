import { PackageStatus } from "@/models/Package";
import { Chip } from "@mui/material";
import { BCDesignTokens } from "epic.theme";

type StyleProps = {
  sx: Record<string, string | number>;
  label: string;
};
const statusStyles: Record<PackageStatus, StyleProps> = {
  APPROVED: {
    sx: {
      borderRadius: 1,
      border: `2px solid ${BCDesignTokens.supportBorderColorSuccess}`,
      background: BCDesignTokens.supportSurfaceColorSuccess,
    },
    label: "Approved",
  },
  IN_REVIEW: {
    sx: {
      borderRadius: 0.5,
      border: `2px solid ${BCDesignTokens.themeBlue100}`,
      background: BCDesignTokens.themeBlue20,
    },
    label: "In Review",
  },
  REJECTED: {
    label: "Rejected",
    sx: {
      //TODO - Add styles for rejected status
    },
  },
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
        ...style.sx,
      }}
      label={style.label}
    />
  );
}
