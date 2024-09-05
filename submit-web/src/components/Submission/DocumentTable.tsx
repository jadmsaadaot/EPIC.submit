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
import CustomRow from "./CustomRow";
import { SubmissionStatus } from "@/models/Submission";
export interface Document {
  id: number;
  name: string;
  created_by: string;
  version: string;
  status: SubmissionStatus;
  actions: Array<string>;
}

export default function DocumentTable({
  documents,
}: {
  documents: Array<Document>;
}) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Document>("name");

  const handleRequestSort = (property: keyof Document) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const sortedDocuments = [...documents].sort(tableSort(order, orderBy));

  return (
    <TableContainer component={Box} sx={{ height: "100%" }}>
      <Table sx={{ tableLayout: "fixed" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={3} sx={{ color: BCDesignTokens.themeGray70 }}>
              <TableSortLabel
                active={orderBy === "name"}
                direction={orderBy === "name" ? order : "asc"}
                onClick={() => handleRequestSort("name")}
                IconComponent={SwapVertIcon}
              >
                <Typography sx={{ color: BCDesignTokens.themeGray70 }}>
                  Form/Document
                </Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell
              colSpan={3}
              align="right"
              sx={{ color: BCDesignTokens.themeGray70 }}
            >
              Uploaded by
            </TableCell>
            <TableCell
              colSpan={2}
              align="right"
              sx={{ color: BCDesignTokens.themeGray70 }}
            >
              Version
            </TableCell>
            <TableCell
              colSpan={2}
              align="center"
              sx={{ color: BCDesignTokens.themeGray70 }}
            >
              Status
            </TableCell>
            <TableCell
              colSpan={2}
              align="center"
              sx={{ color: BCDesignTokens.themeGray70 }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedDocuments?.map((document) => (
            <CustomRow key={document.id} document={document} />
          ))}
          {sortedDocuments.length === 0 && (
            <TableRow>
              <TableCell colSpan={12} align="center"></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
