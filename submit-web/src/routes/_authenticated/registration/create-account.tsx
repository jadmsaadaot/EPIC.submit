import { useModal } from "@/components/Shared/Modals/modalStore";
import UpdateModal from "@/components/Shared/Modals/UpdateModal";
import { Save } from "@mui/icons-material";
import {
  Box,
  Divider,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/registration/create-account"
)({
  component: CreateAccount,
});

function CreateAccount() {
  const { setOpen } = useModal();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    setOpen(
      <UpdateModal
        header="Success"
        subText={[{ text: "Your account has been created successfully." }]}
      />
    );
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
          width={"25%"}
          justifyContent="center"
          alignItems="flex-start"
          marginTop="0.75rem"
        >
          <Typography variant="h4" color="#858A8C" fontWeight={400}>
            Your Contact Information
          </Typography>
          <Divider
            sx={{ marginTop: "1rem", marginBottom: "1.25rem" }}
          ></Divider>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <TextField id="givenName" label="Your Given Name" />
              <TextField id="surname" label="Your Surname" />
              <TextField
                id="position"
                label="Your Position/Role at CGI Mines Inc."
              />
              <TextField id="phone" label="Your Work Phone Number" />
              <TextField id="email" label="Your Work Email Address" />
            </FormGroup>
            <Button type="submit" color="primary" startIcon={<Save />}>
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
        <Button color="secondary" sx={{ mx: 9.5, my: 2.25 }}>
          Save & Continue Later
        </Button>
      </Box>
    </>
  );
}
