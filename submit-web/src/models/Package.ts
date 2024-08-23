export type PackageType = {
  id: number;
  name: string;
};

export type PackageStatus = "IN_REVIEW" | "APPROVED" | "REJECTED";
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
};

export type SubmissionPackage = {
  id: number;
  name: string;
  status: PackageStatus;
  submitted_on?: string;
  submitted_by?: string;
  type_id: number;
  type: PackageType;
};
