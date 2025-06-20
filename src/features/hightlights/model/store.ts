import { create } from 'zustand';

// тут можно явно ограничить типы(person,monsters) big_spent_civ,less_spent_civ
export interface DetailedHighlightInfo {
  total_spend_galactic: number;
  rows_affected: number;
  // перевести к определенному дню
  less_spent_at: string;
  // перевести к определенному дню
  big_spent_at: string;
  // less_spent_value: number; попросту ненужна
  big_spent_value: number;
  average_spend_galactic: number;
  big_spent_civ: string;
  less_spent_civ: string;
}

interface Highlight {
  id: string;
  filename: string;
  date: string;
  isSuccessProcessed: boolean | null;
  detailedInfo: DetailedHighlightInfo;
}

interface HighlightState {
  highlights: Highlight[];
  curHighlightId: string | null;
  setCurHighlightId: (id: string) => void;
  createHighlight: (data: Highlight) => void;
  setDetailedHighlightInfo: (id: string, data: DetailedHighlightInfo) => void;
  setSuccessProcessed: (id: string, isSuccessProcessed: boolean) => void;
  saveHighlightToLocalStorage: () => void;
}

export const useHighlightStore = create<HighlightState>((set, get) => ({
  highlights: [],

  curHighlightId: null,

  setCurHighlightId(id) {
    set({ curHighlightId: id });
  },

  resetCurHighlightId() {
    set({ curHighlightId: null });
  },

  createHighlight: (data) => {
    set({ highlights: [...get().highlights, data] });
  },

  setDetailedHighlightInfo: (id, data) => {
    set((state) => ({
      highlights: state.highlights.map((highlight) =>
        highlight.id === id ? { ...highlight, detailedInfo: data } : highlight
      ),
    }));
  },

  setSuccessProcessed: (id, isSuccessProcessed) => {
    set((state) => ({
      highlights: state.highlights.map((highlight) =>
        highlight.id === id ? { ...highlight, isSuccessProcessed } : highlight
      ),
    }));
  },

  saveHighlightToLocalStorage: () => {
    const { highlights, curHighlightId } = get();

    const curHighlight = highlights.find((hl) => hl.id === curHighlightId);

    try {
      const existing = localStorage.getItem('highlights');
      const parsed: Highlight[] = existing ? JSON.parse(existing) : [];

      localStorage.setItem(
        'highlights',
        JSON.stringify([...parsed, curHighlight])
      );
    } catch (err) {
      console.error('Ошибка при сохранении в localStorage:', err);
    }
  },
}));
