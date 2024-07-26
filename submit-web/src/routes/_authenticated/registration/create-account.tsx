import {
  Box,
  Button,
  Divider,
  FormControl,
  FormGroup,
  Grid,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/registration/create-account"
)({
  component: CreateAccount,
});

function CreateAccount() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log("save");
  };

  return (
    <>
      <Box
        position="relative"
        bgcolor="#F0F8FF"
        zIndex={-1}
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
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        px={9.5}
        py={7}
      >
        <Typography variant="h4" color="initial" fontWeight={600}>
          First, create your account.
        </Typography>
        <Typography variant="body1" color="initial" py={1.5}>
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
          width={"25%"}
          justifyContent="center"
          alignItems="flex-start"
          marginTop="0.75rem"
        >
          <Typography variant="h4" color="#858A8C">
            Your Contact Information
          </Typography>
          <Divider
            sx={{ marginTop: "1rem", marginBottom: "1.25rem" }}
          ></Divider>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <FormControl>
                <label htmlFor="givenName" style={{ fontWeight: "600" }}>
                  Your Given Name
                </label>
                <OutlinedInput
                  id="givenName"
                  sx={{ height: "40px", marginBottom: "1.5rem" }}
                />
              </FormControl>
              <FormControl>
                <label htmlFor="surname" style={{ fontWeight: "600" }}>
                  Your Surname
                </label>
                <OutlinedInput
                  id="surname"
                  sx={{ height: "40px", marginBottom: "1.5rem" }}
                />
              </FormControl>
              <FormControl>
                <label htmlFor="position" style={{ fontWeight: "600" }}>
                  Your Position/Role at CGI Mines Inc.
                </label>
                <OutlinedInput
                  id="position"
                  sx={{ height: "40px", marginBottom: "1.5rem" }}
                />
              </FormControl>
              <FormControl>
                <label htmlFor="phone" style={{ fontWeight: "600" }}>
                  Your Work Phone Number
                </label>
                <OutlinedInput
                  id="phone"
                  sx={{ height: "40px", marginBottom: "1.5rem" }}
                />
              </FormControl>
              <FormControl>
                <label htmlFor="email" style={{ fontWeight: "600" }}>
                  Your Work Email Address
                </label>
                <OutlinedInput
                  id="email"
                  sx={{ height: "40px", marginBottom: "1.5rem" }}
                />
              </FormControl>
            </FormGroup>
            <Button variant={"contained"} type="submit">
              Save
            </Button>
          </form>
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
        <Button variant="outlined" sx={{ mx: 9.5, my: 2.25 }}>
          Save & Continue Later
        </Button>
      </Box>
    </>
  );
}
