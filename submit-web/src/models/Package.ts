import { SubmissionItem } from "./SubmissionItem";

export type PackageType = {
  id: number;
  name: string;
};

export type PackageStatus =
  | "IN_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "COMPLETED"
  | "SUBMITTED";
export const PACKAGE_STATUS: Record<
  PackageStatus,
  { value: PackageStatus; label: string }
> = {
  IN_REVIEW: {
    value: "IN_REVIEW",
    label: "In Review",
  },
  APPROVED: {
    value: "APPROVED",
    label: "Approved",
  },
  REJECTED: {
    value: "REJECTED",
    label: "Rejected",
  },
  COMPLETED: {
    value: "COMPLETED",
    label: "Completed",
  },
  SUBMITTED: {
    value: "SUBMITTED",
    label: "Submitted",
  },
};

export type SubmissionPackage = {
  id: number;
  name: string;
  status: PackageStatus;
  submitted_on?: string;
  submitted_by?: string;
  type_id: number;
  type: PackageType;
  items: Array<SubmissionItem>;
};

export const createDefaultSubmissionPackage = (): SubmissionPackage => ({
  id: 0,
  name: "",
  status: PACKAGE_STATUS.IN_REVIEW.value,
  type_id: 0,
  type: {
    id: 0,
    name: "",
  },
  items: [],
});
