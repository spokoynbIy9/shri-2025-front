import { useEffect } from 'react';
import { HistoryHighlightsItem } from '../HistoryHighlightsItem/HistoryHighlightsItem';
import styles from './HistoryHighlightsList.module.css';
import { useHighlightStore } from '../../../hightlights/model/store';

export const HistoryHighlightsList = () => {
  const highlights = useHighlightStore((state) => state.highlights);
  const load = useHighlightStore(
    (state) => state.loadHighlightsFromLocalStorage
  );

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      {highlights.length ? (
        <div className={styles.list}>
          {highlights.map((hl) => (
            <HistoryHighlightsItem key={hl.id} highlightInfo={hl} />
          ))}
        </div>
      ) : (
        <p className={styles.text}>Список пуст</p>
      )}
    </div>
  );
};
