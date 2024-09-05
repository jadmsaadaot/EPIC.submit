import { PROJECT_STATUS } from "@/components/registration/addProjects/ProjectCard/constants";
import { ProjectStatus } from "@/components/registration/addProjects/ProjectStatus";
import { ContentBox } from "@/components/Shared/ContentBox";
import { YellowBar } from "@/components/Shared/YellowBar";
import DocumentTable from "@/components/Submission/DocumentTable";
import { Box, Button, Grid, Typography } from "@mui/material";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { BCDesignTokens } from "epic.theme";
import { Document } from "@/components/Submission/DocumentTable";
import { useGetProject } from "@/hooks/api/useProjects";
import { AccountProject } from "@/models/Project";
import { PageGrid } from "@/components/Shared/PageGrid";
import SubmissionStatusChip, {
  SUBMISSION_STATUS,
} from "@/components/Submission/SubmissionStatusChip";

export const Route = createFileRoute(
  "/_authenticated/_dashboard/projects/$projectId/submissions/$submissionId"
)({
  component: SubmissionPage,
  meta: () => [{ title: "Submission" }],
});

export default function SubmissionPage() {
  const mockDocuments: Document[] = [];
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
    <PageGrid>
      <Grid item xs={12} lg={10}>
        <ContentBox
          title={accountProject?.project?.name}
          label={`EAC# ${accountProject?.project?.ea_certificate}`}
        >
          <Box
            sx={{
              padding: BCDesignTokens.layoutPaddingMedium,
              display: "flex",
              flexDirection: "column",
              borderRadius: "4px",
              border: `1px solid ${BCDesignTokens.surfaceColorBorderDefault}`,
              gap: BCDesignTokens.layoutPaddingSmall,
            }}
          >
            <Box sx={{ pb: BCDesignTokens.layoutPaddingSmall }}>
              <Typography variant="h4" fontWeight={400}>
                Management Plans
              </Typography>
              <ProjectStatus status={PROJECT_STATUS.POST_DECISION} />
            </Box>
            <Box
              sx={{
                pt: BCDesignTokens.layoutPaddingSmall,
                pb: BCDesignTokens.layoutPaddingMedium,
                px: BCDesignTokens.layoutPaddingMedium,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                borderRadius: "4px",
                border: `1px solid ${BCDesignTokens.surfaceColorBorderDefault}`,
              }}
            >
              <YellowBar />
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: BCDesignTokens.layoutMarginXlarge,
                }}
              >
                <Typography variant="h5">{submissionPackage?.name}</Typography>
                <Box flexDirection={"row"} sx={{ display: "flex" }}>
                  <Typography
                    color={BCDesignTokens.themeGray70}
                    fontWeight={900}
                    sx={{ mr: BCDesignTokens.layoutMarginMedium }}
                  >
                    Submission Status:
                  </Typography>
                  <SubmissionStatusChip
                    status={SUBMISSION_STATUS.PARTIALLY_COMPLETE.value}
                  />
                </Box>
              </Box>
              <Grid
                container
                xs={12}
                sx={{
                  borderRadius: "4px",
                  border: `1px solid ${BCDesignTokens.surfaceColorBorderDefault}`,
                  p: BCDesignTokens.layoutPaddingMedium,
                  pt: 0,
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
              <Box sx={{ mb: BCDesignTokens.layoutMarginXlarge }}>
                <DocumentTable documents={mockDocuments} />
              </Box>
              <Box
                sx={{
                  pt: BCDesignTokens.layoutPaddingXlarge,
                }}
              >
                <Button color="secondary" sx={{ mr: 1 }}>
                  Save & Close
                </Button>
                <Button>Submit Management Plan</Button>
              </Box>
            </Box>
          </Box>
        </ContentBox>
      </Grid>
    </PageGrid>
  );
}
