import { Button, Grid } from "@mui/material";
import TabStepper from "./TabStepper";
import { TabPanel } from "./TabPanel";
import { Unless, When } from "react-if";
import { useManagementPlanForm } from "./formStore";
import { stepLabels } from "./constants";

type FormProps = {
  handleSubmit: () => void;
};
export const Form = ({ handleSubmit }: FormProps) => {
  const { step, setStep, reset } = useManagementPlanForm();

  const handleNext = () => {
    setStep(Math.min(step + 1, stepLabels.length - 1));
  };
  const handleBack = () => {
    setStep(Math.max(step - 1, 0));
  };

  const handleCancel = () => {
    reset();
  };

  const handleComplete = () => {
    handleSubmit();
    reset();
  };

  return (
    <Grid container width={"100%"} minHeight={"30em"}>
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
          <TabStepper />
        </Grid>
        <Grid item xs={12}>
          <TabPanel />
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        container
        direction={"row"}
        alignItems={"center"}
        spacing={2}
        mt={"3em"}
      >
        <Grid item>
          <Button variant="text" onClick={handleCancel}>
            Cancel
          </Button>
        </Grid>
        <Unless condition={step === 0}>
          <Grid item>
            <Button color="secondary" onClick={handleBack}>
              Back
            </Button>
          </Grid>
        </Unless>
        <Unless condition={step === stepLabels.length - 1}>
          <Grid item>
            <Button onClick={handleNext}>Next</Button>
          </Grid>
        </Unless>
        <When condition={step === stepLabels.length - 1}>
          <Grid item>
            <Button onClick={handleComplete}>Complete Form</Button>
          </Grid>
        </When>
      </Grid>
    </Grid>
  );
};
