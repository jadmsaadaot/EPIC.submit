import { Case, Switch } from "react-if";
import { useCreateAccountForm } from "./formStore";
import { Box } from "@mui/material";
import CreateAccountForm from "./createAccountForm";
import { CREATE_ACCOUNT_STEPS } from "./constants";
import AddProjects from "./addProjects";

export const TabPanel = () => {
  const { step } = useCreateAccountForm();

  return (
    <Box>
      <Switch>
        <Case condition={step === CREATE_ACCOUNT_STEPS.CREATE_ACCOUNT_FORM}>
          <CreateAccountForm />
        </Case>
        <Case condition={step === CREATE_ACCOUNT_STEPS.ADD_PROJECTS}>
          <AddProjects />
        </Case>
      </Switch>
    </Box>
  );
};
