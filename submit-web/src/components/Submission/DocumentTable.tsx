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
import PackageStatusChip from "../Projects/ProjectStatusChip";
import { BCDesignTokens } from "epic.theme";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { PackageStatus } from "@/models/Package";

export interface Document {
  id: number;
  name: string;
  created_by: string;
  version: string;
  status: PackageStatus;
  actions: Array<string>;
}

export default function DocumentTable({
  documents,
}: {
  documents: Array<Document>;
}) {
  return (
    <TableContainer component={Box} sx={{ height: "100%" }}>
      <Table sx={{ tableLayout: "fixed" }} aria-label="simple table">
        <TableHead sx={{ border: 0 }}>
          <TableRow>
            <TableCell
              colSpan={6}
              sx={{
                color: BCDesignTokens.themeGray70,
              }}
            >
              Form/Document
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
          {documents?.map((document) => (
            <TableRow
              key={`row-${document.id}`}
              component={Box}
              sx={{ my: 1, backgroundColor: BCDesignTokens.themeBlue10 }}
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
                  borderTop: "2px solid #F2F2F2",
                  borderBottom: "2px solid #F2F2F2",
                  py: BCDesignTokens.layoutPaddingSmall,
                }}
              >
                {document.created_by ?? "--"}
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
                {document.version ?? "--"}
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
                <PackageStatusChip status={document.status} />
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
                {documents?.actions?.map((action) => <Link>{action}</Link>)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
