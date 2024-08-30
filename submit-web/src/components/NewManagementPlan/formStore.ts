import { create } from "zustand";

type FormData = {
  [x: string]: {
    label: string;
    value: number | number[] | string;
  };
};
interface ManagementPlanFormState {
  formData: FormData;
  setFormData: (formData: FormData) => void;
  step: number;
  setStep: (step: number) => void;
  reset: () => void;
}

export const useManagementPlanForm = create<ManagementPlanFormState>((set) => ({
  formData: {},
  setFormData: (formData: FormData) => set(() => ({ formData })),
  step: 0,
  setStep: (step: number) => set(() => ({ step })),
  reset: () => set(() => ({ formData: {}, step: 0 })),
}));
