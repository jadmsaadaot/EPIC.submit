import { FileUploadProps, FileUpload } from "@/components/FileUpload";
import { Box, FormHelperText, Stack } from "@mui/material";
import { get } from "lodash";
import { Controller, Form, useFormContext } from "react-hook-form";

type ControlledFileUploadProps = FileUploadProps & {
  name: string;
};
export const ControlledFileUpload = ({
  name,
  onDrop,
  ...otherProps
}: ControlledFileUploadProps) => {
  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext();

  const error = get(errors, name);
  const helperText = error?.message?.toString() ?? "";

  const fileUploadValues: string[] = getValues(name) ?? [];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Stack direction={"column"} spacing={1}>
          <FileUpload
            {...otherProps}
            onDrop={(acceptedFiles: File[]) => {
              if (acceptedFiles.length === 0) return;
              console.log([...fileUploadValues, acceptedFiles[0].name]);
              field.onChange([...fileUploadValues, acceptedFiles[0].name]);
              //   onDrop(acceptedFiles);
            }}
          />
          {error && <FormHelperText error>{helperText}</FormHelperText>}
        </Stack>
      )}
    />
  );
};

export default FileUpload;
