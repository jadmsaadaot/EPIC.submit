import { PROJECT_STATUS } from "@/components/registration/addProjects/ProjectCard/constants";
import { ProjectStatus } from "@/components/registration/addProjects/ProjectStatus";
import { ContentBox } from "@/components/Shared/ContentBox";
import { YellowBar } from "@/components/Shared/YellowBar";
import ItemsTable from "@/components/Submission/ItemsTable";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
  createFileRoute,
  Navigate,
  useParams,
  useRouterState,
} from "@tanstack/react-router";
import { BCDesignTokens } from "epic.theme";
import { useGetProject } from "@/hooks/api/useProjects";
import { PageGrid } from "@/components/Shared/PageGrid";
import SubmissionStatusChip from "@/components/Submission/SubmissionStatusChip";
import { SUBMISSION_STATUS } from "@/models/Submission";
import { InfoBox } from "@/components/Submission/InfoBox";
import { useGetSubmissionPackage } from "@/hooks/api/usePackages";
import { ContentBoxSkeleton } from "@/components/Shared/ContentBox/ContentBoxSkeleton";
import { useUpdateBreadcrumb } from "@/hooks/common";

export const Route = createFileRoute(
  "/_authenticated/_dashboard/projects/_projectLayout/$projectId/submission-packages/$submissionPackageId"
)({
  component: SubmissionPage,
  meta: () => [{ title: "Submission" }],
});

export default function SubmissionPage() {
  const {
    projectId: projectIdParam,
    submissionPackageId: submissionPackageIdParam,
  } = useParams({ strict: false });
  const router = useRouterState();
  const projectId = Number(projectIdParam);
  const submissionPackageId = Number(submissionPackageIdParam);
  const { data: accountProject } = useGetProject({
    projectId,
  });

  useUpdateBreadcrumb(
    router.location.pathname,
    accountProject?.project?.name || ""
  );

  const { data: submissionPackage, isPending: isSubPackageLoading } =
    useGetSubmissionPackage({
      packageId: submissionPackageId,
      enabled: Boolean(accountProject?.id),
    });

  if (isSubPackageLoading) {
    return (
      <PageGrid>
        <Grid item xs={12} lg={10}>
          <ContentBoxSkeleton />
        </Grid>
      </PageGrid>
    );
  }

  if (!accountProject || !submissionPackage) {
    return <Navigate to={"/error"} />;
  }

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
              <InfoBox submissionPackage={submissionPackage} />
              <Box sx={{ mb: BCDesignTokens.layoutMarginXlarge }}>
                <ItemsTable submissionItems={submissionPackage.items} />
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
