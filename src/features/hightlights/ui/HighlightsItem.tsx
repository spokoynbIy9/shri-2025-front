import type { FC } from 'react';
import styles from './HighlightsItem.module.css';

interface HighlightsItemProps {
  // todo
  // correct type
  title: unknown;

  value: string;
}

export const HighlightsItem: FC<HighlightsItemProps> = ({ title, value }) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title as string}</p>
      <p className={styles.text}>{value}</p>
    </div>
  );
};
