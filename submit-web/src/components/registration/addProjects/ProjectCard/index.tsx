import { Case, Switch } from "react-if";
import { ManagementPlan } from "./ManagementPlan";
import { PROJECT_STATUS } from "./constants";
import { Project } from "@/models/Project";

type ProjectCardProps = {
  project: Project;
};
export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Switch>
      <Case condition={project.status === PROJECT_STATUS.POST_DECISION}>
        <ManagementPlan project={project} />
      </Case>
    </Switch>
  );
};
