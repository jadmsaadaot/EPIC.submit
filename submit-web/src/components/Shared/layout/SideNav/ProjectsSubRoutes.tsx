import { useGetProjects } from "@/hooks/api/useProjects";
import { useAccount } from "@/store/accountStore";
import { SubListItem } from "./SubListItem";
import { SubListItemSkeleton } from "./SubListItemSkeleton";

export default function ProjectsSubRoutes() {
  const { accountId } = useAccount();
  const { data: accountProjects, isPending } = useGetProjects({
    accountId,
  });

  if (isPending) return <SubListItemSkeleton />;

  return accountProjects?.map((accountProject) => (
    <SubListItem
      key={`sub-list-${accountProject.id}`}
      route={{
        name: accountProject.project.name,
        path: `/projects/${accountProject.id}`,
      }}
    />
  ));
}
