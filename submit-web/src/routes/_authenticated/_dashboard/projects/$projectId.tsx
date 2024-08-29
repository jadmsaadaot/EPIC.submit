import { createFileRoute } from "@tanstack/react-router";
import { useGetProject } from "@/hooks/api/useProjects";
import { AccountProject } from "@/models/Project";
import { useParams } from "@tanstack/react-router";
import { Project as ProjectComponent } from "@/components/Projects/Project";
import { Container } from "@mui/material";
import { ProjectsSkeleton } from "@/components/Projects";
import { useAccount } from "@/store/accountStore";

export const Route = createFileRoute(
  "/_authenticated/_dashboard/projects/$projectId"
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
  const { accountId } = useAccount();
  const { data, isError, error, isLoading } = useGetProject({
    accountId,
    projectId,
  });
  const project = data as AccountProject;
  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <ProjectsSkeleton />
      </Container>
    );
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <ProjectComponent accountProject={project} />
    </Container>
  );
}
