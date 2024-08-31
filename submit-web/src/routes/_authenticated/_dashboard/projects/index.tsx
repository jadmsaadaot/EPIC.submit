import { createFileRoute } from "@tanstack/react-router";
import { Grid } from "@mui/material";

import { useGetProjects } from "@/hooks/api/useProjects";
import { useAccount } from "@/store/accountStore";
import { Else, If, Then } from "react-if";
import { Projects, ProjectsSkeleton } from "@/components/Projects";
import { useEffect } from "react";
import { notify } from "@/components/Shared/Snackbar/snackbarStore";
import { PageGrid } from "@/components/Shared/PageGrid";

export const Route = createFileRoute("/_authenticated/_dashboard/projects/")({
  component: ProjectsPage,
  meta: () => [{ title: "All Projects" }],
});

export function ProjectsPage() {
  const { accountId } = useAccount();
  const {
    data: projectsData,
    isPending: isProjectsLoading,
    isError: isProjectsError,
  } = useGetProjects({
    accountId,
  });

  useEffect(() => {
    if (isProjectsError) {
      notify.error("Failed to load projects");
    }
  }, [isProjectsError]);

  if (isProjectsError) {
    return null;
  }

  return (
    <PageGrid>
      <Grid item xs={12} lg={10}>
        <If condition={isProjectsLoading}>
          <Then>
            <ProjectsSkeleton />
          </Then>
          <Else>
            <Projects accountProjects={projectsData} />
          </Else>
        </If>
      </Grid>
    </PageGrid>
  );
}
