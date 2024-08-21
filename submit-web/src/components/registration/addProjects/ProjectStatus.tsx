import { Caption2 } from "@/components/Shared/Typographies";
import { Case, Default, Switch } from "react-if";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import { Stack } from "@mui/material";
import { PROJECT_STATUS } from "./ProjectCard/constants";

type ProjectStatusProps = {
  status: string;
  bold?: boolean;
};
export const ProjectStatus = ({ status, bold = false }: ProjectStatusProps) => {
  return (
    <Switch>
      <Case condition={status === PROJECT_STATUS.POST_DECISION}>
        <Stack
          spacing={1}
          direction="row"
          alignItems={"center"}
          color={"#947BB6"}
        >
          <ModeStandbyIcon />
          <Caption2 color={"#947BB6"} bold={bold}>
            Post-Decision
          </Caption2>
        </Stack>
      </Case>
      <Default>
        <Caption2>{status}</Caption2>
      </Default>
    </Switch>
  );
};
