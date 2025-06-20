import { useHighlightStore } from '../../../hightlights/model/store';
import styles from './ClearHistoryButton.module.css';

export const ClearHistoryButton = () => {
  const deleteAllHighlights = useHighlightStore(
    (state) => state.removeHighlightsFromLocalStorage
  );

  return (
    <button onClick={deleteAllHighlights} className={styles.btn}>
      Очистить всё
    </button>
  );
};
