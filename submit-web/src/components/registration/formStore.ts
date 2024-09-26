import { create } from "zustand";

interface CreateAccountFormState {
  step: number;
  setStep: (step: number) => void;
  reset: () => void;
}

export const useCreateAccountForm = create<CreateAccountFormState>((set) => ({
  step: 0,
  setStep: (step: number) => set(() => ({ step })),
  reset: () =>
    set(() => ({
      step: 0,
    })),
}));
