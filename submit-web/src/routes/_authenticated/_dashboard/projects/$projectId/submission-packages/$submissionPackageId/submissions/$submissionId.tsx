import { ContentBoxSkeleton } from "@/components/Shared/ContentBox/ContentBoxSkeleton";
import { PageGrid } from "@/components/Shared/PageGrid";
import { notify } from "@/components/Shared/Snackbar/snackbarStore";
import { ItemForm } from "@/components/SubmissionItem/ItemForm";
import { useSubmissionItemStore } from "@/components/SubmissionItem/submissionItemStore";
import { useGetSubmissionItem } from "@/hooks/api/useItems";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute(
  "/_authenticated/_dashboard/projects/$projectId/submission-packages/$submissionPackageId/submissions/$submissionId",
)({
  component: Submission,
});

export function Submission() {
  const { submissionId: subItemId } = Route.useParams();
  const {
    data: submissionItem,
    isPending: isSubmissionPending,
    isSuccess,
  } = useGetSubmissionItem({ itemId: Number(subItemId) });
  const { setSubmissionItem, reset } = useSubmissionItemStore();

  useEffect(() => {
    if (isSuccess) {
      setSubmissionItem(submissionItem);
    }
    return () => reset();
  }, [
    isSuccess,
    setSubmissionItem,
    reset,
    isSubmissionPending,
    submissionItem,
  ]);

  if (isSubmissionPending) {
    return (
      <PageGrid>
        <ContentBoxSkeleton />
      </PageGrid>
    );
  }

  if (!submissionItem) {
    notify.error("Failed to load submission item");
    return <Navigate to="/error" />;
  }
  return (
    <PageGrid>
      <ItemForm submissionItem={submissionItem} />
    </PageGrid>
  );
}
