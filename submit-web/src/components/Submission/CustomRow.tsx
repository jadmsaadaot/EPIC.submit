import { Box, Link, TableCell, TableRow, Typography } from "@mui/material";
import { BCDesignTokens } from "epic.theme";
import SubmissionStatusChip from "./SubmissionStatusChip";
import { Document } from "./DocumentTable";

export default function CustomRow({ document }: { document: Document }) {
  return (
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
  );
}
