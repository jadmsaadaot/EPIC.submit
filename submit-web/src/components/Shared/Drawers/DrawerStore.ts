import { create } from "zustand";
import { User } from "@/models/User";
import { Plan } from "@/models/Plan";
import React from "react";

// Define the DrawerData type
export type DrawerData = {
  user?: User;
  plan?: Plan;
};

// Define the store state and actions
interface DrawerStore {
  data: DrawerData;
  isOpen: boolean;
  drawerContent: React.ReactNode | null;
  direction: "left" | "right" | "top" | "bottom";
  setOpen: (
    drawer: React.ReactNode,
    direction: "left" | "right" | "top" | "bottom",
    fetchData?: () => Promise<DrawerData>,
  ) => Promise<void>;
  setClose: () => void;
}

// Create the Zustand store
export const useDrawer = create<DrawerStore>((set) => ({
  data: {},
  isOpen: false,
  drawerContent: null,
  direction: "left",

  setOpen: async (drawer, direction, fetchData) => {
    if (drawer) {
      const fetchedData = fetchData ? await fetchData() : {};
      set((state) => ({
        data: { ...state.data, ...fetchedData },
        drawerContent: drawer,
        isOpen: true,
        direction: direction,
      }));
    }
  },

  setClose: () => {
    set({
      isOpen: false,
      data: {},
      drawerContent: null,
      direction: "left",
    });
  },
}));

// Export a function called openDrawer
export const openDrawer = async (
  drawer: React.ReactNode,
  direction: "left" | "right" | "top" | "bottom",
  fetchData?: () => Promise<DrawerData>,
) => {
  const { setOpen } = useDrawer.getState();
  await setOpen(drawer, direction, fetchData);
};
