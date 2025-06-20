import type { FC } from 'react';
import type { DetailedHighlightInfo } from '../../../hightlights/model/store';
import styles from './HighlightsDetailedInfoList.module.css';
import { HighlightsDetailedInfoItem } from '../HighlightsDetailedInfoItem/HighlightsDetailedInfoItem';

interface HighlightsDetailedInfoList {
  detailedInfo: DetailedHighlightInfo;
}

export const HighlightsDetailedInfoList: FC<HighlightsDetailedInfoList> = ({
  detailedInfo,
}) => {
  return (
    <div className={styles.container}>
      {Object.entries(detailedInfo).map(([title, value]) => (
        <HighlightsDetailedInfoItem key={title} title={value} value={title} />
      ))}
    </div>
  );
};
