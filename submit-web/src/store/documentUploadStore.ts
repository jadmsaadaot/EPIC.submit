import { create } from "zustand";

interface Document {
  file: File;
  isComplete: boolean;
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
  handleAddDocuments: (files: File[]) => {
    // Add file processing logic here
    if (files.length > 0) {
      const file = files[0];

      set({
        documents: [
          ...initialState.documents,
          {
            file,
            isComplete: false,
          },
        ],
      });
    }
  },
  reset: () => set(initialState),
}));
