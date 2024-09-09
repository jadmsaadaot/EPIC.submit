import { ProjectsSkeleton } from "@/components/Projects";
import { useAccountProject } from "@/components/Projects/projectStore";
import { PageGrid } from "@/components/Shared/PageGrid";
import { useGetProject } from "@/hooks/api/useProjects";
import { useUpdateBreadcrumb } from "@/hooks/common";
import { AccountProject } from "@/models/Project";
import {
  createFileRoute,
  Navigate,
  Outlet,
  useParams,
} from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute(
  "/_authenticated/_dashboard/projects/$projectId/_projectLayout"
)({
  loader: () => useGetProject,
  component: ProjectLayout,
  meta: ({ params }) => [{ title: `Project ${params.projectId}` }],
});

function ProjectLayout() {
  const { setAccountProject } = useAccountProject();
  const { projectId: projectIdParam } = useParams({ strict: false });
  const projectId = Number(projectIdParam);
  const { data, isLoading, isError, error } = useGetProject({
    projectId,
  });
  const accountProject = data as AccountProject;
  const META_TITLE = `Project ${projectId}`;
  useUpdateBreadcrumb(META_TITLE, accountProject?.project?.name || "");
  useEffect(() => {
    if (accountProject) {
      setAccountProject(accountProject);
    }
  }, [accountProject]);

  if (isLoading) {
    return (
      <PageGrid>
        <ProjectsSkeleton />
      </PageGrid>
    );
  }

  if (!accountProject) return <Navigate to="/error" />;

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return <Outlet />;
}
