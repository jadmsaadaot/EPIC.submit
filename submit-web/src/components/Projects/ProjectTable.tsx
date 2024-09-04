import {
  Box,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PackageStatusChip from "./ProjectStatusChip";
import { BCDesignTokens } from "epic.theme";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { SubmissionPackage } from "@/models/Package";

export default function SubmissionPackageTable({
  submissionPackages,
  headless,
  onSubmissionClick,
}: {
  submissionPackages: Array<SubmissionPackage>;
  headless?: boolean;
  onSubmissionClick: (submissionId: number) => void;
}) {
  return (
    <TableContainer component={Box} sx={{ height: "100%" }}>
      <Table sx={{ tableLayout: "fixed" }} aria-label="simple table">
        {!headless && (
          <TableHead sx={{ border: 0 }}>
            <TableRow>
              <TableCell
                colSpan={6}
                sx={{
                  color: BCDesignTokens.themeGray70,
                }}
              >
                Submission Name
              </TableCell>
              <TableCell
                colSpan={2}
                align="right"
                sx={{ color: BCDesignTokens.themeGray70 }}
              >
                Submitted On
              </TableCell>
              <TableCell
                colSpan={2}
                align="right"
                sx={{ color: BCDesignTokens.themeGray70 }}
              >
                Submitted By
              </TableCell>
              <TableCell
                colSpan={2}
                align="center"
                sx={{ color: BCDesignTokens.themeGray70 }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {submissionPackages?.map((subPackage) => (
            <TableRow
              key={`row-${subPackage.id}`}
              component={Box}
              sx={{ my: 1 }}
            >
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
                  <ArrowForwardIosIcon fontSize="small" />
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
