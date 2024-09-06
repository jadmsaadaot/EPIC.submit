import { create } from "zustand";

interface BreadCrumb {
  title: string;
  path?: string;
}

interface BreadCrumbStore {
  breadcrumbs: BreadCrumb[];
  setBreadcrumbs: (breadcrumbs: BreadCrumb[]) => void;
  replaceBreadcrumb: (oldTitle: string, newTitle: string) => void;
}

// Create the Zustand store
export const useBreadCrumb = create<BreadCrumbStore>((set) => ({
  breadcrumbs: [],
  setBreadcrumbs: (breadcrumbs) => {
    set(() => ({
      breadcrumbs,
    }));
  },
  replaceBreadcrumb: (path, newTitle) => {
    set((state) => ({
      breadcrumbs: state.breadcrumbs.map((breadcrumb) =>
        breadcrumb.path === path
          ? { ...breadcrumb, title: newTitle }
          : breadcrumb,
      ),
    }));
  },
}));
