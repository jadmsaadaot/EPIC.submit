import { ProjectCard } from "@/components/registration/addProjects/ProjectCard";
import { PROJECT_STATUS } from "@/components/registration/addProjects/ProjectCard/constants";
import { Banner } from "@/components/registration/Banner";
import { GridContainer } from "@/components/registration/GridContainer";
import { Caption2 } from "@/components/Shared/Typographies";
import { Button, Grid, Link, Stack, Typography } from "@mui/material";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/registration/add-projects",
)({
  component: AddProjects,
});

function AddProjects() {
  const navigate = useNavigate();
  return (
    <>
      <Banner>CGI Mines Inc.</Banner>
      <GridContainer>
        <Grid item xs={12}>
          <Typography variant="h4" fontWeight={600}>
            Project Account
          </Typography>
        </Grid>

        <Grid item xs={12} mt={"30px"}>
          <Typography variant="body1">
            EPIC.submit currently supports the submission of Management Plans
            only.
          </Typography>
        </Grid>

        <Grid item xs={12} mt={"20px"}>
          <Typography variant="body1">
            We found the following projects associated with CGI Mines Inc.
          </Typography>
        </Grid>
        <Grid item xs={12} mt={"20px"}>
          <ProjectCard status={PROJECT_STATUS.POST_DECISION} />
        </Grid>

        <Stack direction="row" spacing={2} mt={"3em"} alignItems={"center"}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate({ to: "/registration/complete" });
            }}
          >
            Confirm Project
          </Button>
          <Caption2>
            <Link href="#">No, this is incorrect</Link>
          </Caption2>
        </Stack>
      </GridContainer>
    </>
  );
}
