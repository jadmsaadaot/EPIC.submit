import { PageGrid } from "@/components/Shared/PageGrid";
import { Grid } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { Project as ProjectComponent } from "@/components/Projects/Project";
import { useAccountProject } from "@/components/Projects/projectStore";

export const Route = createFileRoute(
  "/_authenticated/_dashboard/projects/_projectLayout/$projectId/"
)({
  component: ProjectPage,
  notFoundComponent: () => {
    return <p>Project not found!</p>;
  },
});

function ProjectPage() {
  const { accountProject } = useAccountProject();

  return (
    <PageGrid>
      <Grid item xs={12} lg={10}>
        <ProjectComponent accountProject={accountProject} />
      </Grid>
    </PageGrid>
  );
}
