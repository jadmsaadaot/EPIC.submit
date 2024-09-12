import React, { FC } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import InputMask from "react-input-mask";

type IFormInputMaskProps = {
  name: string;
  mask: string;
} & TextFieldProps;

const ControlledInputMask: FC<IFormInputMaskProps> = ({
  name,
  mask,
  ...otherProps
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, ref, value } }) => (
        <InputMask
          mask={mask}
          value={value || ""} // Ensure controlled input with default value
          onChange={(e) => {
            onChange(e.target.value); // Pass the masked value to react-hook-form
          }}
          onBlur={onBlur}
        >
          {(inputProps) => (
            <TextField
              {...inputProps} // Spreading the masked input props to TextField
              {...otherProps} // Additional TextField props like label, variant, etc.
              inputRef={ref} // Pass the ref for react-hook-form
            />
          )}
        </InputMask>
      )}
    />
  );
};

export default ControlledInputMask;
