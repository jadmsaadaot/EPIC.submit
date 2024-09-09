import { useAccountProject } from "@/components/Projects/projectStore";
import { ContentBoxSkeleton } from "@/components/Shared/ContentBox/ContentBoxSkeleton";
import { PageGrid } from "@/components/Shared/PageGrid";
import { useGetSubmissionPackage } from "@/hooks/api/usePackages";
import { useUpdateBreadcrumb } from "@/hooks/common";
import { Grid } from "@mui/material";
import {
  createFileRoute,
  Navigate,
  Outlet,
  useParams,
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
  console.log("submissionPackageId", submissionPackageId);
  const { data: submissionPackage, isPending: isSubPackageLoading } =
    useGetSubmissionPackage({
      packageId: submissionPackageId,
      enabled: Boolean(accountProject?.id),
    });
  useUpdateBreadcrumb(META_TITLE, submissionPackage?.name || "");
  useEffect(() => {
    if (submissionPackage) {
      setSubmissionPackage(submissionPackage);
    }
  }, [submissionPackage]);

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
