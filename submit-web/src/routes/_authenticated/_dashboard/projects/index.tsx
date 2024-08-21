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
import SubmissionTable from "@/components/Projects/SubmissionTable";
import { defaultPlans } from "@/components/Projects/constants";
import { usePlansData } from "@/hooks/api/usePlans";
import { Plan } from "@/models/Plan";

const HEADER_HEIGHT = 54;

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
  const { data: plansData } = usePlansData();

  const plans = (plansData as Plan[]) || defaultPlans;

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Paper
        sx={{
          width: "90%",
          height: "100%",
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
            Copper Mine
          </Typography>
          <Typography
            variant="h4"
            color={BCDesignTokens.themeGray70}
            sx={{
              mr: 2,
              fontWeight: 400,
            }}
          >
            EAC #1234567
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
              sx={{ py: BCDesignTokens.layoutPaddingXlarge }}
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
            <Box height={"100%"} px={BCDesignTokens.layoutPaddingXsmall}>
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
              <CardInnerBox sx={{ height: "100%", py: 2 }}>
                <SubmissionTable plans={plans} />
              </CardInnerBox>
              <Divider sx={{ mb: 0.5 }} />
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  backgroundColor: BCDesignTokens.themeGold10,
                }}
              >
                Past Submissions
              </Typography>
              <CardInnerBox sx={{ height: "100%", my: 2 }}>
                <SubmissionTable headless plans={plans} />
              </CardInnerBox>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
