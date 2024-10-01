import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { BCDesignTokens } from "epic.theme";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useState } from "react";
import { Order } from "../Shared/Table/utils";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import SubmissionItemTableRow from "./SubmissionItemTableRow";
import { SubmissionItem } from "@/models/SubmissionItem";
import { SubmissionItemTableRow as SubmissionItemTableRowType } from "./types";
import { StyledTableCell } from "../Shared/Table/common";
import { SUBMISSION_TYPE } from "@/models/Submission";

export default function ItemsTable({
  submissionItems,
}: {
  submissionItems: Array<SubmissionItem>;
}) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] =
    useState<keyof SubmissionItemTableRowType>("name");

  const handleRequestSort = (property: keyof SubmissionItemTableRowType) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedSubmissionItems = submissionItems.map((subItem) => ({
    id: subItem.id,
    name: subItem.type.name,
    status: subItem.status,
    submitted_by: subItem.submitted_by,
    version: subItem.version,
    submissions: subItem.submissions.filter(
      (submission) => submission.type === SUBMISSION_TYPE.DOCUMENT
    ),
  }));

  return (
    <TableContainer component={Box} sx={{ height: "100%" }}>
      <Table sx={{ tableLayout: "fixed" }}>
        <TableHead
          sx={{
            ".MuiTableCell-root": {
              p: BCDesignTokens.layoutPaddingXsmall,
            },
          }}
        >
          <TableRow>
            <StyledTableCell colSpan={2}>
              <TableSortLabel
                active={orderBy === "name"}
                direction={orderBy === "name" ? order : "asc"}
                onClick={() => handleRequestSort("name")}
                IconComponent={SwapVertIcon}
                sx={{
                  ".MuiTableSortLabel-icon": {
                    color: `${BCDesignTokens.themeGray70} !important`,
                    "&:hover": {
                      color: "#EDEBE9 !important",
                    },
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: BCDesignTokens.themeGray70,
                    "&:hover": {
                      color: "#EDEBE9",
                    },
                  }}
                >
                  Form/Document
                </Typography>
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell align="right">Uploaded by</StyledTableCell>
            <StyledTableCell align="right">Version</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedSubmissionItems?.map((subItem) => (
            <SubmissionItemTableRow
              key={`custom-row-${subItem.name}`}
              item={subItem}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
