import { SubmissionStatus } from "@/models/Submission";

export type SubmissionItemTableRow = {
  name: string;
  submitted_by: string;
  status: SubmissionStatus;
  version: number;
};
