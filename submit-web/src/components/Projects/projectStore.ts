import { AccountProject, createDefaultAccountProject } from "@/models/Project";
import { create } from "zustand";

// Define the store state and actions
interface AccountProjectStore {
  accountProject: AccountProject;
  setAccountProject: (accountProject: AccountProject) => void;
  reset: () => void;
}

// Create the Zustand store
export const useAccountProject = create<AccountProjectStore>((set) => ({
  accountProject: createDefaultAccountProject(),
  setAccountProject: (accountProject) => {
    set(() => ({
      accountProject,
    }));
  },
  reset: () => {
    set({
      accountProject: createDefaultAccountProject(),
    });
  },
}));
