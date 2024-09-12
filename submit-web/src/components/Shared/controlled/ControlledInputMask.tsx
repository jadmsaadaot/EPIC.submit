import React, { FC } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import InputMask, { Props as InputMaskProps } from "react-input-mask";

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
          {(inputProps: InputMaskProps) => {
            const { color, ...restInputProps } = inputProps;
            return (
              <TextField
                {...restInputProps} // Spreading the masked input props to TextField without color
                {...otherProps} // Additional TextField props like label, variant, etc.
                color={
                  color as
                    | "error"
                    | "primary"
                    | "secondary"
                    | "info"
                    | "success"
                    | "warning"
                } // Correctly typing the color prop
              />
            );
          }}
        </InputMask>
      )}
    />
  );
};

export default ControlledInputMask;
