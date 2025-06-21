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
  const setGenerateError = useGenerateStore((state) => state.setError);
  const setProcessing = useGenerateStore((state) => state.setIsProcessing);

  const handleDownloadReport = async () => {
    try {
      await downloadReport(0.2);
    } catch (error) {
      let message = 'Неизвестная ошибка';

      if (typeof error === 'string') {
        message = error;
      } else if (error instanceof Error) {
        message = error.message;
      } else {
        message = JSON.stringify(error);
      }

      setGenerateError(message);
      setProcessing(false);
    }
  };

  return (
    <button
      className={classNames(styles.btn, {
        [styles.btn__processing]: !hasError && isGenerating,
        [styles.btn__finishedProcessing]: !hasError && isFinishedGenerate,
        [styles.btn__failed]: hasError,
      })}
      onClick={handleDownloadReport}
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
