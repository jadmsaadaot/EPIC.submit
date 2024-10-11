import { create } from "zustand";

type Filters = {
  status: string;
  searchText: string;
  submitted_on: Date | null;
};

type FilterState = {
  filters: Filters;
  setFilters: (filters: Partial<Filters>) => void;
};

export const useProjectFilters = create<FilterState>((set) => ({
  filters: {
    status: "",
    searchText: "",
    submitted_on: null,
  },
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
}));
