import { Box, Grid, Typography } from "@mui/material";
import { BCDesignTokens } from "epic.theme";
import React, { useEffect } from "react";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import DocumentIcon from "./DocumentIcon";
import { notify } from "@/components/Shared/Snackbar/snackbarStore";
import { SUBMISSION_TYPE } from "@/models/Submission";
import {
  ObjectStorageHeaderDetails,
  useSaveObject,
} from "@/hooks/api/useObjectStorage";
import { useCreateSubmission } from "@/hooks/api/useSubmissions";
import { Document, useDocumentUploadStore } from "@/store/documentUploadStore";
import { useParams } from "@tanstack/react-router";
import ProgressBar from "./ProgressBar";

interface DocumentContainerProps {
  document: Document;
}

const DocumentToUploadContainer: React.FC<DocumentContainerProps> = ({
  document,
}) => {
  const { submissionId: subItemId } = useParams({
    from: "/_authenticated/_dashboard/projects/$projectId/_projectLayout/submission-packages/$submissionPackageId/_submissionLayout/submissions/$submissionId",
  });

  const onSaveObjectSuccess = (
    fileDataHeaderDetails: ObjectStorageHeaderDetails,
  ) => {
    createSubmission({
      itemId: Number(subItemId),
      data: {
        type: SUBMISSION_TYPE.DOCUMENT,
        data: {
          name: fileDataHeaderDetails.uniquefilename,
          url: fileDataHeaderDetails.filepath,
        },
      },
    });
  };
  const onSaveObjectError = () => {
    notify.error("Failed to upload document");
  };
  const { mutate: saveObjectToS3 } = useSaveObject({
    onSuccess: onSaveObjectSuccess,
    onError: onSaveObjectError,
  });

  const onCreateFailure = () => {
    notify.error("Failed to upload document");
  };

  const { mutate: createSubmission } = useCreateSubmission(Number(subItemId), {
    onError: onCreateFailure,
  });

  useEffect(() => {
    saveObjectToS3({
      file: document.file,
      fileDetails: {
        filename: document.file.name,
      },
    });
  }, [saveObjectToS3, document]);

  return (
    <Grid
      container
      item
      sx={{
        border: `1px solid #D6EBFF`,
        padding: BCDesignTokens.layoutPaddingSmall,
        mb: BCDesignTokens.layoutMarginSmall,
      }}
    >
      <Grid
        container
        item
        xs={11}
        alignItems={"center"}
        justifyContent={"flex-start"}
      >
        <Box
          sx={{
            mr: BCDesignTokens.layoutMarginLarge,
          }}
        >
          <DocumentIcon />
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          width={"70%"}
          mr={BCDesignTokens.layoutMarginSmall}
        >
          <Typography
            variant="body1"
            fontWeight={BCDesignTokens.typographyFontWeightsBold}
            sx={{ color: "#222", mr: BCDesignTokens.layoutMarginSmall }}
          >
            {document.file.name}
          </Typography>{" "}
          <ProgressBar />
        </Box>
      </Grid>
      <Grid
        container
        item
        xs={1}
        alignItems={"center"}
        justifyContent={"flex-end"}
      >
        <Box
          sx={{
            cursor: "pointer",
            color: "#1A5A96",
            mr: BCDesignTokens.layoutMarginSmall,
          }}
          onClick={() => {
            return;
          }}
        >
          Remove
        </Box>
      </Grid>
    </Grid>
  );
};

export default DocumentToUploadContainer;
