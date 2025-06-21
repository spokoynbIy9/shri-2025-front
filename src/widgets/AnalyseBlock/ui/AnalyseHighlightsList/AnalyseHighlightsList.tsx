import { useMemo } from 'react';
import {
  HighlightsList,
  useHighlightReportStore,
} from '../../../../entities/highlight';
import { useAnalyseStore } from '../../../../features/analyseFile/model/store';
import styles from './AnalyseHighlightsList.module.css';

export const AnalyseHighlightsList = () => {
  const curDetailedInfo = useHighlightReportStore((state) =>
    state.curHighlightReportId
      ? state.getDetailedInfoById(state.curHighlightReportId)
      : null
  );

  const getCorrectTitlesForDetailedInfo = useHighlightReportStore(
    (state) => state.getCorrectTitlesForDetailedInfo
  );

  const curHighlights = useMemo(() => {
    return curDetailedInfo
      ? getCorrectTitlesForDetailedInfo(curDetailedInfo)
      : [];
  }, [curDetailedInfo, getCorrectTitlesForDetailedInfo]);

  // fix this
  const isProcessing = useAnalyseStore((state) => state.isProcessing);
  const isFinished = useAnalyseStore((state) => state.isFinished);

  return (
    <>
      {isProcessing || (!isProcessing && isFinished) ? (
        curHighlights && (
          <HighlightsList highlights={curHighlights} typeList="analyse" />
        )
      ) : (
        <div className={styles.text_container}>
          <p className={styles.text}>
            Здесь
            <br /> появятся хайлайты
          </p>
        </div>
      )}
    </>
  );
};
