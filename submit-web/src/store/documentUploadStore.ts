import { create } from "zustand";

interface Document {
  file: File;
  isComplete: boolean;
  folderId?: string;
}

interface DocumentUploadState {
  handleAddDocuments: (_files: File[]) => void;
  documents: Document[];
  reset: () => void;
}

const initialState = {
  documents: [],
};

export const useDocumentUploadStore = create<DocumentUploadState>((set) => ({
  documents: [],
  handleAddDocuments: (files: File[], folderId?: string) => {
    // Add file processing logic here
    if (files.length > 0) {
      const file = files[0];

      set((prev) => ({
        documents: [
          ...prev.documents,
          {
            file,
            isComplete: false,
            folderId,
          },
        ],
      }));
    }
  },
  reset: () => set(initialState),
}));
