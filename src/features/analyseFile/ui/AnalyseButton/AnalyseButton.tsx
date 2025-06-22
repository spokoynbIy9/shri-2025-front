import { useUploadStore } from '../../../uploadFile';
import { useAnalyseStore } from '../../model/store';
import styles from './AnalyseButton.module.css';
import classNames from 'classnames';

export const AnalyseButton = () => {
  const file = useUploadStore((state) => state.file);
  const isFileUploaded = useUploadStore((state) => state.isUploaded);
  const errorUpload = useUploadStore((state) => state.error);

  const errorAnalyse = useAnalyseStore((state) => state.error);
  const isProcessing = useAnalyseStore((state) => state.isProcessing);
  const setProcessing = useAnalyseStore((state) => state.setIsProcessing);
  const isFinished = useAnalyseStore((state) => state.isFinished);
  const setAnalyseError = useAnalyseStore((state) => state.setError);

  const sendCsvToAggregate = useAnalyseStore(
    (state) => state.sendCsvToAggregate
  );

  const handleSendCsv = async () => {
    if (!file) return;

    try {
      await sendCsvToAggregate(file, 100000);
    } catch (error) {
      let message = 'Неизвестная ошибка';

      if (typeof error === 'string') {
        message = error;
      } else if (error instanceof Error) {
        message = error.message;
      } else {
        message = JSON.stringify(error);
      }

      setAnalyseError(message);
      setProcessing(false);
    }
  };

  return (
    <button
      className={classNames(styles.btn, {
        [styles.btn__disabled]: !isFileUploaded,
        [styles.btn__fadeout]:
          (isFileUploaded && (errorUpload || errorAnalyse)) ||
          isProcessing ||
          isFinished,
      })}
      disabled={!isFileUploaded}
      onClick={handleSendCsv}
    >
      Отправить
    </button>
  );
};
