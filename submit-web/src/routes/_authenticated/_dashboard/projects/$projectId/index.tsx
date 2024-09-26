import { ProjectsSkeleton } from "@/components/Projects";
import { PageGrid } from "@/components/Shared/PageGrid";
import { Grid } from "@mui/material";
import { createFileRoute, Navigate, useParams } from "@tanstack/react-router";
import { Project as ProjectComponent } from "@/components/Projects/Project";
import { useGetProject } from "@/hooks/api/useProjects";
import { notify } from "@/components/Shared/Snackbar/snackbarStore";

export const Route = createFileRoute(
  "/_authenticated/_dashboard/projects/$projectId/"
)({
  component: ProjectPage,
  meta: () => [{ title: "Project" }],
  notFoundComponent: () => {
    return <p>Project not found!</p>;
  },
});

function ProjectPage() {
  const { projectId: projectIdParam } = useParams({ strict: false });
  const projectId = Number(projectIdParam);
  const {
    data: project,
    isError,
    error,
    isLoading,
  } = useGetProject({
    projectId,
  });

  if (isLoading) {
    return (
      <PageGrid>
        <ProjectsSkeleton />
      </PageGrid>
    );
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  if (!project) {
    notify.error("Failed to load project");
    return <Navigate to="/error" />;
  }

  return (
    <PageGrid>
      <Grid item xs={12} sx={{ border: "2px solid red" }}>
        <ProjectComponent accountProject={project} />
      </Grid>
    </PageGrid>
  );
}
