import { Case, Switch } from "react-if";
import { useManagementPlanForm } from "./formStore";
import { MANAGEMENT_PLAN_FORM_STEPS } from "./constants";
import { Box } from "@mui/material";
import { Conditions } from "./Conditions";
import { PlanDetails } from "./PlanDetails";

export const TabPanel = () => {
  const { step } = useManagementPlanForm();
  return (
    <Box>
      <Switch>
        <Case condition={step === MANAGEMENT_PLAN_FORM_STEPS.CONDITIONS}>
          <Conditions />
        </Case>
        <Case condition={step === MANAGEMENT_PLAN_FORM_STEPS.PLAN_DETAILS}>
          <PlanDetails />
        </Case>
      </Switch>
    </Box>
  );
};
