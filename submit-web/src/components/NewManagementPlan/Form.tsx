import { Grid } from "@mui/material";
import { TabPanel } from "./TabPanel";

export const Form = () => {
  return (
    <Grid container width={"100%"}>
      <Grid
        item
        xl={8}
        lg={10}
        md={12}
        sx={{
          padding: "24px 0px 12px 0px",
        }}
        container
      >
        <Grid item xs={12}>
          <TabPanel />
        </Grid>
      </Grid>
    </Grid>
  );
};
