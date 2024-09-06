import { PROJECT_STATUS } from "@/components/registration/addProjects/ProjectCard/constants";
import { ProjectStatus } from "@/components/registration/addProjects/ProjectStatus";
import { ContentBox } from "@/components/Shared/ContentBox";
import { YellowBar } from "@/components/Shared/YellowBar";
import ItemsTable from "@/components/Submission/ItemsTable";
import { Box, Button, Grid, Typography } from "@mui/material";
import { createFileRoute, Navigate, useParams } from "@tanstack/react-router";
import { BCDesignTokens } from "epic.theme";
<<<<<<<< HEAD:submit-web/src/routes/_authenticated/_dashboard/projects/$projectId/_projectLayout/submissions/$submissionId.tsx
import { Document } from "@/components/Submission/DocumentTable";
import { PageGrid } from "@/components/Shared/PageGrid";
import SubmissionStatusChip from "@/components/Submission/SubmissionStatusChip";
import { SUBMISSION_STATUS } from "@/models/Submission";
import { useBreadCrumb } from "@/components/Shared/layout/SideNav/breadCrumbStore";
import { useEffect } from "react";
import { useAccountProject } from "@/components/Projects/projectStore";

export const Route = createFileRoute(
  "/_authenticated/_dashboard/projects/$projectId/_projectLayout/submissions/$submissionId"
========
import { useGetProject } from "@/hooks/api/useProjects";
import { PageGrid } from "@/components/Shared/PageGrid";
import SubmissionStatusChip from "@/components/Submission/SubmissionStatusChip";
import { SUBMISSION_STATUS } from "@/models/Submission";
import { InfoBox } from "@/components/Submission/InfoBox";
import { useGetSubmissionPackage } from "@/hooks/api/usePackages";
import { ContentBoxSkeleton } from "@/components/Shared/ContentBox/ContentBoxSkeleton";

export const Route = createFileRoute(
  "/_authenticated/_dashboard/projects/$projectId/submission-packages/$submissionPackageId",
>>>>>>>> upstream/develop:submit-web/src/routes/_authenticated/_dashboard/projects/$projectId/submission-packages/$submissionPackageId.tsx
)({
  component: SubmissionPage,
  meta: () => [{ title: "Submission Name" }],
});

export default function SubmissionPage() {
<<<<<<<< HEAD:submit-web/src/routes/_authenticated/_dashboard/projects/$projectId/_projectLayout/submissions/$submissionId.tsx
  const mockDocuments: Document[] = [
    {
      id: 1,
      name: "Document 1",
      created_by: "User A",
      version: "1.0",
      status: SUBMISSION_STATUS.COMPLETED.value,
      actions: ["Edit", "Delete"],
    },
    {
      id: 2,
      name: "Document 2",
      created_by: "User B",
      version: "1.1",
      status: SUBMISSION_STATUS.SUBMITTED.value,
      actions: ["Edit", "Delete"],
    },
    {
      id: 3,
      name: "Document 3",
      created_by: "User C",
      version: "2.0",
      status: SUBMISSION_STATUS.SUBMITTED.value,
      actions: ["Edit", "Delete"],
    },
    {
      id: 4,
      name: "Document 4",
      created_by: "User D",
      version: "2.1",
      status: SUBMISSION_STATUS.COMPLETED.value,
      actions: ["Edit", "Delete"],
    },
    {
      id: 5,
      name: "Document 5",
      created_by: "User E",
      version: "3.0",
      status: SUBMISSION_STATUS.SUBMITTED.value,
      actions: ["Edit", "Delete"],
    },
  ];
  const { submissionId: submissionIdParam } = useParams({ strict: false });
  const { replaceBreadcrumb } = useBreadCrumb();
  const { accountProject } = useAccountProject();
  const submissionId = Number(submissionIdParam);
  const submissionPackage = accountProject?.packages.find(
    (p) => p.id === submissionId
  );
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
>>>>>>>> upstream/develop:submit-web/src/routes/_authenticated/_dashboard/projects/$projectId/submission-packages/$submissionPackageId.tsx

  useEffect(() => {
    if (submissionPackage?.name) {
      replaceBreadcrumb("Submission Name", submissionPackage.name);
    }
  }, [submissionPackage, replaceBreadcrumb]);

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
