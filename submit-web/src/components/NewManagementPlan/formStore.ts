import { create } from "zustand";

interface ManagementPlanFormState {
  formData: {};
  setFormData: (formData: {}) => void;
  step: number;
  setStep: (step: number) => void;
  reset: () => void;
}

export const useManagementPlanForm = create<ManagementPlanFormState>((set) => ({
  formData: {},
  setFormData: (formData: {}) => set(() => ({ formData })),
  step: 0,
  setStep: (step: number) => set(() => ({ step })),
  reset: () => set(() => ({ formData: {}, step: 0 })),
}));
