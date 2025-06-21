import { create } from 'zustand';
import { API_BASE_URL } from '../../../shared/config/api';

interface GenerateState {
  error: string | null;
  isProcessing: boolean;
  isFinished: boolean;

  setError: (err: string | null) => void;
  setIsProcessing: (flag: boolean) => void;
  setIsFinished: (flag: boolean) => void;

  downloadReport: (
    size: number,
    withErrors?: 'on' | 'off',
    maxSpend?: string
  ) => Promise<void>;
}

export const useGenerateStore = create<GenerateState>((set, get) => ({
  error: null,
  isProcessing: false,
  isFinished: false,

  setError: (error) => set({ error }),
  setIsProcessing: (flag) => set({ isProcessing: flag }),
  setIsFinished: (flag) => set({ isFinished: flag }),

  downloadReport: async (
    size: number,
    withErrors: 'on' | 'off' = 'off',
    maxSpend: string = '1000'
  ) => {
    const queryParams = new URLSearchParams({
      size: size.toString(),
      withErrors,
      maxSpend,
    });

    get().setIsProcessing(true);
    const response = await fetch(`${API_BASE_URL}/report?${queryParams}`);

    if (!response.ok) {
      get().setError(`Ошибка при получении отчета`);
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    get().setIsProcessing(false);
    get().setIsFinished(true);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `report_${Date.now()}.csv`;
    anchor.click();

    URL.revokeObjectURL(url);
  },
}));
