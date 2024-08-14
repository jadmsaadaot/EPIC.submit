import { Grid, GridProps } from "@mui/material";
import { YellowBar } from "../Shared/YellowBar";

export const GridContainer = ({ children, ...rest }: GridProps) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      px={9.5}
      py={7}
      spacing={0}
      {...rest}
    >
      <Grid item xs={12}>
        <YellowBar />
      </Grid>
      {children}
    </Grid>
  );
};
