export const MANAGEMENT_PLAN_FORM_STEPS = {
  CONDITIONS: 0,
  PLAN_DETAILS: 1,
};

export type Condition = {
  id: number;
  name: string;
  deliverable_name?: string;
  stakeholders_to_consult?: string[];
  fn_consultation_required?: boolean;
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

export const dummyFullCondition: Condition = {
  id: 1,
  name: "1",
  deliverable_name: "Wildlife plan",
  stakeholders_to_consult: [
    "BC Ministry of Forests",
    "Fort Nelson First Nation",
    "Oil and Gas Commission",
  ],
  fn_consultation_required: true,
};
