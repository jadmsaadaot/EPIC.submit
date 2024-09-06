import { ArrowForwardIos } from "@mui/icons-material";
import { Link, TableCell, TableRow, Typography } from "@mui/material";
import { BCDesignTokens } from "epic.theme";
import PackageStatusChip from "./ProjectStatusChip";
import { SubmissionPackage } from "@/models/Package";

interface ProjectRowProps {
  subPackage: SubmissionPackage;
  onSubmissionClick: (submissionId: number) => void;
}

export default function ProjectTableRow({
  subPackage,
  onSubmissionClick,
}: ProjectRowProps) {
  return (
    <>
      <TableRow key={`row-${subPackage.id}`} sx={{ my: 1 }}>
        <TableCell
          component="th"
          scope="row"
          colSpan={6}
          sx={{
            borderTop: "2px solid #F2F2F2",
            borderBottom: "2px solid #F2F2F2",
            borderLeft: "2px solid #F2F2F2",
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            py: BCDesignTokens.layoutPaddingSmall,
          }}
        >
          <Link
            sx={{
              color: BCDesignTokens.themeBlue90,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
            component={"button"}
            onClick={() => onSubmissionClick(subPackage.id)}
          >
            <Typography
              variant="h5"
              color={BCDesignTokens.themeBlue90}
              fontWeight={"500"}
              sx={{ mr: 0.5 }}
            >
              {subPackage.name}
            </Typography>
            <ArrowForwardIos fontSize="small" />
          </Link>
        </TableCell>
        <TableCell
          colSpan={2}
          align="right"
          sx={{
            borderTop: "2px solid #F2F2F2",
            borderBottom: "2px solid #F2F2F2",
            py: BCDesignTokens.layoutPaddingSmall,
          }}
        >
          {subPackage.submitted_on ?? "--"}
        </TableCell>
        <TableCell
          colSpan={2}
          align="right"
          sx={{
            borderTop: "2px solid #F2F2F2",
            borderBottom: "2px solid #F2F2F2",
            py: BCDesignTokens.layoutPaddingSmall,
          }}
        >
          {subPackage.submitted_by ?? "--"}
        </TableCell>
        <TableCell
          colSpan={2}
          align="right"
          sx={{
            borderTop: "2px solid #F2F2F2",
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            borderBottom: "2px solid #F2F2F2",
            borderRight: "2px solid #F2F2F2",
            py: BCDesignTokens.layoutPaddingSmall,
          }}
        >
          <PackageStatusChip status={subPackage.status} />
        </TableCell>
      </TableRow>
      <TableRow key={`empty-row-${subPackage.id}`} sx={{ py: 1 }}>
        <TableCell
          component="th"
          scope="row"
          colSpan={12}
          sx={{
            py: BCDesignTokens.layoutPaddingXsmall,
          }}
        />
      </TableRow>
    </>
  );
}
