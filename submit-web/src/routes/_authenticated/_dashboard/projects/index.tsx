import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { BCDesignTokens } from "epic.theme";
import { ProjectStatus } from "@/components/registration/addProjects/ProjectStatus";
import { PROJECT_STATUS } from "@/components/registration/addProjects/ProjectCard/constants";
import AddIcon from "@mui/icons-material/Add";
import { Caption2 } from "@/components/Shared/Typographies";
import { OpenInNew } from "@mui/icons-material";
import ProjectStatusChip from "@/components/Shared/ProjectStatusChip";
import SubmissionTable from "@/components/Projects/SubmissionTable";

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
  const plans: Array<Plan> = [
    {
      id: "1",
      name: "Management Plan 123",
      submittedDate: "2021-10-10",
      submittedBy: "John Doe",
      status: "Approved",
    },
    {
      id: "2",
      name: "Management Plan 456",
      submittedDate: "2021-10-11",
      submittedBy: "Jane Doe",
      status: "In Review",
    },
    {
      id: "1",
      name: "Management Plan 123",
      submittedDate: "2021-10-10",
      submittedBy: "John Doe",
      status: "Approved",
    },
    {
      id: "2",
      name: "Management Plan 456",
      submittedDate: "2021-10-11",
      submittedBy: "Jane Doe",
      status: "In Review",
    },
    {
      id: "1",
      name: "Management Plan 123",
      submittedDate: "2021-10-10",
      submittedBy: "John Doe",
      status: "Approved",
    },
    {
      id: "2",
      name: "Management Plan 456",
      submittedDate: "2021-10-11",
      submittedBy: "Jane Doe",
      status: "In Review",
    },
    {
      id: "1",
      name: "Management Plan 123",
      submittedDate: "2021-10-10",
      submittedBy: "John Doe",
      status: "Approved",
    },
    {
      id: "2",
      name: "Management Plan 456",
      submittedDate: "2021-10-11",
      submittedBy: "Jane Doe",
      status: "In Review",
    },
    {
      id: "1",
      name: "Management Plan 123",
      submittedDate: "2021-10-10",
      submittedBy: "John Doe",
      status: "Approved",
    },
    {
      id: "2",
      name: "Management Plan 456",
      submittedDate: "2021-10-11",
      submittedBy: "Jane Doe",
      status: "In Review",
    },
  ];

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
                <CardInnerBox sx={{ height: "100%" }}>
                  <TableContainer component={Box} sx={{ height: "100%" }}>
                    <Table
                      width={"100%"}
                      sx={{ tableLayout: "fixed" }}
                      aria-label="simple table"
                      stickyHeader
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: BCDesignTokens.themeGray70 }}>
                            Submission Name
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: BCDesignTokens.themeGray70 }}
                          >
                            Submitted On
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: BCDesignTokens.themeGray70 }}
                          >
                            Submitted By
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ color: BCDesignTokens.themeGray70 }}
                          >
                            Status
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <SubmissionTable plans={plans} />
                    </Table>
                  </TableContainer>
                </CardInnerBox>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: BCDesignTokens.themeGold10,
                  }}
                >
                  Past Submissions
                </Typography>
                <CardInnerBox sx={{ height: "100%" }}>
                  <TableContainer component={Box} sx={{ height: "100%" }}>
                    <Table
                      width={"100%"}
                      sx={{ tableLayout: "fixed" }}
                      aria-label="simple table"
                      stickyHeader
                    >
                      <SubmissionTable plans={plans} />
                    </Table>
                  </TableContainer>
                </CardInnerBox>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
