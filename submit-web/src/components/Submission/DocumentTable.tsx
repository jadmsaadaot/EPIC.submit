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
import { BCDesignTokens } from "epic.theme";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useState } from "react";
import { Order, tableSort } from "../Shared/Table/utils";
import SubmissionStatusChip, { SubmissionStatus } from "./SubmissionStatusChip";
import SwapVertIcon from "@mui/icons-material/SwapVert";
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
        <TableHead sx={{ border: 0 }}>
          <TableRow>
            <TableCell colSpan={6} sx={{ color: BCDesignTokens.themeGray70 }}>
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
              colSpan={2}
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
            <>
              <TableRow
                key={`row-${document.id}`}
                component={Box}
                sx={{ backgroundColor: BCDesignTokens.themeBlue10 }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  colSpan={6}
                  sx={{
                    borderTop: `2px solid ${BCDesignTokens.themeBlue20}`,
                    borderBottom: `2px solid ${BCDesignTokens.themeBlue20}`,
                    borderLeft: `2px solid ${BCDesignTokens.themeBlue20}`,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                    py: BCDesignTokens.layoutPaddingXsmall,
                  }}
                >
                  <Link
                    color="inherit"
                    sx={{
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h5"
                      color="inherit"
                      fontWeight={900}
                      sx={{ mr: 0.5 }}
                    >
                      {document.name}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell
                  colSpan={2}
                  align="right"
                  sx={{
                    borderTop: `2px solid ${BCDesignTokens.themeBlue20}`,
                    borderBottom: `2px solid ${BCDesignTokens.themeBlue20}`,
                    py: BCDesignTokens.layoutPaddingXsmall,
                  }}
                >
                  {document.created_by ?? "--"}
                </TableCell>
                <TableCell
                  colSpan={2}
                  align="right"
                  sx={{
                    borderTop: `2px solid ${BCDesignTokens.themeBlue20}`,
                    borderBottom: `2px solid ${BCDesignTokens.themeBlue20}`,
                    py: BCDesignTokens.layoutPaddingXsmall,
                  }}
                >
                  {document.version ?? "--"}
                </TableCell>
                <TableCell
                  colSpan={2}
                  align="right"
                  sx={{
                    borderTop: `2px solid ${BCDesignTokens.themeBlue20}`,
                    borderBottom: `2px solid ${BCDesignTokens.themeBlue20}`,
                    py: BCDesignTokens.layoutPaddingSmall,
                  }}
                >
                  <SubmissionStatusChip status={document.status} />
                </TableCell>
                <TableCell
                  colSpan={2}
                  align="right"
                  sx={{
                    borderTop: `2px solid ${BCDesignTokens.themeBlue20}`,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    borderBottom: `2px solid ${BCDesignTokens.themeBlue20}`,
                    borderRight: `2px solid ${BCDesignTokens.themeBlue20}`,
                    py: BCDesignTokens.layoutPaddingSmall,
                  }}
                >
                  {document?.actions?.map((action) => (
                    <Link
                      sx={{
                        mx: BCDesignTokens.layoutPaddingXsmall,
                        textDecoration: "none",
                      }}
                      component={"button"}
                    >
                      {action}
                    </Link>
                  ))}
                </TableCell>
              </TableRow>
              <TableRow component={Box} sx={{ py: 1 }}>
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
