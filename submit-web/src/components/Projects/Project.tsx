import { Box, Button, Paper, styled, Typography } from "@mui/material";
import { BCDesignTokens } from "epic.theme";
import AddIcon from "@mui/icons-material/Add";
import { ProjectStatus } from "../registration/addProjects/ProjectStatus";
import { PROJECT_STATUS } from "../registration/addProjects/ProjectCard/constants";
import { AccountProject } from "@/models/Project";
import { Outlet, useNavigate } from "@tanstack/react-router";

const HEADER_HEIGHT = 54;

export const CardInnerBox = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  flexDirection: "column",
  height: "100%",
  padding: "0 12px",
});

type ProjectParam = {
  accountProject: AccountProject;
};

export const Project = ({ accountProject }: ProjectParam) => {
  const navigate = useNavigate();

  const { name, ea_certificate } = accountProject.project;

  const handleNewSubmission = () => {
    navigate({ to: `/projects/${accountProject.id}/new-submission` });
  };
  return (
    <Paper
      sx={{
        width: "auto",
        borderRadius: "6px",
      }}
      elevation={2}
    >
      <Box
        bgcolor={BCDesignTokens.themeBlue10}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "3px 3px 0 0",
        }}
        height={HEADER_HEIGHT}
      >
        <Typography
          variant="h3"
          fontWeight={600}
          px={2}
          color={BCDesignTokens.typographyColorPrimary}
        >
          {name}
        </Typography>
        <Typography
          variant="h4"
          color={BCDesignTokens.themeGray70}
          sx={{
            mr: 2,
            fontWeight: 400,
          }}
        >
          {ea_certificate ? `EAC #${ea_certificate}` : ""}
        </Typography>
      </Box>

      <Box
        sx={{
          padding: "36px 12px 12px 12px",
        }}
      >
        <Box
          sx={{
            borderRadius: "3px",
            border: `1px solid #F2F2F2`,
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            sx={{
              pt: BCDesignTokens.layoutPaddingMedium,
              pb: BCDesignTokens.layoutPaddingXlarge,
            }}
          >
            <CardInnerBox>
              <Typography variant="h4" fontWeight={400}>
                Management Plans
              </Typography>
              <ProjectStatus status={PROJECT_STATUS.POST_DECISION} />
            </CardInnerBox>
            <CardInnerBox>
              <Button onClick={handleNewSubmission}>
                <AddIcon sx={{ p: 0, mr: 0.5 }} />
                New Submission
              </Button>
            </CardInnerBox>
          </Box>
          <Outlet />
        </Box>
      </Box>
    </Paper>
  );
};
