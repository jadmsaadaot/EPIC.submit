import { ProjectsSkeleton } from "@/components/Projects";
import { useBreadCrumb } from "@/components/Shared/layout/SideNav/breadCrumbStore";
import { PageGrid } from "@/components/Shared/PageGrid";
import { useGetProject } from "@/hooks/api/useProjects";
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
  const { projectId: projectIdParam } = useParams({ strict: false });
  const projectId = Number(projectIdParam);
  const {
    data: accountProject,
    isLoading,
    isError,
    error,
  } = useGetProject({
    projectId,
  });
  const META_TITLE = `Project ${projectId}`;
  const matches = useRouterState({ select: (s) => s.matches });
  const { replaceBreadcrumb } = useBreadCrumb();
  useEffect(() => {
    if (accountProject) {
      replaceBreadcrumb(META_TITLE, accountProject?.project.name || "");
    }
  }, [accountProject, matches, replaceBreadcrumb, META_TITLE]);

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
