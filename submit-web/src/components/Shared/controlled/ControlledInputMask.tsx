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
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          inputRef={ref}
        >
          {(inputProps) => (
            <TextField
              {...inputProps} // Spreading the masked input props to TextField
              {...otherProps} // Additional TextField props like label, variant, etc.
            />
          )}
        </InputMask>
      )}
    />
  );
};

export default ControlledInputMask;
