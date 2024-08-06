import { create } from "zustand";

interface AccountStoreState {
  isLoading: boolean;
  proponentId: string;
  setAccount: (account: Partial<AccountStoreState>) => void;
}

export const useAccount = create<AccountStoreState>((set) => ({
  isLoading: true,
  proponentId: "",
  setAccount: (account: Partial<AccountStoreState>) => set({ ...account }),
}));
