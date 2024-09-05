import { SubmissionStatus } from "./Submission";

export type SubmissionItemType = {
  id: number;
  name: string;
};

export interface SubmissionItem {
  id: number;
  package_id: number;
  status: SubmissionStatus;
  submitted_by: string;
  submitted_on: string;
  type: SubmissionItemType;
  type_id: number;
  version: number;
}
