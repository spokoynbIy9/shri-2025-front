import { useHighlightReportStore } from '../../../../entities/highlight';
import { ClearHistoryButton } from '../ClearHistoryButton/ClearHistoryButton';
import { HistoryHighlightReportsList } from '../HistoryHighlightReportsList/HistoryHighlightReportsList';
import { LinkToGenerate } from '../LinkToGenerate/LinkToGenerate';
import styles from './HistoryHighlightReportsBlock.module.css';

export const HistoryHighlightReportsBlock = () => {
  const highlightReports = useHighlightReportStore(
    (state) => state.highlightReports
  );

  return (
    <div className={styles.container}>
      <HistoryHighlightReportsList />
      <div className={styles.container_btns}>
        <LinkToGenerate />
        {Boolean(highlightReports.length) && <ClearHistoryButton />}
      </div>
    </div>
  );
};
