import { PROJECT_STATUS } from "@/components/registration/addProjects/ProjectCard/constants";
import { ProjectStatus } from "@/components/registration/addProjects/ProjectStatus";
import { ContentBox } from "@/components/Shared/ContentBox";
import { YellowBar } from "@/components/Shared/YellowBar";
import DocumentTable from "@/components/Submission/DocumentTable";
import { PACKAGE_STATUS } from "@/models/Package";
import { Box, Button, Grid, Typography } from "@mui/material";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { BCDesignTokens } from "epic.theme";
import { Document } from "@/components/Submission/DocumentTable";
import { useGetProject } from "@/hooks/api/useProjects";
import { AccountProject } from "@/models/Project";
import PackageStatusChip from "@/components/Projects/ProjectStatusChip";

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
  const { projectId: projectIdParam, submissionId: submissionIdParam } =
    useParams({ strict: false });
  const projectId = Number(projectIdParam);
  const submissionId = Number(submissionIdParam);
  const { data } = useGetProject({
    projectId,
  });
  const accountProject = data as AccountProject;
  const submissionPackage = accountProject?.packages.find(
    (p) => p.id === submissionId
  );

  return (
    <ContentBox
      title={accountProject?.project?.name}
      label={accountProject?.project?.ea_certificate}
    >
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
            py: BCDesignTokens.layoutPaddingLarge,
            px: BCDesignTokens.layoutPaddingMedium,
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
              mb: BCDesignTokens.layoutPaddingSmall,
            }}
          >
            <Typography variant="h5">{submissionPackage?.name}</Typography>
            <Box flexDirection={"row"} sx={{ display: "flex" }}>
              <Typography
                color={BCDesignTokens.themeGray70}
                fontWeight={900}
                sx={{ mr: 1 }}
              >
                Status:
              </Typography>
              <PackageStatusChip
                status={submissionPackage?.status || "APPROVED"}
              />
            </Box>
          </Box>
          <Grid
            container
            xs={12}
            sx={{
              borderRadius: "4px",
              border: `1px solid ${BCDesignTokens.surfaceColorBorderDefault}`,
              p: 2,
            }}
            rowSpacing={2}
          >
            <Grid item xs={4} container>
              <Typography color={BCDesignTokens.themeGray70}>
                Condition:
              </Typography>
            </Grid>
            <Grid item xs={4} container>
              <Typography color={BCDesignTokens.themeGray70}>
                Date Submitted:
              </Typography>{" "}
              <Typography color={"inherit"}>
                {submissionPackage?.submitted_on}
              </Typography>
            </Grid>
            <Grid item xs={4} container>
              <Typography color={BCDesignTokens.themeGray70}>
                Date Review Completed:
              </Typography>
            </Grid>
            <Grid item xs={4} container>
              <Typography color={BCDesignTokens.themeGray70}>
                Supporting Conditions:
              </Typography>
            </Grid>
            <Grid item xs={4} container>
              <Typography color={BCDesignTokens.themeGray70}>
                Submitted by:
              </Typography>
              <Typography color={"inherit"}>
                {submissionPackage?.submitted_by}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <DocumentTable documents={mockDocuments} />
        <Box
          sx={{
            p: 2,
          }}
        >
          <Button sx={{ mr: 1 }}>Save & Close</Button>
          <Button>Submit Management Plan</Button>
        </Box>
      </Box>
    </ContentBox>
  );
}
