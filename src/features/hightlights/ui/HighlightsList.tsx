import styles from './HighlightsList.module.css';
import { HighlightsItem } from './HighlightsItem';
import { useHighlightStore } from '../model/store';
import { useAnalyseStore } from '../../analyseFile/model/store';
import { useMemo } from 'react';

// todo
// fix this view
const DetailedInfo = {
  total_spend_galactic: 'общие расходы в галактических кредитах',
  rows_affected: 'количество обработанных записей',
  less_spent_at: 'день года с минимальными расходами',
  big_spent_at: 'день года с максимальными расходами',
  big_spent_value: 'максимальная сумма расходов за день ',
  average_spend_galactic: 'средние расходы в галактических кредитах',
  big_spent_civ: 'цивилизация с максимальными расходами',
  less_spent_civ: 'цивилизация с минимальными расходами',
} as const;

type DetailedInfoKey = keyof typeof DetailedInfo;

export const HighlightsList = () => {
  const highlights = useHighlightStore((state) => state.highlights);
  const curHighlightId = useHighlightStore((state) => state.curHighlightId);

  // todo
  // то мы в objectEntries, то в return ObjectFromEntries
  const curHighlight = useMemo(() => {
    const suitable = highlights.find((hl) => hl.id === curHighlightId);
    if (!suitable) return null;

    const entries = Object.entries(suitable.detailedInfo).map(
      ([key, value]) => [DetailedInfo[key as DetailedInfoKey], value]
    );

    return {
      ...suitable,
      detailedInfo: Object.fromEntries(entries),
    };
  }, [curHighlightId, highlights]);

  const isProcessing = useAnalyseStore((state) => state.isProcessing);
  const isFinished = useAnalyseStore((state) => state.isFinished);

  return (
    <div className={styles.container}>
      {isProcessing || (!isProcessing && isFinished) ? (
        curHighlight && (
          <>
            {Object.entries(curHighlight.detailedInfo).map(([title, value]) => (
              <HighlightsItem key={title} title={value} value={title} />
            ))}
          </>
        )
      ) : (
        <p className={styles.text}>
          Здесь
          <br /> появятся хайлайты
        </p>
      )}
    </div>
  );
};
