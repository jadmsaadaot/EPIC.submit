import { create } from "zustand";

type Filters = {
  status: string[];
  search_text: string;
  submitted_on_start: string;
  submitted_on_end: string;
};

type FilterState = {
  filters: Filters;
  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;
};

export const useProjectFilters = create<FilterState>((set) => ({
  filters: {
    status: [],
    search_text: "",
    submitted_on_start: "",
    submitted_on_end: "",
  },
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  resetFilters: () =>
    set(() => ({
      filters: {
        status: [],
        search_text: "",
        submitted_on_start: "",
        submitted_on_end: "",
      },
    })),
}));
