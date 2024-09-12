import { Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { BCDesignTokens } from "epic.theme";
import { ProjectStatus } from "../ProjectStatus";
import { PROJECT_STATUS } from "./constants";
import { Project } from "@/models/Project";

const CARD_HEIGHT = 301;
const CARD_WIDTH = 380;
const HEADER_HEIGHT = 54;
const BODY_HEIGHT = 247;

const CardInnerBox = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  flexDirection: "column",
  height: "100%",
  padding: "0 12px",
});

export const ManagementPlan = ({ project }: { project: Project }) => {
  return (
    <Paper
      sx={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        border: `4px solid ${BCDesignTokens.themeGold100}`,
        borderRadius: "6px",
      }}
    >
      <Box
        bgcolor={BCDesignTokens.surfaceColorPrimaryButtonDefault}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          borderRadius: "3px 3px 0 0",
        }}
        height={HEADER_HEIGHT}
      >
        <Typography
          variant="h5"
          fontWeight={600}
          px={2}
          color={BCDesignTokens.typographyColorPrimaryInvert}
        >
          {project.name}
        </Typography>
      </Box>
      <Box height={BODY_HEIGHT}>
        <Box
          sx={{
            padding: "36px 12px 12px 12px",
          }}
        >
          <Box
            sx={{
              borderRadius: "3px",
              border: `1px solid ${BCDesignTokens.surfaceColorBorderDefault}`,
              boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
            }}
            height={187}
          >
            <Box height={"50%"}>
              <CardInnerBox>
                <Typography variant="h4" fontWeight={400}>
                  Management Plans
                </Typography>
                <ProjectStatus status={PROJECT_STATUS.POST_DECISION} />
              </CardInnerBox>
            </Box>
            <Box height={"50%"}>
              <CardInnerBox
                sx={{
                  border: `1px solid ${BCDesignTokens.surfaceColorBorderDefault}`,
                }}
              >
                <Typography variant="body1">
                  You will be able to submit Managements Plans for this Project.
                </Typography>
              </CardInnerBox>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
