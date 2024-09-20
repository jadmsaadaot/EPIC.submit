import { create } from "zustand";

export type Document = {
  id: number;
  file: File;
  folderId?: string;
};

interface DocumentUploadState {
  handleAddDocuments: (_files: File, folderId?: string) => void;
  documents: Document[];
  removeDocument: (id: number) => void;
  reset: () => void;
}

const initialState = {
  documents: [],
};

export const useDocumentUploadStore = create<DocumentUploadState>((set) => ({
  documents: [],
  handleAddDocuments: (file: File, folderId?: string) => {
    // Add file processing logic here
    if (!file) return;

    set((prev) => {
      const id = Math.max(...prev.documents.map((doc) => doc.id), 0) + 1;
      const document = { id, file, folderId };
      return { documents: [...prev.documents, document] };
    });
  },
  removeDocument: (id: number) => {
    set((prev) => {
      const documents = prev.documents.filter((doc) => doc.id !== id);
      return { documents };
    });
  },
  reset: () => set(initialState),
}));
