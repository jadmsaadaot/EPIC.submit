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

export type SubmittedForm = {
  id: number;
  form_json: { [x: string]: unknown };
};

export type SubmissionType = "FORM" | "DOCUMENT" | "BUSINESS_DATA";
export const SUBMISSION_TYPE: Record<SubmissionType, SubmissionType> = {
  FORM: "FORM",
  DOCUMENT: "DOCUMENT",
  BUSINESS_DATA: "BUSINESS_DATA",
};

export type Submission = {
  id: number;
  item_id: number;
  version: number;
  data_type: string;
  data: SubmittedForm;
};
