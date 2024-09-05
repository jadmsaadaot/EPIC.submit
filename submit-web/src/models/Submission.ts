export type SubmissionStatus =
  | "NEW_SUBMISSION"
  | "COMPLETED"
  | "PARTIALLY_COMPLETE"
  | "SUBMITTED";
export const SUBMISSION_STATUS: Record<
  SubmissionStatus,
  { value: SubmissionStatus; label: string }
> = {
  NEW_SUBMISSION: {
    value: "NEW_SUBMISSION",
    label: "New Submission",
  },
  COMPLETED: {
    value: "COMPLETED",
    label: "Completed",
  },
  PARTIALLY_COMPLETE: {
    value: "PARTIALLY_COMPLETE",
    label: "Partially Complete",
  },
  SUBMITTED: {
    value: "SUBMITTED",
    label: "Submitted",
  },
};
