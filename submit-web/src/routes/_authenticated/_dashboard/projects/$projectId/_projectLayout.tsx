import { ProjectsSkeleton } from "@/components/Projects";
import { useAccountProject } from "@/components/Projects/projectStore";
import { useBreadCrumb } from "@/components/Shared/layout/SideNav/breadCrumbStore";
import { PageGrid } from "@/components/Shared/PageGrid";
import { useGetProject } from "@/hooks/api/useProjects";
import { AccountProject } from "@/models/Project";
import {
  createFileRoute,
  Navigate,
  Outlet,
  useParams,
  useRouterState,
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
  const matches = useRouterState({ select: (s) => s.matches });
  const { replaceBreadcrumb } = useBreadCrumb();
  useEffect(() => {
    if (accountProject) {
      setAccountProject(accountProject);
      replaceBreadcrumb(META_TITLE, accountProject?.project.name || "");
    }
  }, [
    accountProject,
    matches,
    setAccountProject,
    replaceBreadcrumb,
    META_TITLE,
  ]);

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
