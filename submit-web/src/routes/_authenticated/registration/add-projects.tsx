import {
  ProjectListSkeleton,
  ProjectsList,
} from "@/components/registration/addProjects/ProjectsList";
import { Banner } from "@/components/registration/Banner";
import { GridContainer } from "@/components/registration/GridContainer";
import { notify } from "@/components/Shared/Snackbar/snackbarStore";
import { Caption2 } from "@/components/Shared/Typographies";
import {
  useAddProjects,
  useLoadProjectsByProponentId,
} from "@/hooks/api/useProjects";
import { useAccount } from "@/store/accountStore";
import {
  Button,
  CircularProgress,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Else, If, Then } from "react-if";

export const Route = createFileRoute(
  "/_authenticated/registration/add-projects",
)({
  component: AddProjects,
});

function AddProjects() {
  const navigate = useNavigate();
  const { accountId, proponentId } = useAccount();
  const {
    data: projects,
    isPending: isFetchingProjects,
    isError: isLoadingProjectsError,
  } = useLoadProjectsByProponentId(proponentId);
  useEffect(() => {
    if (isLoadingProjectsError) {
      notify.error("Failed to load projects");
    }
  }, [isLoadingProjectsError]);

  const onAddProjectsSuccess = () => {
    navigate({ to: "/registration/complete" });
  };
  const onAddProjectsError = () => {
    notify.error("Failed to add projects");
  };
  const { mutate: addProjects, isPending: isAddingProjectsPending } =
    useAddProjects({
      onSuccess: onAddProjectsSuccess,
      onError: onAddProjectsError,
    });

  const onConfirmProjectsClick = () => {
    if (!projects) {
      return;
    }

    const projectIds = projects.map((project) => project.id);
    addProjects({ accountId, projectIds });
  };

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
          <If condition={isFetchingProjects}>
            <Then>
              <ProjectListSkeleton />
            </Then>
            <Else>
              <ProjectsList projects={projects} />
            </Else>
          </If>
        </Grid>

        <Stack direction="row" spacing={2} mt={"3em"} alignItems={"center"}>
          <Button
            variant="contained"
            color="primary"
            onClick={onConfirmProjectsClick}
            disabled={!projects}
          >
            {isAddingProjectsPending ? (
              <CircularProgress />
            ) : (
              "Confirm Projects"
            )}
          </Button>
          <Caption2>
            <Link href="#">No, this is incorrect</Link>
          </Caption2>
        </Stack>
      </GridContainer>
    </>
  );
}
