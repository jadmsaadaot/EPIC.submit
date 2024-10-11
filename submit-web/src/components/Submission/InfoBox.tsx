import { SubmissionPackage } from "@/models/Package";
import { Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
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
        p: BCDesignTokens.layoutPaddingSmall,
      }}
      rowSpacing={1}
    >
      <Grid item xs={12} md={4} container>
        <Typography color={BCDesignTokens.themeGray70}>Condition:</Typography>
      </Grid>
      <Grid item xs={12} md={4} container>
        <Typography color={BCDesignTokens.themeGray70}>
          Date Submitted:
        </Typography>{" "}
        <Typography color={"inherit"} ml="10px">
          {submissionPackage?.submitted_on
            ? dayjs(submissionPackage.submitted_on).format("DD-MMM-YYYY")
            : "--"}
        </Typography>
      </Grid>
      <Grid item xs={12} md={4} container>
        <Typography color={BCDesignTokens.themeGray70}>
          Date Review Completed:
        </Typography>
      </Grid>
      <Grid item xs={12} md={4} container>
        <Typography color={BCDesignTokens.themeGray70}>
          Supporting Conditions:
        </Typography>
      </Grid>
      <Grid item xs={12} md={4} container>
        <Typography color={BCDesignTokens.themeGray70}>
          Submitted by:
        </Typography>
        <Typography color={"inherit"} ml="10px">
          {submissionPackage?.submitted_by}
        </Typography>
      </Grid>
    </Grid>
  );
};
