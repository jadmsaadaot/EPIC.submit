import {
  createDefaultSubmissionPackage,
  SubmissionPackage,
} from "@/models/Package";
import { AccountProject, createDefaultAccountProject } from "@/models/Project";
import { create } from "zustand";

// Define the store state and actions
interface AccountProjectStore {
  accountProject: AccountProject;
  submissionPackage: SubmissionPackage;
  setAccountProject: (accountProject: AccountProject) => void;
  setSubmissionPackage: (submissionPackage: SubmissionPackage) => void;
  reset: () => void;
}

// Create the Zustand store
export const useAccountProject = create<AccountProjectStore>((set) => ({
  accountProject: createDefaultAccountProject(),
  submissionPackage: createDefaultSubmissionPackage(),
  setAccountProject: (accountProject) => {
    set(() => ({
      accountProject,
    }));
  },
  setSubmissionPackage: (submissionPackage) => {
    set(() => ({
      submissionPackage,
    }));
  },
  reset: () => {
    set({
      accountProject: createDefaultAccountProject(),
    });
  },
}));
