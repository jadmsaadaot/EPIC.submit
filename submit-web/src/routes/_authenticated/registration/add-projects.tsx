import { ProjectCard } from "@/components/registration/addProjects/ProjectCard";
import { Banner } from "@/components/registration/Banner";
import { GridContainer } from "@/components/registration/GridContainer";
import { Grid, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/registration/add-projects",
)({
  component: AddProjects,
});

function AddProjects() {
  return (
    <>
      <Banner>CGI Mines Inc.</Banner>
      <GridContainer spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" fontWeight={600}>
            Project Account
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1">
            EPIC.submit currently supports the submission of Management Plans
            only.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1">
            We found the following projects associated with CGI Mines Inc.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ProjectCard />
        </Grid>
      </GridContainer>
    </>
  );
}
