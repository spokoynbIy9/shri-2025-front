import type { FC } from 'react';
import styles from './AnalyseButton.module.css';
import classNames from 'classnames';

interface AnalyseButtonProps {
  isDisabled: boolean;
}

export const AnalyseButton: FC<AnalyseButtonProps> = ({ isDisabled }) => {
  return (
    <button
      className={classNames(styles.btn, { [styles.btn__disabled]: isDisabled })}
    >
      Отправить
    </button>
  );
};
