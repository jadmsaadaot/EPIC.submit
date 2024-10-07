import { Submission, SubmissionStatus } from "./Submission";

type SubmissionItemTypeName =
  | "Contact Information Form"
  | "Management Plan"
  | "Consultation Record(s)";

export type SubmissionItemType = {
  id: number;
  name: SubmissionItemTypeName;
};

export const SUBMISSION_ITEM_TYPE: Record<string, SubmissionItemTypeName> = {
  CONTACT_INFORMATION: "Contact Information Form",
  MANAGEMENT_PLAN: "Management Plan",
  CONSULTATION_RECORD: "Consultation Record(s)",
};

export interface SubmissionItem {
  id: number;
  package_id: number;
  sort_order: number;
  status: SubmissionStatus;
  submitted_by: string;
  submitted_on: string;
  type: SubmissionItemType;
  type_id: number;
  version: number;
  submissions: Submission[];
}
