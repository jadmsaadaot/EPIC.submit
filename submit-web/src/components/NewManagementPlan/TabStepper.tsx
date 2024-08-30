import Box from "@mui/material/Box";
import Stepper, { StepperProps } from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

type TabStepper = {
  step: number;
  stepLabels: string[];
} & StepperProps;
export default function TabStepper({ stepLabels, step, ...rest }: TabStepper) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={step} alternativeLabel {...rest}>
        {stepLabels.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
