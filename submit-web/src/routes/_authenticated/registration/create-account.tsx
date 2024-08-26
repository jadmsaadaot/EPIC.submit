import {
  CreateAccountResponse,
  useCreateAccount,
} from "@/hooks/api/useAccounts";
import { Save } from "@mui/icons-material";
import { CircularProgress, Divider, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledTextField from "@/components/Shared/controlled/ControlledTextField";
import { useAuth } from "react-oidc-context";
import { Banner } from "@/components/registration/Banner";
import { GridContainer } from "@/components/registration/GridContainer";
import { BCDesignTokens } from "epic.theme";
import { useAccount } from "@/store/accountStore";

const queryParamSchema = yup.object().shape({
  proponent_id: yup.number(),
});

type QueryParamsSchema = yup.InferType<typeof queryParamSchema>;

export const Route = createFileRoute(
  "/_authenticated/registration/create-account",
)({
  component: CreateAccount,
});

const createAccountSchema = yup.object().shape({
  givenName: yup.string().required("Please enter your given name."),
  surname: yup.string().required("Please enter your surname."),
  position: yup.string().required("Please enter your position."),
  phone: yup.string().required("Please enter your phone number."),
  email: yup
    .string()
    .email("Invalid email")
    .required("Please enter your email."),
});

type CreateAccountForm = yup.InferType<typeof createAccountSchema>;

function CreateAccount() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { proponent_id } = Route.useSearch<QueryParamsSchema>();
  const { setAccount } = useAccount();

  const onCreateAccountSuccess = (data: CreateAccountResponse) => {
    setAccount({ proponentId: data.proponent_id, accountId: data.id });
    navigate({ to: "/registration/add-projects" });
  };
  const { mutate: doCreateAccount, isPending: isCreatingAccount } =
    useCreateAccount({
      onSuccess: onCreateAccountSuccess,
    });

  const methods = useForm({
    resolver: yupResolver(createAccountSchema),
    mode: "onSubmit",
  });

  const { handleSubmit } = methods;

  const onSubmitHandler = async (data: CreateAccountForm) => {
    if (!user?.profile.sub || !proponent_id) return;
    const accountData = {
      first_name: data.givenName,
      last_name: data.surname,
      position: data.position,
      work_contact_number: data.phone,
      work_email_address: data.email,
      auth_guid: user?.profile.sub,
      proponent_id: proponent_id,
    };
    doCreateAccount(accountData);
  };

  return (
    <>
      <Banner>CGI Mines Inc.</Banner>
      <GridContainer>
        <Grid item xs={12} mb={"16px"}>
          <Typography variant="h4" fontWeight={600}>
            First, create your account.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            Welcome to EPIC.submit and thank you for taking a few minutes to set
            up the CGI Mines Inc account. First of all, please create your
            Account as an Adminstrator of EPIC.submit for CGI Mines Inc.
            <br />
            <br />
            Account Administrators have access to all the projects associated
            with your account in EPIC.submit and can manage user access, such as
            assign users to be Project Account Administrators, and assigning
            users who can upload or submit documents on behalf of CGI Mines Inc.{" "}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
          justifyContent="center"
          alignItems="flex-start"
          marginTop="0.75rem"
          container
          mt={"24px"}
        >
          <Grid item xs={12}>
            <Typography variant="h6" color="#858A8C" fontWeight={400}>
              Your Contact Information
            </Typography>
            <Divider sx={{ marginTop: "1rem", marginBottom: "1.25rem" }} />
          </Grid>
          <Grid item xs={12}>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <ControlledTextField
                  name="givenName"
                  label="Your Given Name"
                  fullWidth
                  InputLabelProps={{
                    sx: { marginBottom: "0", color: "red" },
                  }}
                />
                <ControlledTextField
                  name="surname"
                  label="Your Surname"
                  fullWidth
                />
                <ControlledTextField
                  name="position"
                  label="Your Position/Role at CGI Mines Inc."
                  fullWidth
                />
                <ControlledTextField
                  name="phone"
                  label="Your Work Phone Number"
                  fullWidth
                />
                <ControlledTextField
                  name="email"
                  label="Your Work Email Address"
                  fullWidth
                />
                <Button
                  type="submit"
                  color="primary"
                  startIcon={
                    isCreatingAccount ? (
                      <CircularProgress
                        size={16}
                        sx={{
                          color: BCDesignTokens.iconsColorPrimaryInvert,
                        }}
                      />
                    ) : (
                      <Save />
                    )
                  }
                  sx={{
                    height: "43px",
                    width: "91px",
                  }}
                >
                  Save
                </Button>
              </form>
            </FormProvider>
          </Grid>
        </Grid>
      </GridContainer>
    </>
  );
}
