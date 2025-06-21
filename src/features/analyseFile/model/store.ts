import { create } from 'zustand';
import { getCorrectDataFormat } from '../../../shared/lib/helpers/getCorrectDataFormat';
import { getDateStringFromDayOfYear } from '../../../shared/lib/helpers/getDateStringFromDayOfYear';
import {
  useHighlightReportStore,
  type HighlightGroup,
  type HighlightGroupDto,
} from '../../../entities/highlight';
import { API_BASE_URL } from '../../../shared/config/api';

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
    } = useHighlightReportStore.getState();

    const formData = new FormData();
    formData.append('file', file);

    const url = `${API_BASE_URL}/aggregate?rows=${rows}`;

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    // processing error
    if (!response.ok || !response.body) {
      get().setError('Ошибка при отправке файла или пустой ответ');

      const id = Date.now().toString();
      const filename = file.name;
      const resultData = {
        id,
        filename,
        date: getCorrectDataFormat(new Date()),
        isSuccessProcessed: false,
        detailedInfo: null,
      };

      createHighlightReport(resultData);
      saveHighlightReportByIdFromLS(id);

      return;
    }

    get().setIsProcessing(true);

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
  },
}));
