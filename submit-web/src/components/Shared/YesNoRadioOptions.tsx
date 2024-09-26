import { FormControlLabel, Radio } from "@mui/material";
import { BCDesignTokens } from "epic.theme";

export const YES = true;
export const NO = false;

type IYesNoRadioOptionsProps = {
  error: boolean;
};
export const YesNoRadioOptions = ({
  error = true,
}: IYesNoRadioOptionsProps) => {
  const sx = [
    error && {
      color: BCDesignTokens.surfaceColorPrimaryDangerButtonDefault,
    },
  ];
  return (
    <>
      <FormControlLabel value={YES} control={<Radio sx={sx} />} label="Yes" />
      <FormControlLabel value={NO} control={<Radio sx={sx} />} label="No" />
    </>
  );
};
