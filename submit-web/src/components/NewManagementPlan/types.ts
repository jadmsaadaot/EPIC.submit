export type NewMPFormDataFieldData<T> = {
  label: string;
  value: T;
};
export type NewMPFormData = {
  conditions?: NewMPFormDataFieldData<number[]>;
};

export type Condition = {
  id: number;
  name: string;
  deliverable_name?: string;
  stakeholders_to_consult?: string[];
  fn_consultation_required?: boolean;
};

export type NewManagementPlanForm = {
  name: NewMPFormDataFieldData<string>;
  [otherFields: string]: NewMPFormDataFieldData<
    number | number[] | string | string[]
  >;
};
