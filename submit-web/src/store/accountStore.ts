import { create } from "zustand";

interface AccountStoreState {
  proponentId: string;
  setAccount: (account: Partial<AccountStoreState>) => void;
}

export const useAccount = create<AccountStoreState>((set) => ({
  proponentId: "",
  setAccount: (account: Partial<AccountStoreState>) => set({ ...account }),
}));
