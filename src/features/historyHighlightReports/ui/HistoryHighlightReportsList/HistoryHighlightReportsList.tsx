import { useEffect } from 'react';
import styles from './HistoryHighlightReportsList.module.css';
import { useHighlightReportStore } from '../../../../entities/highlight';
import { HistoryHighlightReportsItem } from '../HistoryHighlightReportsItem/HistoryHighlightReportsItem';

export const HistoryHighlightReportsList = () => {
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
            <HistoryHighlightReportsItem key={hl.id} highlightInfo={hl} />
          ))}
        </div>
      ) : (
        <p className={styles.text}>Список пуст</p>
      )}
    </div>
  );
};
