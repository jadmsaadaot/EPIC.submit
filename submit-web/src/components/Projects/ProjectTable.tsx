import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { BCDesignTokens } from "epic.theme";
import { SubmissionPackage } from "@/models/Package";
import ProjectTableRow from "./ProjectTableRow";

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
            <ProjectTableRow
              key={subPackage.id}
              subPackage={subPackage}
              onSubmissionClick={onSubmissionClick}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
