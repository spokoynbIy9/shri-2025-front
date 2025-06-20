import classNames from 'classnames';
import styles from './GenerateButton.module.css';
import type { FC } from 'react';
import { useGenerateState } from '../model/store';

interface GenerateButtonProps {
  isGenerating: boolean;
  isFinishedGenerate: boolean;
  hasError: boolean;
}

export const GenerateButton: FC<GenerateButtonProps> = ({
  isGenerating,
  isFinishedGenerate,
  hasError,
}) => {
  const downloadReport = useGenerateState((state) => state.downloadReport);

  return (
    <button
      className={classNames(styles.btn, {
        [styles.btn__processing]: !hasError && isGenerating,
        [styles.btn__finishedProcessing]: !hasError && isFinishedGenerate,
        [styles.btn__failed]: hasError,
      })}
      onClick={() => downloadReport(0.2)}
    >
      {hasError ? (
        'Ошибка'
      ) : isGenerating ? (
        <span className={styles.loader}></span>
      ) : isFinishedGenerate ? (
        'Done'
      ) : (
        'Начать генерацию'
      )}
    </button>
  );
};
