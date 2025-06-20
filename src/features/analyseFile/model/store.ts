import { create } from 'zustand';
import {
  useHighlightStore,
  type DetailedHighlightInfo,
} from '../../hightlights/model/store';
import type { DetailedHighlightInfoDto } from './types/DetailedHighlightInfoDto';
import { getCorrectDataFormat } from '../../../shared/lib/helpers/getCorrectDataFormat';
import { getDateStringFromDayOfYear } from '../../../shared/lib/helpers/getDateStringFromDayOfYear';

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
    const createHighlight = useHighlightStore.getState().createHighlight;
    const setCurHighlightId = useHighlightStore.getState().setCurHighlightId;
    const setDetailedHighlightInfo =
      useHighlightStore.getState().setDetailedHighlightInfo;
    const setSuccessProcessed =
      useHighlightStore.getState().setSuccessProcessed;
    const saveHighlightToLocalStorage =
      useHighlightStore.getState().saveHighlightToLocalStorage;

    const formData = new FormData();
    formData.append('file', file);

    const url = `http://127.0.0.1:3000/aggregate?rows=${rows}`;

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok || !response.body) {
      throw new Error('Ошибка при отправке файла или пустой ответ');
    }

    get().setIsProcessing(true);

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    let createdHighlightId: string | null = null;

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        setSuccessProcessed(createdHighlightId!, true);
        saveHighlightToLocalStorage();
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim()) {
          const rawLine: DetailedHighlightInfoDto = JSON.parse(lines[i]);

          // todo
          // избавиться от выкулюченного ограничения
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { less_spent_value: _, ...rest } = rawLine;

          const transformedLine: DetailedHighlightInfo = {
            ...rest,
            big_spent_at: getDateStringFromDayOfYear(rest.big_spent_at),
            less_spent_at: getDateStringFromDayOfYear(rest.less_spent_at),
          };

          const filename = file.name;

          if (!createdHighlightId) {
            const id = Date.now().toString();

            const resultData = {
              id,
              filename,
              date: getCorrectDataFormat(new Date()),
              isSuccessProcessed: null,
              detailedInfo: transformedLine,
            };

            createHighlight(resultData);
            createdHighlightId = id;
            setCurHighlightId(createdHighlightId);
          } else {
            setDetailedHighlightInfo(createdHighlightId, transformedLine);
          }

          console.log('Получено:', transformedLine);
        }
      }
    }

    get().setIsProcessing(false);
    get().setIsFinished(true);
  },
}));
