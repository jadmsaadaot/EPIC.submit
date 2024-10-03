import { create } from "zustand";

export type Document = {
  id: number;
  file: File;
  folder?: string;
  pending?: boolean;
  submissionId?: number;
};

interface DocumentUploadState {
  handleAddDocuments: (_files: File, folder?: string) => void;
  documents: Document[];
  removeDocument: (id: number) => void;
  reset: () => void;
  triggerPending: (id: number) => void;
  completeDocument: (id: number, submissionId: number) => void;
}

const initialState = {
  documents: [],
};

export const useDocumentUploadStore = create<DocumentUploadState>((set) => ({
  documents: [],
  handleAddDocuments: (file: File, folder?: string) => {
    // Add file processing logic here
    if (!file) return;

    set((prev) => {
      const id = Math.max(...prev.documents.map((doc) => doc.id), 0) + 1;
      const document = { id, file, folder, pending: false };
      return { documents: [...prev.documents, document] };
    });
  },
  removeDocument: (id: number) => {
    set((prev) => {
      const documents = prev.documents.filter((doc) => doc.id !== id);
      return { documents };
    });
  },
  completeDocument: (id: number, submissionId: number) => {
    set((prev) => {
      const documents = prev.documents.map((doc) =>
        doc.id === id ? { ...doc, submissionId } : doc,
      );
      return { documents };
    });
  },
  reset: () => set(initialState),
  triggerPending: (id: number) => {
    set((prev) => {
      const documents = prev.documents.map((doc) =>
        doc.id === id ? { ...doc, pending: true } : doc,
      );
      return { documents };
    });
  },
}));
