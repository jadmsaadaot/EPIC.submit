import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { TabBox } from "./TabBox";
import { dummyFullCondition } from "./constants";
import { When } from "react-if";
import { useState } from "react";
import { useManagementPlanForm } from "./formStore";
import { theme } from "@/styles/theme";

const YES = "yes";
const NO = "no";

export const PlanDetails = () => {
  const { step, setStep, reset } = useManagementPlanForm();
  const [isCorrect, setIsCorrect] = useState<string>(YES);

  const handleIsCorrectChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsCorrect(event.target.value);
  };

  const handleCancel = () => {
    reset();
  };

  const handleBack = () => {
    setStep(Math.min(step - 1, 0));
  };

  const handleCreateSubmission = () => {
    // create submission
  };
  return (
    <TabBox title="Plan Details">
      <Grid
        container
        sx={{
          padding: "16px 0px",
        }}
        spacing={4}
      >
        <Grid item xs={12}>
          <Typography variant="body2">
            You are submitting this Management Plan:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            fontWeight={theme.typography.fontWeightBold}
          >
            {dummyFullCondition.deliverable_name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body2"
            fontWeight={theme.typography.fontWeightBold}
          >
            Condition {dummyFullCondition.name}
          </Typography>
        </Grid>
        <When condition={dummyFullCondition.fn_consultation_required}>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              fontWeight={theme.typography.fontWeightBold}
            >
              Consultation Required
            </Typography>
          </Grid>
        </When>
        {dummyFullCondition.stakeholders_to_consult && (
          <Grid item xs={12}>
            <Typography
              variant="body2"
              fontWeight={theme.typography.fontWeightBold}
            >
              List of parties to be consulted:
            </Typography>
            <ul
              style={{
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.body2.fontSize,
                fontStyle: theme.typography.body2.fontStyle,
                lineHeight: theme.typography.body2.lineHeight,
                fontWeight: theme.typography.fontWeightBold,
              }}
            >
              {dummyFullCondition.stakeholders_to_consult.map((stakeholder) => (
                <li key={stakeholder}>{stakeholder}</li>
              ))}
            </ul>
          </Grid>
        )}
        <Grid item xs={12}>
          <FormControl>
            <FormLabel>Is this correct?</FormLabel>
            <RadioGroup
              name="isCorrect"
              value={isCorrect}
              onChange={handleIsCorrectChange}
            >
              <FormControlLabel
                value={YES}
                control={<Radio />}
                label="Yes, this information is correct"
              />
              <FormControlLabel
                value={NO}
                control={<Radio />}
                label="No, this information is incorrect"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Stack direction={"row"} spacing={1}>
            <Button variant="text" onClick={handleCancel}>
              Cancel
            </Button>
            <Button color="secondary" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleCreateSubmission}>Create Submission</Button>
          </Stack>
        </Grid>
      </Grid>
    </TabBox>
  );
};
