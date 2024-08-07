import { useCreateAccount } from "@/hooks/useAccounts";
import { Save } from "@mui/icons-material";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledTextField from "@/components/Shared/controlled/ControlledTextField";
import { theme } from "@/styles/theme";
import { useAuth } from "react-oidc-context";

export const Route = createFileRoute(
  "/_authenticated/registration/create-account",
)({
  component: CreateAccount,
});

type CreateAccountForm = {
  givenName: string;
  surname: string;
  position: string;
  phone: string;
  email: string;
};
const schema = yup.object().shape({
  givenName: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  position: yup.string().required("Position is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

function CreateAccount() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { mutate: doCreateAccount, isPending: isCreateAccountPending } =
    useCreateAccount(
      () => navigate({ to: "/profile" }),
      () => {
        return;
      },
    );

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { handleSubmit } = methods;

  const onSubmitHandler = async (data: CreateAccountForm) => {
    if (!user?.profile.sub) return;
    const accountData = {
      first_name: data.givenName,
      last_name: data.surname,
      position: data.position,
      work_contact_number: data.phone,
      work_email_address: data.email,
      proponent_id: user?.profile.sub,
    };
    doCreateAccount(accountData);
  };

  return (
    <>
      <Box
        position="relative"
        bgcolor="#F0F8FF"
        zIndex={theme.zIndex.appBar - 10}
        height={76}
        display={"flex"}
        alignItems={"center"}
        px={9.5}
      >
        <Typography variant="h3" color="initial" fontWeight={600}>
          CGI Mines Inc.
        </Typography>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        px={9.5}
        py={7}
        height={"calc(100vh - 242px)"}
        overflow={"auto"}
      >
        <Typography variant="h4" fontWeight={600}>
          First, create your account.
        </Typography>
        <Typography variant="body1" py={1.5}>
          Welcome to EPIC.submit and thank you for taking a few minutes to set
          up the BC Hydro account. First of all, please create your Account as
          an Adminstrator of EPIC.submit for CGI Mines Inc.
          <br />
          <br />
          Account Administrators have access to all the projects associated with
          your account in EPIC.submit and can manage user access, such as assign
          users to be Project Account Administrators, and assigning users who
          can upload or submit documents on behalf of CGI Mines Inc.{" "}
        </Typography>

        <Grid
          item
          xs={3}
          justifyContent="center"
          alignItems="flex-start"
          marginTop="0.75rem"
          container
        >
          <Grid item xs={12}>
            <Typography variant="h4" color="#858A8C" fontWeight={400}>
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
                  InputLabelProps={{ sx: { fontWeight: "bold" } }}
                />
                <ControlledTextField
                  name="surname"
                  label="Your Surname"
                  fullWidth
                  InputLabelProps={{ sx: { fontWeight: "bold" } }}
                />
                <ControlledTextField
                  name="position"
                  label="Your Position/Role at CGI Mines Inc."
                  fullWidth
                  InputLabelProps={{ sx: { fontWeight: "bold" } }}
                />
                <ControlledTextField
                  name="phone"
                  label="Your Work Phone Number"
                  fullWidth
                  InputLabelProps={{ sx: { fontWeight: "bold" } }}
                />
                <ControlledTextField
                  name="email"
                  label="Your Work Email Address"
                  fullWidth
                  InputLabelProps={{ sx: { fontWeight: "bold" } }}
                />
                <Button
                  type="submit"
                  color="primary"
                  startIcon={<Save />}
                  disabled={isCreateAccountPending}
                >
                  Save
                </Button>
              </form>
            </FormProvider>
          </Grid>
        </Grid>
      </Grid>
      <Box
        justifyContent="center"
        alignItems="flex-start"
        position="absolute"
        bgcolor="#F0F8FF"
        width="100%"
        bottom="0"
      >
        <Button color="secondary" sx={{ mx: 9.5, my: 2.25 }}>
          Save & Continue Later
        </Button>
      </Box>
    </>
  );
}
