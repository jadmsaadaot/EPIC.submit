import {
  Link as MuiLink,
  styled,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { BCDesignTokens } from "epic.theme";
import SubmissionStatusChip from "./SubmissionStatusChip";
import { SubmissionItemTableRow as SubmissionItemTableRowType } from "./types";
import { SUBMISSION_STATUS } from "@/models/Submission";
import { Link, useParams } from "@tanstack/react-router";

type SubmissionItemTableRowProps = {
  item: SubmissionItemTableRowType;
};

const StyledTableCell = styled(TableCell)(() => ({
  borderTop: `1px solid ${BCDesignTokens.themeBlue20}`,
  borderBottom: `1px solid ${BCDesignTokens.themeBlue20}`,
  padding: `${BCDesignTokens.layoutPaddingXsmall} !important`,
  "&:first-of-type": {
    borderLeft: `1px solid ${BCDesignTokens.themeBlue20}`,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  "&:last-of-type": {
    borderRight: `1px solid ${BCDesignTokens.themeBlue20}`,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  backgroundColor: BCDesignTokens.themeBlue10,
}));

export default function SubmissionItemTableRow({
  item,
}: SubmissionItemTableRowProps) {
  const { projectId, submissionPackageId } = useParams({
    strict: false,
  });
  return (
    <>
      <StyledTableRow key={`row-${item.name}`}>
        <StyledTableCell colSpan={2}>
          <MuiLink
            color="inherit"
            sx={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              color="inherit"
              fontWeight={900}
              sx={{ mx: 0.5 }}
            >
              {item.name}
            </Typography>
          </MuiLink>
        </StyledTableCell>
        <StyledTableCell align="right"></StyledTableCell>
        <StyledTableCell align="right">{item.version ?? "--"}</StyledTableCell>
        <StyledTableCell align="right">
          <SubmissionStatusChip
            status={SUBMISSION_STATUS.NEW_SUBMISSION.value}
          />
        </StyledTableCell>
        <StyledTableCell align="right">
          <Link
            style={{
              color: BCDesignTokens.typographyColorLink,
              textDecoration: "none",
            }}
            to={`/projects/${projectId}/submission-packages/${submissionPackageId}/submissions/${item.id}`}
          >
            Edit
          </Link>
        </StyledTableCell>
      </StyledTableRow>
      <TableRow key={`row-${item.name}-divider`}>
        <TableCell
          colSpan={5}
          sx={{
            py: BCDesignTokens.layoutPaddingXsmall,
            border: 0,
          }}
        />
      </TableRow>
    </>
  );
}
