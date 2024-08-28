import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { BCDesignTokens } from "epic.theme";
import { useManagementPlanForm } from "./formStore";
import { dummyConditions, stepLabels } from "./constants";

export const Conditions = () => {
  const { step, setStep, reset } = useManagementPlanForm();

  const handleNext = () => {
    setStep(Math.min(step + 1, stepLabels.length - 1));
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 400,
          color: BCDesignTokens.typographyColorPlaceholder,
        }}
      >
        Condition(s)
      </Typography>
      <Divider />
      <Grid
        container
        sx={{
          padding: "16px 0px",
        }}
      >
        <Grid item xs={12}>
          <Typography variant="body1">
            What condition is this management plan for?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body2"
            color={BCDesignTokens.typographyColorPlaceholder}
          >
            Please note: you can only submit one Management Plan per submission
          </Typography>
        </Grid>
        <Grid item xs={12} lg={5} mt={"16px"}>
          <TextField
            select
            fullWidth
            InputProps={{
              placeholder: "Select a condition",
            }}
          >
            {dummyConditions.map((condition) => (
              <MenuItem key={condition.id} value={condition.id}>
                {condition.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt="5em">
        <Grid item>
          <Button variant="text" onClick={handleCancel}>
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={handleNext}>Next</Button>
        </Grid>
      </Grid>
    </Box>
  );
};
