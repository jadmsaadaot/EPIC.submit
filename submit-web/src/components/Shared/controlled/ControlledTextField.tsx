import React, { FC } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { BCDesignTokens } from "epic.theme";

type IFormInputProps = {
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputEffects?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => string;
  maxLength?: number;
} & TextFieldProps;

const ControlledTextField: FC<IFormInputProps> = ({
  name,
  inputEffects,
  maxLength,
  onChange: onInputChange,
  ...otherProps
}) => {
  const {
    control,
    formState: { errors, defaultValues },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValues?.[name] || ""}
      render={({ field }) => (
        <TextField
          {...field}
          inputProps={{
            maxLength: maxLength,
            height: "32px",
          }}
          onChange={(e) => {
            if (onInputChange) {
              onInputChange(e);
            }
            if (inputEffects) {
              e.target.value = inputEffects(e);
            }
            field.onChange(e.target.value);
          }}
          error={!!errors[name]}
          helperText={
            <span style={{ color: BCDesignTokens.typographyColorDanger }}>
              {String(errors[name]?.message ?? "")}
            </span>
          }
          {...otherProps}
        />
      )}
    />
  );
};

export default ControlledTextField;
