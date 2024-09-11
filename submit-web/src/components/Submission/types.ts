import { SubmissionStatus } from "@/models/Submission";

export type SubmissionItemTableRow = {
  id: number;
  name: string;
  submitted_by: string;
  status: SubmissionStatus;
  version: number;
};
