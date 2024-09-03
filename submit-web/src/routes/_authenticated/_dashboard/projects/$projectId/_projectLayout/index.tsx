import { ProjectsSkeleton } from "@/components/Projects";
import { PageGrid } from "@/components/Shared/PageGrid";
import { AccountProject } from "@/models/Project";
import { Box, Divider, Typography } from "@mui/material";
import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { useGetProject } from "@/hooks/api/useProjects";
import { BCDesignTokens } from "epic.theme";
import SubmissionPackageTable from "@/components/Projects/ProjectTable";
import { PACKAGE_STATUS } from "@/models/Package";
import { CardInnerBox } from "@/components/Projects/Project";

export const Route = createFileRoute(
  "/_authenticated/_dashboard/projects/$projectId/_projectLayout/"
)({
  component: ProjectData,
  meta: () => [{ title: "Project" }],
  notFoundComponent: () => {
    return <p>Project not found!</p>;
  },
});

function ProjectData() {
  const { projectId: projectIdParam } = useParams({ strict: false });
  const projectId = Number(projectIdParam);
  const { data, isError, error, isLoading } = useGetProject({
    projectId,
  });
  const project = data as AccountProject;
  const navigate = useNavigate();
  const activeSubmissionPackages = project?.packages.filter(
    (subPackage) => subPackage.status === PACKAGE_STATUS.IN_REVIEW.value
  );
  const pastSubmissionPackages = project?.packages.filter(
    (subPackage) => subPackage.status !== PACKAGE_STATUS.IN_REVIEW.value
  );

  if (isLoading) {
    return (
      <PageGrid>
        <ProjectsSkeleton />
      </PageGrid>
    );
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  const handleSubmissionClick = (submissionId: number) => {
    navigate({ to: `/projects/${projectId}/submission/${submissionId}` });
  };

  return (
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
      <CardInnerBox
        sx={{ height: "100%", py: BCDesignTokens.layoutPaddingSmall }}
      >
        <SubmissionPackageTable
          onSubmissionClick={handleSubmissionClick}
          submissionPackages={activeSubmissionPackages}
        />
      </CardInnerBox>
      <Divider
        sx={{
          mb: BCDesignTokens.layoutPaddingXsmall,
          mt: BCDesignTokens.layoutPaddingSmall,
        }}
      />
      <Typography
        variant="body1"
        sx={{
          fontWeight: "bold",
          backgroundColor: BCDesignTokens.themeGold10,
        }}
      >
        Past Submissions
      </Typography>
      <CardInnerBox
        sx={{ height: "100%", py: BCDesignTokens.layoutPaddingMedium }}
      >
        <SubmissionPackageTable
          headless
          submissionPackages={pastSubmissionPackages}
          onSubmissionClick={handleSubmissionClick}
        />
      </CardInnerBox>
    </Box>
  );
}
