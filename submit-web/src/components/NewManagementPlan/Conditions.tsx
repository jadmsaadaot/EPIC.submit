import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Link as MuiLink,
  MenuItem,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { BCDesignTokens } from "epic.theme";
import { useManagementPlanForm } from "./formStore";
import { dummyConditions, MANAGEMENT_PLAN_FORM_STEPS } from "./constants";
import CloseIcon from "@mui/icons-material/Close";
import { Unless } from "react-if";

const MAX_CONDITIONS = 5;
const NUM_STEPS = Object.keys(MANAGEMENT_PLAN_FORM_STEPS).length;
export const Conditions = () => {
  const { step, setStep, reset, setFormData, formData } =
    useManagementPlanForm();

  const [conditionInputes, setConditionInputs] = useState([0]);
  const [conditions, setConditions] = useState<
    { key: number; value: number }[]
  >([]);
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleNext = () => {
    if (conditions.length !== conditionInputes.length) {
      setErrorText("Please select a condition for each input");
      return;
    }
    const data = {
      conditions: {
        label: "Conditions",
        value: conditions.map((c) => c.value),
      },
    };
    setFormData({ ...formData, ...data });
    setStep(Math.min(step + 1, NUM_STEPS - 1));
  };

  const handleCancel = () => {
    reset();
  };

  const handleAnotherCondition = () => {
    setConditionInputs([
      ...conditionInputes,
      Math.max(...conditionInputes) + 1,
    ]);
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
        {conditionInputes.map((input) => (
          <Grid key={`input-${input}`} item xs={12} container spacing={1}>
            <Grid item xs md={6} lg={4} key={input}>
              <TextField
                select
                fullWidth
                sx={{ marginBottom: "10px" }}
                onChange={(e) => {
                  const prev = conditions.filter((c) => c.key !== input);
                  setConditions([
                    ...prev,
                    { key: input, value: parseInt(e.target.value) },
                  ]);
                  if (errorText) {
                    setErrorText(null);
                  }
                }}
                value={conditions.find((c) => c.key === input)?.value || ""}
              >
                {dummyConditions.map((condition) => (
                  <MenuItem
                    key={condition.id}
                    value={condition.id}
                    disabled={conditions.some((c) => c.value === condition.id)}
                  >
                    {condition.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {input > 0 && (
              <Grid item>
                <IconButton
                  onClick={() => {
                    setConditionInputs(
                      conditionInputes.filter((c) => c !== input),
                    );
                    setConditions(conditions.filter((c) => c.key !== input));
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
        ))}
        <Unless condition={conditionInputes.length >= MAX_CONDITIONS}>
          <Grid item xs={12}>
            <MuiLink
              sx={{
                cursor: "pointer",
              }}
              onClick={handleAnotherCondition}
            >
              + Add another condition
            </MuiLink>
          </Grid>
        </Unless>
      </Grid>
      {errorText && (
        <Grid item xs={12}>
          <Typography color="error" variant="body2">
            {errorText}
          </Typography>
        </Grid>
      )}
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
