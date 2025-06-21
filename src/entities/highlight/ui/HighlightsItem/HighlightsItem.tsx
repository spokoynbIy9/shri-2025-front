import type { FC } from 'react';
import styles from './HighlightsItem.module.css';
import type { TypeHighlightsItem } from '../../model/types';
import classNames from 'classnames';

interface HighlightsItemProps {
  title: string;
  value: string;
  typeItem: TypeHighlightsItem;
}

export const HighlightsItem: FC<HighlightsItemProps> = ({
  title,
  value,
  typeItem,
}) => {
  return (
    <div
      className={classNames(styles.container, {
        [styles.container_analyse]: typeItem === 'analyse',
        [styles.container_history]: typeItem === 'history',
      })}
    >
      <p className={styles.title}>{title}</p>
      <p className={styles.text}>{value}</p>
    </div>
  );
};
