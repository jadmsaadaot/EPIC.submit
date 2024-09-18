import { create } from "zustand";

interface FileUploadState {
  handleAddFile: (_files: File[]) => void;
  savedFileUrl: string;
  savedFileName: string;
  addedFileUrl: string;
  setAddedFileUrl: (url: string) => void;
  addedFileName: string;
  setAddedFileName: (name: string) => void;
  existingFileUrl: string;
  setExistingFileUrl: (url: string) => void;
  fileAfterProcessing: string;
  setFileAfterProcessing: (url: string) => void;
  fileAspectRatio: number;
}

export const useFileUploadStore = create<FileUploadState>((set) => ({
  savedFileUrl: "",
  savedFileName: "",

  addedFileUrl: "",
  setAddedFileUrl: (url) => set({ addedFileUrl: url }),

  addedFileName: "",
  setAddedFileName: (name) => set({ addedFileName: name }),

  existingFileUrl: "",
  setExistingFileUrl: (url) => set({ existingFileUrl: url }),

  fileAfterProcessing: "",
  setFileAfterProcessing: (url) => set({ fileAfterProcessing: url }),

  fileAspectRatio: 1,

  handleAddFile: (files: File[]) => {
    // Add file processing logic here
    if (files.length > 0) {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);

      set({
        addedFileUrl: fileUrl,
        addedFileName: file.name,
      });
    }
  },
}));
