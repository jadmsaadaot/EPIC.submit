import { SubmissionStatus } from "./Submission";

type SubmissionItemTypeName =
  | "Contact Information"
  | "Management Plan Submission"
  | "Consultation Record(s)";

export type SubmissionItemType = {
  id: number;
  name: SubmissionItemTypeName;
};

export const SUBMISSION_ITEM_TYPE: Record<string, SubmissionItemTypeName> = {
  CONTACT_INFORMATION: "Contact Information",
  MANAGEMENT_PLAN: "Management Plan Submission",
  CONSULTATION_RECORD: "Consultation Record(s)",
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
