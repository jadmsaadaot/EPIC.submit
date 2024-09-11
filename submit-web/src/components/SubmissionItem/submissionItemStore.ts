import { SubmissionItem } from "@/models/SubmissionItem";
import { create } from "zustand";

interface SubmissionItemStoreState {
  submissionItem: SubmissionItem | null;
  setSubmissionItem: (submissionItem: SubmissionItem) => void;
  reset: () => void;
}

export const useSubmissionItemStore = create<SubmissionItemStoreState>(
  (set) => ({
    submissionItem: null,
    setSubmissionItem: (submissionItem: SubmissionItem) =>
      set(() => ({ submissionItem })),
    reset: () => set({ submissionItem: null }),
  }),
);
