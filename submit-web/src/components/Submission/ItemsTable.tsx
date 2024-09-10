import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { BCDesignTokens } from "epic.theme";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useState } from "react";
import { Order, tableSort } from "../Shared/Table/utils";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import SubmissionItemTableRow from "./SubmissionItemTableRow";
import { SubmissionItem } from "@/models/SubmissionItem";
import { SubmissionItemTableRow as SubmissionItemTableRowType } from "./types";

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
  const sortedSubmissionItems = submissionItems
    .map((subItem) => ({
      id: subItem.id,
      name: subItem.type.name,
      status: subItem.status,
      submitted_by: subItem.submitted_by,
      version: subItem.version,
    }))
    .sort(tableSort(order, orderBy));

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
            <TableCell sx={{ color: BCDesignTokens.themeGray70 }} colSpan={2}>
              <TableSortLabel
                active={orderBy === "name"}
                direction={orderBy === "name" ? order : "asc"}
                onClick={() => handleRequestSort("name")}
                IconComponent={SwapVertIcon}
                sx={{
                  ".MuiTableSortLabel-icon": {
                    color: `${BCDesignTokens.themeGray70} !important`,
                  },
                }}
              >
                <Typography sx={{ color: BCDesignTokens.themeGray70 }}>
                  Form/Document
                </Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell align="right" sx={{ color: BCDesignTokens.themeGray70 }}>
              Uploaded by
            </TableCell>
            <TableCell align="right" sx={{ color: BCDesignTokens.themeGray70 }}>
              Version
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: BCDesignTokens.themeGray70 }}
            >
              Status
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: BCDesignTokens.themeGray70 }}
            >
              Actions
            </TableCell>
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
