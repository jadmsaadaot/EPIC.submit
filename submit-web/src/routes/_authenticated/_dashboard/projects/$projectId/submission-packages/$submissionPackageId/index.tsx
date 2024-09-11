import { PROJECT_STATUS } from "@/components/registration/addProjects/ProjectCard/constants";
import { ProjectStatus } from "@/components/registration/addProjects/ProjectStatus";
import { ContentBox } from "@/components/Shared/ContentBox";
import { YellowBar } from "@/components/Shared/YellowBar";
import ItemsTable from "@/components/Submission/ItemsTable";
import { Box, Button, Grid, Typography } from "@mui/material";
<<<<<<<< HEAD:submit-web/src/routes/_authenticated/_dashboard/projects/$projectId/_projectLayout/submission-packages/$submissionPackageId/_submissionLayout/index.tsx
import { createFileRoute } from "@tanstack/react-router";
========
import {
  createFileRoute,
  Navigate,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
>>>>>>>> upstream/develop:submit-web/src/routes/_authenticated/_dashboard/projects/$projectId/submission-packages/$submissionPackageId/index.tsx
import { BCDesignTokens } from "epic.theme";
import { PageGrid } from "@/components/Shared/PageGrid";
import SubmissionStatusChip from "@/components/Submission/SubmissionStatusChip";
import { SUBMISSION_STATUS } from "@/models/Submission";
import { InfoBox } from "@/components/Submission/InfoBox";
<<<<<<<< HEAD:submit-web/src/routes/_authenticated/_dashboard/projects/$projectId/_projectLayout/submission-packages/$submissionPackageId/_submissionLayout/index.tsx
import { useAccountProject } from "@/components/Projects/projectStore";

export const Route = createFileRoute(
  "/_authenticated/_dashboard/projects/$projectId/_projectLayout/submission-packages/$submissionPackageId/_submissionLayout/"
========
import { useGetSubmissionPackage } from "@/hooks/api/usePackages";
import { ContentBoxSkeleton } from "@/components/Shared/ContentBox/ContentBoxSkeleton";
import { notify } from "@/components/Shared/Snackbar/snackbarStore";

export const Route = createFileRoute(
  "/_authenticated/_dashboard/projects/$projectId/submission-packages/$submissionPackageId/"
>>>>>>>> upstream/develop:submit-web/src/routes/_authenticated/_dashboard/projects/$projectId/submission-packages/$submissionPackageId/index.tsx
)({
  component: SubmissionPage,
});

export default function SubmissionPage() {
<<<<<<<< HEAD:submit-web/src/routes/_authenticated/_dashboard/projects/$projectId/_projectLayout/submission-packages/$submissionPackageId/_submissionLayout/index.tsx
  const { accountProject, submissionPackage } = useAccountProject();
========
  const {
    projectId: projectIdParam,
    submissionPackageId: submissionPackageIdParam,
  } = useParams({ strict: false });
  const projectId = Number(projectIdParam);
  const submissionPackageId = Number(submissionPackageIdParam);
  const { data: accountProject } = useGetProject({
    projectId,
  });
  const navigate = useNavigate();

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
    notify.error("Failed to load submission package");
    return <Navigate to={"/error"} />;
  }
>>>>>>>> upstream/develop:submit-web/src/routes/_authenticated/_dashboard/projects/$projectId/submission-packages/$submissionPackageId/index.tsx

  return (
    <PageGrid>
      <Grid item xs={12} lg={10}>
        <ContentBox
          mainLabel={accountProject?.project?.name}
          label={
            accountProject?.project.ea_certificate
              ? `EAC #${accountProject?.project?.ea_certificate}`
              : ""
          }
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
              <Box
                sx={{
                  mb: BCDesignTokens.layoutMarginXlarge,
                  pt: BCDesignTokens.layoutPaddingSmall,
                }}
              >
                <ItemsTable submissionItems={submissionPackage.items} />
              </Box>
              <Box
                sx={{
                  pt: BCDesignTokens.layoutPaddingXlarge,
                }}
              >
                <Button
                  color="secondary"
                  sx={{ mr: 1 }}
                  onClick={() =>
                    navigate({ to: `/projects/${accountProject.id}` })
                  }
                >
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
