import { useHighlightStore } from '../../../hightlights/model/store';
import { ClearHistoryButton } from '../ClearHistoryButton/ClearHistoryButton';
import { HistoryHighlightsList } from '../HistoryHighlightsList/HistoryHighlightsList';
import { LinkToGenerate } from '../LinkToGenerate/LinkToGenerate';
import styles from './HistoryHighlightsBlock.module.css';

export const HistoryHighlightsBlock = () => {
  const hightlights = useHighlightStore((state) => state.highlights);

  return (
    <div className={styles.container}>
      <HistoryHighlightsList />
      <div className={styles.container_btns}>
        <LinkToGenerate />
        {Boolean(hightlights.length) && <ClearHistoryButton />}
      </div>
    </div>
  );
};
