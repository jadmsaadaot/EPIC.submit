import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { BCDesignTokens } from "epic.theme";
import { SubmissionPackage } from "@/models/Package";
import ProjectTableRow from "./ProjectTableRow";
import { StyledTableCell } from "../Shared/Table/common";

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
      <Table sx={{ tableLayout: "fixed", border: 0 }} aria-label="simple table">
        {!headless && (
          <TableHead
            sx={{
              border: 0,
              ".MuiTableCell-root": {
                p: BCDesignTokens.layoutPaddingXsmall,
              },
            }}
          >
            <TableRow>
              <StyledTableCell colSpan={6}>Submission Name</StyledTableCell>
              <StyledTableCell colSpan={2} align="right">
                Submitted On
              </StyledTableCell>
              <StyledTableCell colSpan={2} align="right">
                Submitted By
              </StyledTableCell>
              <StyledTableCell colSpan={2} align="center">
                Status
              </StyledTableCell>
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
