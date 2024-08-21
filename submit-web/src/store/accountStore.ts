import { create } from "zustand";

interface AccountStoreState {
  proponentId: number;
  accountId: number;
  isLoading: boolean;
  setAccount: (account: Partial<AccountStoreState>) => void;
}

export const useAccount = create<AccountStoreState>((set) => ({
  proponentId: 0,
  accountId: 0,
  isLoading: true,
  setAccount: (account: Partial<AccountStoreState>) =>
    set((prev) => ({ ...prev, ...account })),
}));
