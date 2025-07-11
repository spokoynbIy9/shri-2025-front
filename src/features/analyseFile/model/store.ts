import { create } from 'zustand';
import { getCorrectDataFormat } from '../../../shared/lib/helpers/getCorrectDataFormat';
import { getDateStringFromDayOfYear } from '../../../shared/lib/helpers/getDateStringFromDayOfYear';
import {
  useHighlightReportStore,
  type HighlightGroup,
  type HighlightGroupDto,
} from '../../../entities/highlight';
import { API_BASE_URL } from '../../../shared/config/api';
import { createFailedHighlightReport } from './lib/createFailedHighlightReport';

interface AnalyseState {
  error: string | null;
  isProcessing: boolean;
  isFinished: boolean;

  setError: (err: string | null) => void;
  setIsProcessing: (flag: boolean) => void;
  setIsFinished: (flag: boolean) => void;

  sendCsvToAggregate: (file: File, rows: number) => void;
}

export const useAnalyseStore = create<AnalyseState>((set, get) => ({
  error: null,
  isProcessing: false,
  isFinished: false,

  setError: (error) => set({ error }),
  setIsProcessing: (flag) => set({ isProcessing: flag }),
  setIsFinished: (flag) => set({ isFinished: flag }),

  sendCsvToAggregate: async (file: File, rows: number) => {
    const {
      createHighlightReport,
      setCurHighlightReportId,
      setHighlightGroupById,
      setIsSuccessProcessedById,
      saveHighlightReportByIdFromLS,
      resetCurHighlightReportId,
    } = useHighlightReportStore.getState();

    const formData = new FormData();
    formData.append('file', file);

    const url = `${API_BASE_URL}/aggregate?rows=${rows}`;

    resetCurHighlightReportId();
    get().setIsProcessing(true);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      // processing error
      if (!response.ok || !response.body) {
        get().setError('Ошибка при отправке файла или пустой ответ');

        createFailedHighlightReport(file);

        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      let createdHighlightId: string | null = null;

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          if (createdHighlightId) {
            setIsSuccessProcessedById(createdHighlightId, true);
            saveHighlightReportByIdFromLS(createdHighlightId);
          }
          break;
        }

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (let i = 0; i < lines.length; i++) {
          if (lines[i].trim()) {
            const rawLine: HighlightGroupDto = JSON.parse(lines[i]);

            const { less_spent_value, ...rest } = rawLine;
            void less_spent_value;

            const transformedLine: HighlightGroup = {
              ...rest,
              total_spend_galactic: Math.round(rest.total_spend_galactic),
              big_spent_value: Math.round(rest.big_spent_value),
              average_spend_galactic: Math.round(rest.average_spend_galactic),
              big_spent_at: getDateStringFromDayOfYear(rest.big_spent_at),
              less_spent_at: getDateStringFromDayOfYear(rest.less_spent_at),
            };

            const filename = file.name;

            if (!createdHighlightId) {
              const id = Date.now().toString();

              createHighlightReport({
                id,
                filename,
                date: getCorrectDataFormat(new Date()),
                isSuccessProcessed: null,
                detailedInfo: transformedLine,
              });

              createdHighlightId = id;
              setCurHighlightReportId(createdHighlightId);
            } else {
              setHighlightGroupById(createdHighlightId, transformedLine);
            }
          }
        }
      }

      get().setIsProcessing(false);
      get().setIsFinished(true);
    } catch (error) {
      let message = 'Неизвестная ошибка';

      if (typeof error === 'string') {
        message = error;
      } else if (error instanceof Error) {
        message = error.message;
      } else {
        message = JSON.stringify(error);
      }

      get().setError(message);
      get().setIsProcessing(false);

      createFailedHighlightReport(file);
    }
  },
}));
