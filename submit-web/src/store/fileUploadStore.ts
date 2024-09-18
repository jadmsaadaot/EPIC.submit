import { create } from "zustand";

interface FileUploadState {
  handleAddFile: (_files: File[]) => void;
  addedFile: File | null;
  addedFileName: string;
  setAddedFileName: (name: string) => void;
  resetStore: () => void;
  clearFiles: () => void;
}

const initialState = {
  addedFile: null,
  addedFileName: "",
};

export const useFileUploadStore = create<FileUploadState>((set) => ({
  addedFileName: "",
  setAddedFileName: (name) => set({ addedFileName: name }),
  addedFile: null,
  handleAddFile: (files: File[]) => {
    // Add file processing logic here
    if (files.length > 0) {
      const file = files[0];

      set({
        addedFile: file,
        addedFileName: file.name,
      });
    }
  },
  resetStore: () => set(initialState),
  clearFiles: () =>
    set({
      addedFile: null,
      addedFileName: "",
    }),
}));
