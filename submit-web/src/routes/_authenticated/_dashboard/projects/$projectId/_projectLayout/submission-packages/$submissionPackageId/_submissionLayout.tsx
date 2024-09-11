import { useAccountProject } from "@/components/Projects/projectStore";
import { ContentBoxSkeleton } from "@/components/Shared/ContentBox/ContentBoxSkeleton";
import { useBreadCrumb } from "@/components/Shared/layout/SideNav/breadCrumbStore";
import { PageGrid } from "@/components/Shared/PageGrid";
import { useGetSubmissionPackage } from "@/hooks/api/usePackages";
import { Grid } from "@mui/material";
import {
  createFileRoute,
  Navigate,
  Outlet,
  useParams,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";
export const Route = createFileRoute(
  "/_authenticated/_dashboard/projects/$projectId/_projectLayout/submission-packages/$submissionPackageId/_submissionLayout"
)({
  component: SubmissionLayout,
  meta: ({ params }) => [{ title: `Submission ${params.submissionPackageId}` }],
});

export default function SubmissionLayout() {
  const { submissionPackageId: submissionPackageIdParam } = useParams({
    strict: false,
  });
  const submissionPackageId = Number(submissionPackageIdParam);
  const { accountProject, setSubmissionPackage } = useAccountProject();
  const META_TITLE = `Submission ${submissionPackageId}`;
  const { data: submissionPackage, isPending: isSubPackageLoading } =
    useGetSubmissionPackage({
      packageId: submissionPackageId,
      enabled: Boolean(accountProject?.id),
    });
  const { replaceBreadcrumb } = useBreadCrumb();
  const matches = useRouterState({ select: (s) => s.matches });

  useEffect(() => {
    if (submissionPackage) {
      setSubmissionPackage(submissionPackage);
      replaceBreadcrumb(META_TITLE, submissionPackage?.name || "");
    }
  }, [
    submissionPackage,
    matches,
    setSubmissionPackage,
    replaceBreadcrumb,
    META_TITLE,
  ]);

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

  return <Outlet />;
}
