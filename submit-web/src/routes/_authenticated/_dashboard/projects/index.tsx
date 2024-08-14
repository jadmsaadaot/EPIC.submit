import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_dashboard/projects/")({
  component: ProjectsPage,
  meta: () => [{ title: "Projects" }],
});

function ProjectsPage() {
  return <div>Projects Page</div>;
}
