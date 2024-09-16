import { PageGrid } from "@/components/Shared/PageGrid";
import { Grid } from "@mui/material";
import { createFileRoute, Navigate, useParams } from "@tanstack/react-router";
import { Project as ProjectComponent } from "@/components/Projects/Project";
import { useGetProject } from "@/hooks/api/useProjects";

export const Route = createFileRoute(
  "/_authenticated/_dashboard/projects/$projectId/_projectLayout/"
)({
  component: ProjectPage,
  notFoundComponent: () => {
    return <p>Project not found!</p>;
  },
});

function ProjectPage() {
  const { projectId: projectIdParam } = useParams({ strict: false });
  const projectId = Number(projectIdParam);
  const { data: accountProject } = useGetProject({
    projectId,
  });

  if (!accountProject) return <Navigate to="/error" />;

  return (
    <PageGrid>
      <Grid item xs={12} lg={10}>
        <ProjectComponent accountProject={accountProject} />
      </Grid>
    </PageGrid>
  );
}
