import Uploader from "./Uploader";
import { Accept } from "react-dropzone";
import { Box, Typography } from "@mui/material";
import { BCDesignTokens } from "epic.theme";
import UploaderIcon from "./UploaderIcon";

interface UploaderProps {
  helpText?: string;
  height?: string;
  cropAspectRatio?: number;
  accept?: Accept;
  onDrop: (acceptedFiles: File[]) => void;
}
export const FileUpload = ({
  height = "10em",
  accept = {
    pdf: [],
    doc: [],
    docx: [],
    xls: [],
  },
  onDrop,
}: UploaderProps) => {
  return (
    <Uploader height={height} accept={accept} onDrop={onDrop}>
      <Box sx={{ p: BCDesignTokens.layoutPaddingSmall }}>
        <UploaderIcon />
      </Box>
      <Typography
        variant="body1"
        fontWeight={BCDesignTokens.typographyFontWeightsBold}
        sx={{ color: BCDesignTokens.typographyColorSecondary }}
      >
        Drag and Drop File(s) Here or{" "}
        <span
          style={{
            textDecoration: "underline",
            color: "#1A5A96",
          }}
        >
          Select File(s)
        </span>
      </Typography>
    </Uploader>
  );
};

export default FileUpload;
