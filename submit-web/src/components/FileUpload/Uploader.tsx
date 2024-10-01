import React from "react";
import { Grid } from "@mui/material";
import Dropzone, { Accept } from "react-dropzone";
import { BCDesignTokens } from "epic.theme";

interface UploaderProps {
  height?: string;
  accept?: Accept;
  children: React.ReactNode;
  onDrop?: (acceptedFiles: File[]) => void;
  error?: boolean;
}
const Uploader = ({
  height = "10em",
  accept = {},
  onDrop = () => {
    return;
  },
  error = false,
  children,
}: UploaderProps) => {
  return (
    <Dropzone
      onDrop={(acceptedFiles) => {
        if (acceptedFiles.length === 0) return;
        onDrop(acceptedFiles);
      }}
      accept={accept}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <Grid
            {...getRootProps()}
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{
              padding: "0.38em",
              borderRadius: "8px",
              height: height,
              cursor: "pointer",
              background: error
                ? BCDesignTokens.supportSurfaceColorDanger
                : BCDesignTokens.themeBlue10,
              border: error
                ? `1px dashed ${BCDesignTokens.surfaceColorPrimaryDangerButtonDefault}`
                : `1px dashed ${BCDesignTokens.themeBlue60}`,
            }}
          >
            <input {...getInputProps()} multiple={false} />
            {children}
          </Grid>
        </section>
      )}
    </Dropzone>
  );
};

export default Uploader;
