import type { FC } from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { getCorrectTitleButton } from '../../lib/helpers/getCorrectTitleButton';
import type { ProcessingKit } from '../../lib/types/processingKit';

interface ButtonProps {
  title: string;

  processingKit?: ProcessingKit;

  onClick: () => void;
}

export const Button: FC<ButtonProps> = ({
  title,
  processingKit,

  onClick,
}) => {
  const { isProcessing, isFinishedProcessing, hasError } = processingKit ?? {};

  return (
    <button
      onClick={onClick}
      className={classNames(styles.btn, {
        [styles.btn__failed]: hasError,
        [styles.btn__processing]: isProcessing,
        [styles.btn__finishedProcessing]: isFinishedProcessing,
      })}
    >
      {isProcessing ? <Loader /> : getCorrectTitleButton(title, processingKit)}
    </button>
  );
};
