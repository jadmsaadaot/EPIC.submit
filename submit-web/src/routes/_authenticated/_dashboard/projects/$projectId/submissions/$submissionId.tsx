import { CardInnerBox } from "@/components/Projects/Project";
import { PROJECT_STATUS } from "@/components/registration/addProjects/ProjectCard/constants";
import { ProjectStatus } from "@/components/registration/addProjects/ProjectStatus";
import { ContentBox } from "@/components/Shared/ContentBox";
import { YellowBar } from "@/components/Shared/YellowBar";
import DocumentTable from "@/components/Submission/DocumentTable";
import { PACKAGE_STATUS } from "@/models/Package";
import { Box, Chip, Grid, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { BCDesignTokens } from "epic.theme";

export const Route = createFileRoute(
  "/_authenticated/_dashboard/projects/$projectId/submissions/$submissionId"
)({
  component: SubmissionPage,
  meta: () => [{ title: "Submission" }],
});

export default function SubmissionPage() {
  const mockDocuments: Document[] = [
    {
      id: 1,
      name: "Document 1",
      created_by: "User A",
      version: "1.0",
      status: PACKAGE_STATUS.IN_REVIEW.value,
      actions: ["Edit", "Delete"],
    },
    {
      id: 2,
      name: "Document 2",
      created_by: "User B",
      version: "1.1",
      status: PACKAGE_STATUS.APPROVED.value,
      actions: ["Edit", "Delete"],
    },
    {
      id: 3,
      name: "Document 3",
      created_by: "User C",
      version: "2.0",
      status: PACKAGE_STATUS.REJECTED.value,
      actions: ["Edit", "Delete"],
    },
    {
      id: 4,
      name: "Document 4",
      created_by: "User D",
      version: "2.1",
      status: PACKAGE_STATUS.IN_REVIEW.value,
      actions: ["Edit", "Delete"],
    },
    {
      id: 5,
      name: "Document 5",
      created_by: "User E",
      version: "3.0",
      status: PACKAGE_STATUS.APPROVED.value,
      actions: ["Edit", "Delete"],
    },
  ];

  return (
    <ContentBox title={"Copper Mine"} label={"#EAOC123213"}>
      <Box
        sx={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "4px",
          border: `1px solid ${BCDesignTokens.surfaceColorBorderDefault}`,
          gap: BCDesignTokens.layoutPaddingSmall,
        }}
      >
        <Typography variant="h4" fontWeight={400}>
          Management Plans
        </Typography>
        <ProjectStatus status={PROJECT_STATUS.POST_DECISION} />
        <Box
          sx={{
            padding: "24px 16px 16px 16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            borderRadius: "4px",
            border: `1px solid ${BCDesignTokens.surfaceColorBorderDefault}`,
            gap: BCDesignTokens.layoutPaddingSmall,
          }}
        >
          <YellowBar />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5">WildLife management plan</Typography>
            <Box>
              Status: <Chip label="In Review" />
            </Box>
          </Box>
          <Grid
            container
            xs={12}
            spacing={2}
            sx={{
              borderRadius: "4px",
              border: `1px solid ${BCDesignTokens.surfaceColorBorderDefault}`,
            }}
          >
            <Grid item xs={4}>
              Container
            </Grid>
            <Grid item xs={4}>
              Date Submitted
            </Grid>
            <Grid item xs={4}>
              Date Review Completed
            </Grid>
            <Grid item xs={4}>
              Supporting Conditions:
            </Grid>
            <Grid item xs={4}>
              Submitted by:
            </Grid>
          </Grid>
        </Box>
      </Box>
      <CardInnerBox />
      <DocumentTable documents={mockDocuments} />
    </ContentBox>
  );
}
