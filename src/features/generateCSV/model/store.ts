import { create } from 'zustand';

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
  ) => void;
}

export const useGenerateState = create<GenerateState>((set, get) => ({
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
    const response = await fetch(`http://127.0.0.1:3000/report?${queryParams}`);

    // todo
    // обработка ошибок
    if (!response.ok) {
      throw new Error(`Ошибка при получении отчета`);
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
