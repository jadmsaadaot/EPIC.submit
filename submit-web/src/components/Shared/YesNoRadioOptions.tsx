import { FormControlLabel, Radio } from "@mui/material";

export const YES = true;
export const NO = false;
export const YesNoRadioOptions = () => {
  return (
    <>
      <FormControlLabel value={YES} control={<Radio />} label="Yes" />
      <FormControlLabel value={NO} control={<Radio />} label="No" />
    </>
  );
};
