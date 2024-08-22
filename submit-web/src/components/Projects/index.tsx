import { AccountProject } from "@/models/Project";
import { Skeleton, Stack } from "@mui/material";
import { Project } from "./Project";

type ProjectsParams = {
  accountProjects: AccountProject[];
};
export const Projects = ({ accountProjects }: ProjectsParams) => {
  return (
    <Stack spacing={2} direction={"column"}>
      {accountProjects.map((accountProject) => (
        <Project key={accountProject.id} accountProject={accountProject} />
      ))}
    </Stack>
  );
};

export const ProjectsSkeleton = () => {
  return (
    <Stack spacing={2} direction={"column"}>
      <Skeleton variant="rectangular" height={690} width={1334} />
      <Skeleton variant="rectangular" height={690} width={1334} />
      <Skeleton variant="rectangular" height={690} width={1334} />
    </Stack>
  );
};
