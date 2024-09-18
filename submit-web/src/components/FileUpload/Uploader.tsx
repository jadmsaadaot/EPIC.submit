import React, { useEffect } from "react";
import { Button, Grid, Stack } from "@mui/material";
import Dropzone, { Accept } from "react-dropzone";
import { useFileUploadStore } from "@/store/fileUploadStore";

interface UploaderProps {
  height?: string;
  accept?: Accept;
  children: React.ReactNode;
}
const Uploader = ({
  height = "10em",
  accept = {},
  children,
}: UploaderProps) => {
  const {
    handleAddFile,
    addedFileUrl,
    setAddedFileUrl,
    setAddedFileName,
    existingFileUrl,
    setExistingFileUrl,
  } = useFileUploadStore();

  useEffect(() => {
    return () => {
      if (addedFileUrl) {
        URL.revokeObjectURL(addedFileUrl);
      }
    };
  }, [addedFileUrl]);

  const existingImage = addedFileUrl || existingFileUrl;

  if (existingImage) {
    return (
      <Grid
        container
        direction="row"
        alignItems="flex-start"
        justifyContent={"flex-end"}
        spacing={1}
        padding={1}
      >
        <Grid
          item
          xs={12}
          style={{
            borderRadius: "8px",
            height: height,
            padding: "0",
          }}
        ></Grid>
        <Grid item xs={12} container justifyContent="flex-end" direction="row">
          <Stack
            direction="row"
            spacing={1}
            width="100%"
            justifyContent="flex-end"
          >
            <Button
              onClick={() => {
                setAddedFileUrl("");
                setAddedFileName("");
                setExistingFileUrl("");
                handleAddFile([]);
                URL.revokeObjectURL(addedFileUrl);
              }}
              size="small"
              sx={{ width: "88px" }}
            >
              Remove
            </Button>
          </Stack>
        </Grid>
      </Grid>
    );
  }
  return (
    <Dropzone
      onDrop={(acceptedFiles) => {
        if (acceptedFiles.length === 0) return;
        const createdObjectURL = URL.createObjectURL(acceptedFiles[0]);
        // handleAddFile(acceptedFiles);
        setAddedFileUrl(createdObjectURL);
        setAddedFileName(acceptedFiles[0].name);
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
              background: "#F6F9FC",
            }}
          >
            <input
              {...getInputProps()}
              multiple={false}
              accept={".pdf,.xlsx,.docx"}
            />
            {children}
          </Grid>
        </section>
      )}
    </Dropzone>
  );
};

export default Uploader;
