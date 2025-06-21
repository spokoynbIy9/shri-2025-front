import classNames from 'classnames';
import styles from './GenerateButton.module.css';
import type { FC } from 'react';
import { useGenerateStore } from '../../model/store';
import { Loader } from '../../../../shared/ui';

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
  const downloadReport = useGenerateStore((state) => state.downloadReport);

  return (
    <button
      className={classNames(styles.btn, {
        [styles.btn__processing]: !hasError && isGenerating,
        [styles.btn__finishedProcessing]: !hasError && isFinishedGenerate,
        [styles.btn__failed]: hasError,
      })}
      onClick={() => downloadReport(0.2, 'on')}
    >
      {hasError ? (
        'Ошибка'
      ) : isGenerating ? (
        <Loader />
      ) : isFinishedGenerate ? (
        'Done'
      ) : (
        'Начать генерацию'
      )}
    </button>
  );
};
