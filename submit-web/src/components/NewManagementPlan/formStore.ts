import { create } from "zustand";

export type NewMPFormData = {
  [x: string]: {
    label: string;
    value: number | number[] | string;
  };
};
interface ManagementPlanFormState {
  formData: NewMPFormData;
  setFormData: (formData: NewMPFormData) => void;
  step: number;
  setStep: (step: number) => void;
  reset: () => void;
}

export const useManagementPlanForm = create<ManagementPlanFormState>((set) => ({
  formData: {},
  setFormData: (formData: NewMPFormData) => set(() => ({ formData })),
  step: 0,
  setStep: (step: number) => set(() => ({ step })),
  reset: () => set(() => ({ formData: {}, step: 0 })),
}));
