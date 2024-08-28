import { createFileRoute } from "@tanstack/react-router";
import { useProjectById } from "@/hooks/api/useProjects";
import { Project } from "@/models/Project";
import { Link, useParams } from "@tanstack/react-router";
import { Project as ProjectComponent } from "@/components/Projects/Project";

export const Route = createFileRoute(
  "/_authenticated/_dashboard/projects/$projectId"
)({
  component: ProjectPage,
  meta: () => [{ title: "Project Name" }],
  notFoundComponent: () => {
    return <p>Project not found!</p>;
  },
});

function ProjectPage() {
  const { projectId: projectIdParam } = useParams({ strict: false });
  const projectId = Number(projectIdParam);
  const { data, isError, error, isLoading } = useProjectById(projectId);

  const project: Project = data as Project;

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <ProjectComponent key={projectId} accountProject={project} />
    </>
  );
}
