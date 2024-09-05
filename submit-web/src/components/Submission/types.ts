import { SubmissionStatus } from "@/models/Submission";

export type SubmissionItemTableRow = {
  name: string;
  created_by: string;
  status: SubmissionStatus;
  version: number;
};
