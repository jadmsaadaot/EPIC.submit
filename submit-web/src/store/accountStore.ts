import { create } from "zustand";

interface AccountStoreState {
  proponentId: string;
  accountId: number;
  setAccount: (account: Partial<AccountStoreState>) => void;
}

export const useAccount = create<AccountStoreState>((set) => ({
  proponentId: "",
  accountId: 0,
  setAccount: (account: Partial<AccountStoreState>) =>
    set((prev) => ({ ...prev, ...account })),
}));
