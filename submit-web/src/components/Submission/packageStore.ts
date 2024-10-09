import { create } from "zustand";

interface PackageStoreState {
  isValidating: boolean;
  reset: () => void;
  setIsValidating: (_isValidating: boolean) => void;
}
const initialState: Partial<PackageStoreState> = {
  isValidating: false,
};
export const usePackageStore = create<PackageStoreState>((set) => ({
  isValidating: false,
  setIsValidating: (_isValidating: boolean) =>
    set({ isValidating: _isValidating }),
  reset: () => set(initialState),
}));
