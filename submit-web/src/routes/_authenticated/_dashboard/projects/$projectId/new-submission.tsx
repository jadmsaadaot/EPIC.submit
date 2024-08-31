import { Form } from "@/components/NewManagementPlan/Form";
import { PROJECT_STATUS } from "@/components/registration/addProjects/ProjectCard/constants";
import { ProjectStatus } from "@/components/registration/addProjects/ProjectStatus";
import { ContentBox } from "@/components/Shared/ContentBox";
import { PageGrid } from "@/components/Shared/PageGrid";
import { YellowBar } from "@/components/Shared/YellowBar";
import { Box, Grid, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { BCDesignTokens } from "epic.theme";

export const Route = createFileRoute(
  "/_authenticated/_dashboard/projects/$projectId/new-submission",
)({
  component: NewManagementPlan,
});

export function NewManagementPlan() {
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
              <Form />
            </Box>
          </Box>
        </ContentBox>
      </Grid>
    </PageGrid>
  );
}
