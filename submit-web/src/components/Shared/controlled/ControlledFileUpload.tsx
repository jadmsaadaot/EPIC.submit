import { FileUploadProps, FileUpload } from "@/components/FileUpload";
import { FormHelperText, Stack } from "@mui/material";
import { get } from "lodash";
import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";

type ControlledFileUploadProps = FileUploadProps & {
  name: string;
  maxSize?: number;
};
export const ControlledFileUpload = ({
  name,
  onDrop,
  maxSize = 250 * 1024 * 1024, // Default max size of 250 MB
  ...otherProps
}: ControlledFileUploadProps) => {
  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext();

  const [sizeError, setSizeError] = useState<string | null>(null);
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
              const validFiles = acceptedFiles.filter((file) => {
                return file.size <= maxSize;
              });

              if (validFiles.length < acceptedFiles.length) {
                setSizeError(
                  `Some files exceed the ${(maxSize / (1024 * 1024)).toFixed(2)} MB limit.`
                );
              } else {
                setSizeError(null);
              }

              if (validFiles.length === 0) return;

              field.onChange([
                ...fileUploadValues,
                ...validFiles.map((file) => file.name),
              ]);
              onDrop(validFiles);
            }}
            error={Boolean(error) || Boolean(sizeError)}
          />
          {sizeError && <FormHelperText error>{sizeError}</FormHelperText>}
          {error && <FormHelperText error>{helperText}</FormHelperText>}
        </Stack>
      )}
    />
  );
};

export default ControlledFileUpload;
