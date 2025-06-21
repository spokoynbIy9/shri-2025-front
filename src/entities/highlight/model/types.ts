export interface HighlightGroup {
  total_spend_galactic: number;
  rows_affected: number;
  less_spent_at: string;
  big_spent_at: string;
  big_spent_value: number;
  average_spend_galactic: number;
  big_spent_civ: string;
  less_spent_civ: string;
}

export interface HighlightGroupDto {
  total_spend_galactic: number;
  rows_affected: number;
  less_spent_at: number;
  big_spent_at: number;
  big_spent_value: number;
  average_spend_galactic: number;
  big_spent_civ: string;
  less_spent_civ: string;
  less_spent_value: number;
}

export interface HighlightReport {
  id: string;
  filename: string;
  date: string;
  isSuccessProcessed: boolean | null;
  detailedInfo: HighlightGroup | null;
}

export type TypeHighlightsList = 'history' | 'analyse';
export type TypeHighlightsItem = TypeHighlightsList;

export const HighlightTitlesForView = {
  total_spend_galactic: 'общие расходы в галактических кредитах',
  rows_affected: 'количество обработанных записей',
  less_spent_at: 'день года с минимальными расходами',
  big_spent_at: 'день года с максимальными расходами',
  big_spent_value: 'максимальная сумма расходов за день ',
  average_spend_galactic: 'средние расходы в галактических кредитах',
  big_spent_civ: 'цивилизация с максимальными расходами',
  less_spent_civ: 'цивилизация с минимальными расходами',
} as const;

export type HighlightTitlesKey = keyof typeof HighlightTitlesForView;
