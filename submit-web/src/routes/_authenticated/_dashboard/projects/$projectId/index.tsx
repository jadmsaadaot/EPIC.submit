import { ProjectsSkeleton } from "@/components/Projects";
import { PageGrid } from "@/components/Shared/PageGrid";
import { AccountProject } from "@/models/Project";
import { Grid } from "@mui/material";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { Project as ProjectComponent } from "@/components/Projects/Project";
import { useGetProject } from "@/hooks/api/useProjects";

export const Route = createFileRoute(
  "/_authenticated/_dashboard/projects/$projectId/",
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
  const { data, isError, error, isLoading } = useGetProject({
    projectId,
  });
  const project = data as AccountProject;
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

  return (
    <PageGrid>
      <Grid item xs={12} lg={10}>
        <ProjectComponent accountProject={project} />
      </Grid>
    </PageGrid>
  );
}
