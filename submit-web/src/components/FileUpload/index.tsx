import Uploader from "./Uploader";
import { Accept } from "react-dropzone";
import { useFileUploadStore } from "@/store/fileUploadStore";
import { Box, Typography } from "@mui/material";
import { BCDesignTokens } from "epic.theme";
import UploaderIcon from "./UploaderIcon";

interface UploaderProps {
  handleAddFile: (_files: File[]) => void;
  savedFileUrl?: string;
  savedFileName?: string;
  helpText?: string;
  height?: string;
  cropAspectRatio?: number;
  accept?: Accept;
}
export const FileUpload = ({
  handleAddFile,
  savedFileUrl = "",
  savedFileName = "",
  height = "10em",
  accept = {
    pdf: [],
    doc: [],
    docx: [],
    xls: [],
  },
}: UploaderProps) => {
  const { setAddedFileUrl, setAddedFileName } = useFileUploadStore();

  if (savedFileUrl && savedFileName) {
    setAddedFileName(savedFileName);
    setAddedFileUrl(savedFileUrl);
  }

  return (
    <Uploader height={height} accept={accept} handleAddFile={handleAddFile}>
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
