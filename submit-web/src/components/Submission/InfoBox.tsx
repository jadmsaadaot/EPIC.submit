import { SubmissionPackage } from "@/models/Package";
import { Grid, Typography } from "@mui/material";
import { BCDesignTokens } from "epic.theme";

type InfoBoxProps = {
  submissionPackage: SubmissionPackage;
};
export const InfoBox = ({ submissionPackage }: InfoBoxProps) => {
  return (
    <Grid
      container
      sx={{
        borderRadius: "4px",
        border: `1px solid ${BCDesignTokens.surfaceColorBorderDefault}`,
        p: BCDesignTokens.layoutPaddingMedium,
        pt: 0,
      }}
      rowSpacing={2}
    >
      <Grid item xs={4} container>
        <Typography color={BCDesignTokens.themeGray70}>Condition:</Typography>
      </Grid>
      <Grid item xs={4} container>
        <Typography color={BCDesignTokens.themeGray70}>
          Date Submitted:
        </Typography>{" "}
        <Typography color={"inherit"}>
          {submissionPackage?.submitted_on}
        </Typography>
      </Grid>
      <Grid item xs={4} container>
        <Typography color={BCDesignTokens.themeGray70}>
          Date Review Completed:
        </Typography>
      </Grid>
      <Grid item xs={4} container>
        <Typography color={BCDesignTokens.themeGray70}>
          Supporting Conditions:
        </Typography>
      </Grid>
      <Grid item xs={4} container>
        <Typography color={BCDesignTokens.themeGray70}>
          Submitted by:
        </Typography>
        <Typography color={"inherit"}>
          {submissionPackage?.submitted_by}
        </Typography>
      </Grid>
    </Grid>
  );
};
