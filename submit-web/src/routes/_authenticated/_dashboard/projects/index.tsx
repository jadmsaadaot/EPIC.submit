import { createFileRoute } from "@tanstack/react-router";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { BCDesignTokens } from "epic.theme";
import { ProjectStatus } from "@/components/registration/addProjects/ProjectStatus";
import { PROJECT_STATUS } from "@/components/registration/addProjects/ProjectCard/constants";
import AddIcon from "@mui/icons-material/Add";
import { Caption2 } from "@/components/Shared/Typographies";

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

export const Route = createFileRoute("/_authenticated/_dashboard/projects/")({
  component: ProjectsPage,
  meta: () => [{ title: "Projects" }],
});

function ProjectsPage() {
  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Paper
        sx={{
          width: "90%",
          height: CARD_HEIGHT,
          borderRadius: "6px",
        }}
        elevation={2}
      >
        <Box
          bgcolor={BCDesignTokens.themeBlue10}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
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
            Copper Mine
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
                border: `1px solid #F2F2F2`,
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
              }}
              height={187}
            >
              <Box
                height={"50%"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <CardInnerBox>
                  <Typography variant="h4" fontWeight={400}>
                    Management Plans
                  </Typography>
                  <ProjectStatus bold status={PROJECT_STATUS.POST_DECISION} />
                </CardInnerBox>
                <CardInnerBox>
                  <Button>
                    <AddIcon sx={{ p: 0, mr: 0.5 }} />
                    New Submission
                  </Button>
                </CardInnerBox>
              </Box>
              <Box height={"50%"} px={BCDesignTokens.layoutPaddingXsmall}>
                <Divider sx={{ mb: 0.5 }} />
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: BCDesignTokens.themeGold10,
                  }}
                >
                  Active Submissions
                </Typography>
                <CardInnerBox></CardInnerBox>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
