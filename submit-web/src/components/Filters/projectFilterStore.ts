import { create } from "zustand";
import { Dayjs } from "dayjs";

type Filters = {
  status: string[];
  search_text: string;
  submitted_on: Dayjs | null;
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
    submitted_on: null,
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
        submitted_on: null,
      },
    })),
}));
