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
import { useNavigate, useParams } from "@tanstack/react-router";
import DocumentRow from "./DocumentRow";
import { Unless } from "react-if";

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
  "&:hover": {
    backgroundColor: BCDesignTokens.themeBlue40,
  },
}));

export default function SubmissionItemTableRow({
  item,
}: SubmissionItemTableRowProps) {
  const navigate = useNavigate();
  const { projectId, submissionPackageId } = useParams({
    from: "/_authenticated/_dashboard/projects/$projectId/_projectLayout/submission-packages/$submissionPackageId",
  });

  const { name, id, submissions, has_document, status } = item;

  const actionLabel = has_document ? "Add/Edit Files" : "Fill/Edit Form";

  const onActionClick = () => {
    navigate({
      to: `/projects/${projectId}/submission-packages/${submissionPackageId}/submissions/${id}`,
    });
  };

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
              {name}
            </Typography>
          </MuiLink>
        </StyledTableCell>
        <StyledTableCell align="right"></StyledTableCell>
        <StyledTableCell align="right"></StyledTableCell>
        <StyledTableCell align="right">
          <SubmissionStatusChip
            status={SUBMISSION_STATUS.NEW_SUBMISSION.value}
          />
        </StyledTableCell>
        <StyledTableCell align="right">
          <Unless condition={status === SUBMISSION_STATUS.SUBMITTED.value}>
            <Typography
              variant="body2"
              sx={{
                color: BCDesignTokens.typographyColorLink,
                "&:hover": {
                  cursor: "pointer",
                  textDecoration: "underline",
                },
              }}
              onClick={onActionClick}
            >
              {actionLabel}
            </Typography>
          </Unless>
        </StyledTableCell>
      </StyledTableRow>
      {submissions.map((submission) => (
        <DocumentRow
          key={`doc-row-${submission.id}`}
          documentSubmission={submission}
        />
      ))}
      <TableRow key={`row-${name}-divider`}>
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
