import { ProjectsSkeleton } from "@/components/Projects";
import { useAccountProject } from "@/components/Projects/projectStore";
import { useBreadCrumb } from "@/components/Shared/layout/SideNav/breadCrumbStore";
import { PageGrid } from "@/components/Shared/PageGrid";
import { useGetProject } from "@/hooks/api/useProjects";
import { AccountProject } from "@/models/Project";
import {
  createFileRoute,
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
  meta: () => [{ title: "Project Name" }],
});

function ProjectLayout() {
  const { setAccountProject } = useAccountProject();
  const { replaceBreadcrumb } = useBreadCrumb();
  const { projectId: projectIdParam } = useParams({ strict: false });
  const projectId = Number(projectIdParam);
  const { data, isLoading, isError, error } = useGetProject({
    projectId,
  });
  const accountProject = data as AccountProject;
  const matches = useRouterState({ select: (s) => s.matches });
  useEffect(() => {
    if (accountProject) {
      replaceBreadcrumb("Project Name", accountProject?.project.name);
      setAccountProject(accountProject);
    }
  }, [accountProject, matches, replaceBreadcrumb, setAccountProject]);

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

  return <Outlet />;
}
