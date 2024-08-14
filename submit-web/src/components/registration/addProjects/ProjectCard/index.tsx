import { Case, Switch } from "react-if";
import { ManagementPlan } from "./ManagementPlan";
import { PROJECT_STATUS } from "./constants";

type ProjectCardProps = {
  status: string;
};
export const ProjectCard = ({ status }: ProjectCardProps) => {
  return (
    <Switch>
      <Case condition={status === PROJECT_STATUS.POST_DECISION}>
        <ManagementPlan />
      </Case>
    </Switch>
  );
};
