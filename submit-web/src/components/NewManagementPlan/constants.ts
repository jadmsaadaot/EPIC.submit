export const MANAGEMENT_PLAN_FORM_STEPS = {
  CONDITIONS: 0,
  PLAN_DETAILS: 1,
  REQUIREMENTS: 2,
  CONTACT_INFORMATION: 3,
};

export const stepLabels = [
  "Conditions(s)",
  "Plan Details",
  "Requirements",
  "Contact Information",
];

export type Condition = {
  id: number;
  name: string;
};

export const dummyConditions: Condition[] = [
  {
    id: 1,
    name: "Condition 1",
  },
  {
    id: 2,
    name: "Condition 2",
  },
  {
    id: 3,
    name: "Condition 3",
  },
  {
    id: 4,
    name: "Condition 4",
  },
  {
    id: 5,
    name: "Condition 5",
  },
];
