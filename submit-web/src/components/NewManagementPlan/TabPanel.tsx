import { Case, Switch } from "react-if";
import { useManagementPlanForm } from "./formStore";
import { MANAGEMENT_PLAN_FORM_STEPS } from "./constants";
import { Box } from "@mui/material";
import { Conditions } from "./Conditions";

type TabPanelProps = {
  handleSubmit?: () => void;
};
export const TabPanel: React.FC<TabPanelProps> = () => {
  const { step } = useManagementPlanForm();
  return (
    <Box mt={"2em"}>
      <Switch>
        <Case condition={step === MANAGEMENT_PLAN_FORM_STEPS.CONDITIONS}>
          <Conditions />
        </Case>
        <Case condition={step === MANAGEMENT_PLAN_FORM_STEPS.PLAN_DETAILS}>
          <div>Plan Details</div>
        </Case>
        <Case condition={step === MANAGEMENT_PLAN_FORM_STEPS.REQUIREMENTS}>
          <div>Requirements</div>
        </Case>
        <Case
          condition={step === MANAGEMENT_PLAN_FORM_STEPS.CONTACT_INFORMATION}
        >
          <div>Contact Information</div>
        </Case>
      </Switch>
    </Box>
  );
};
