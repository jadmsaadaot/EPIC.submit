import { useEffect } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { BCDesignTokens, EAOColors } from "epic.theme";
import FileUpload from "@/components/FileUpload";
import { useDocumentUploadStore } from "@/store/documentUploadStore";
import DocumentToUploadContainer from "./DocumentToUploadContainer";
import DocumentContainer from "./DocumentContainer";
import { When } from "react-if";
import { Navigate, useParams } from "@tanstack/react-router";
import { notify } from "@/components/Shared/Snackbar/snackbarStore";
import { useSubmissionItemStore } from "../submissionItemStore";
import { SUBMISSION_TYPE } from "@/models/Submission";

export const DocumentUploadSection = () => {
  const { submissionId } = useParams({
    from: "/_authenticated/_dashboard/projects/$projectId/_projectLayout/submission-packages/$submissionPackageId/_submissionLayout/submissions/$submissionId",
  });
  const { submissionItem } = useSubmissionItemStore();

  const {
    documents: pendingDocuments,
    reset,
    handleAddDocuments,
  } = useDocumentUploadStore();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const handleOnDrop = (acceptedFiles: File[]) => {
    handleAddDocuments(acceptedFiles[0]);
  };

  if (!submissionId) {
    notify.error("Failed to load submission item");
    return <Navigate to="/error" />;
  }

  const documentSubmissions = submissionItem?.submissions.filter(
    (submission) => submission.type === SUBMISSION_TYPE.DOCUMENT,
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          fontWeight={400}
          sx={{ color: BCDesignTokens.typographyColorDisabled }}
        >
          Document(s) Upload
        </Typography>
        <Divider sx={{ mt: BCDesignTokens.layoutMarginXsmall }} />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ flexDirection: "column", display: "flex" }}>
          <Typography
            variant="body1"
            color={BCDesignTokens.typographyColorPrimary}
          >
            Upload Management Plan
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: BCDesignTokens.typographyColorPlaceholder,
            }}
          >
            Must be unlocked PDF document (i.e., not password protected).
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: BCDesignTokens.typographyColorPlaceholder,
            }}
          >
            Any proposed changes must be in tracked changes.
          </Typography>
        </Box>
        <FileUpload height={"13.125rem"} onDrop={handleOnDrop} />
        <Typography
          variant="body2"
          sx={{
            color: EAOColors.ProponentDark,
          }}
        >
          Accepted file types: pdf, doc, docx, xlsx, Max. file size: 250 MB.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ flexDirection: "column", display: "flex" }}>
          <Typography
            variant="body1"
            color={BCDesignTokens.typographyColorPrimary}
          >
            Upload Supporting Documents, as applicable
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: BCDesignTokens.typographyColorPlaceholder,
            }}
          >
            e.g. table of proposed changes, table of concordance
          </Typography>
        </Box>
        <FileUpload height={"13.125rem"} onDrop={handleOnDrop} />
        <Typography
          variant="body2"
          sx={{
            color: EAOColors.ProponentDark,
          }}
        >
          Accepted file types: pdf, doc, docx, xlsx, Max. file size: 250 MB.
        </Typography>
      </Grid>
      <When condition={Boolean(documentSubmissions?.length)}>
        <Grid
          container
          item
          xs={12}
          sx={{ mb: BCDesignTokens.layoutMarginXlarge }}
        >
          {documentSubmissions?.map((docSub) => (
            <DocumentContainer
              key={docSub.id}
              document={docSub.submitted_document}
            />
          ))}
        </Grid>
      </When>
      <Grid
        container
        item
        xs={12}
        sx={{ mb: BCDesignTokens.layoutMarginXlarge }}
      >
        {pendingDocuments.map((document, index) => (
          <DocumentToUploadContainer
            key={`${index}-${document.file.name}`}
            document={document}
          />
        ))}
      </Grid>
    </Grid>
  );
};
