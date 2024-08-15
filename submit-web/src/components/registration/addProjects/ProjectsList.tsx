import { Stack } from "@mui/material";
import { Skeleton } from "./ProjectCard/Skeleton";
import { ProjectCard } from "./ProjectCard";
import { Project } from "@/models/Project";

type ProjectsListProps = {
  projects?: Project[];
};

export const ProjectListSkeleton = () => {
  return (
    <Stack spacing={2} direction="row">
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Stack>
  );
};
export const ProjectsList = ({ projects }: ProjectsListProps) => {
  console.log("projects", projects);
  return (
    <Stack spacing={2} direction="row">
      {projects?.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </Stack>
  );
};
