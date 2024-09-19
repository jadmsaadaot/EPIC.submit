import { create } from "zustand";

interface Document {
  file: File;
  isComplete: boolean;
  folderId?: string;
}

interface DocumentUploadState {
  handleAddDocuments: (_files: File[], folderId?: string) => void;
  documents: Document[];
  removeDocument: (fileName: string) => void;
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
  removeDocument: (fileName: string) => {
    set((prev) => {
      const documents = [...prev.documents];
      const index = documents.findIndex((doc) => doc.file.name === fileName);
      if (index !== -1) {
        documents.splice(index, 1);
      }
      return { documents };
    });
  },
  reset: () => set(initialState),
}));
