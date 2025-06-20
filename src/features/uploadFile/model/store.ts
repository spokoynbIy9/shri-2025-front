import { create } from 'zustand';

interface UploadState {
  file: File | null;
  error: string | null;
  isUploaded: boolean;
  setFile: (file: File | null) => void;
  setError: (err: string | null) => void;
  setUploaded: (flag: boolean) => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  file: null,
  error: null,
  isUploaded: false,
  setFile: (file) => set({ file }),
  setError: (error) => set({ error }),
  setUploaded: (flag) => set({ isUploaded: flag }),
}));
