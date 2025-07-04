import { useHighlightReportStore } from '../../../../entities/highlight';
import styles from './ClearHistoryButton.module.css';

export const ClearHistoryButton = () => {
  const deleteAllHighlights = useHighlightReportStore(
    (state) => state.removeHighlightReportsFromLS
  );

  return (
    <button onClick={deleteAllHighlights} className={styles.btn}>
      Очистить всё
    </button>
  );
};
