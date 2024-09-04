import { Form } from "@/components/NewManagementPlan/Form";
import { NewManagementPlanForm } from "@/components/NewManagementPlan/types";
import { PROJECT_STATUS } from "@/components/registration/addProjects/ProjectCard/constants";
import { ProjectStatus } from "@/components/registration/addProjects/ProjectStatus";
import { ContentBox } from "@/components/Shared/ContentBox";
import { useLoaderBackdrop } from "@/components/Shared/Overlays/loaderBackdropStore";
import { PageGrid } from "@/components/Shared/PageGrid";
import { notify } from "@/components/Shared/Snackbar/snackbarStore";
import { SUBMISSION_PACKAGE_TYPE } from "@/components/Shared/types";
import { YellowBar } from "@/components/Shared/YellowBar";
import { useCreateSubmissionPackage } from "@/hooks/api/usePackages";
import { Box, Grid, Typography } from "@mui/material";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BCDesignTokens } from "epic.theme";
import { useEffect } from "react";

export const Route = createFileRoute(
  "/_authenticated/_dashboard/projects/$projectId/new-submission",
)({
  component: NewManagementPlan,
});

export function NewManagementPlan() {
  // get the projectId from the route
  const { projectId } = Route.useParams();
  const { setIsOpen } = useLoaderBackdrop();
  const navigate = useNavigate();

  const onCreateFailure = () =>
    notify.error("Failed to create submission package");

  const onCreateSuccess = () => {
    notify.success("Submission package created successfully");
    navigate({ to: `/projects/${projectId}` });
  };
  const {
    mutate: createSubmissionPackage,
    isPending: isCreatingSubmissionPackagePending,
  } = useCreateSubmissionPackage({
    onError: onCreateFailure,
    onSuccess: onCreateSuccess,
  });

  useEffect(() => {
    setIsOpen(isCreatingSubmissionPackagePending);
    return () => setIsOpen(false);
  }, [isCreatingSubmissionPackagePending]);

  const onCreateSubmissionPackage = (metadata: NewManagementPlanForm) => {
    const { name, ...restMetadata } = metadata;
    const newSubmissionPackageRequest = {
      name: name?.value ?? SUBMISSION_PACKAGE_TYPE.MANAGEMENT_PLAN,
      metadata: restMetadata,
      type: SUBMISSION_PACKAGE_TYPE.MANAGEMENT_PLAN,
    };
    createSubmissionPackage({
      accountProjectId: Number(projectId),
      data: newSubmissionPackageRequest,
    });
    return newSubmissionPackageRequest;
  };

  return (
    <PageGrid>
      <Grid item xs={12}>
        <ContentBox title={"Copper Mine"}>
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
              <Typography variant="h5">New Submission</Typography>
              <Form onSubmit={onCreateSubmissionPackage} />
            </Box>
          </Box>
        </ContentBox>
      </Grid>
    </PageGrid>
  );
}
