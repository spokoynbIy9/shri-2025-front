import { useEffect } from 'react';
import { HistoryHighlightsItem } from '../HistoryHighlightsItem/HistoryHighlightsItem';
import styles from './HistoryHighlightsList.module.css';
import { useHighlightReportStore } from '../../../../entities/highlight';

export const HistoryHighlightsList = () => {
  const highlightReports = useHighlightReportStore(
    (state) => state.highlightReports
  );
  const load = useHighlightReportStore(
    (state) => state.loadHighlightReportsFromLS
  );

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      {highlightReports.length ? (
        <div className={styles.list}>
          {highlightReports.map((hl) => (
            <HistoryHighlightsItem key={hl.id} highlightInfo={hl} />
          ))}
        </div>
      ) : (
        <p className={styles.text}>Список пуст</p>
      )}
    </div>
  );
};
