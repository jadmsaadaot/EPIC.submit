import { useGetProjects } from "@/hooks/api/useProjects";
import { useAccount } from "@/store/accountStore";
import { SubListItem } from "./SubListItem";
import { SubListItemSkeleton } from "./SubListItemSkeleton";
import { useProjectFilters } from "@/components/Filters/projectFilterStore";

export default function ProjectsSubRoutes() {
  const { accountId } = useAccount();
  const { filters, searchEnabled, setSearchEnabled } = useProjectFilters();
  const { data: accountProjects, isPending } = useGetProjects({
    accountId: 1,
    searchOptions: filters,
    enabled: searchEnabled,
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
