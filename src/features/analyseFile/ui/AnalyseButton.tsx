import styles from './AnalyseButton.module.css';
import classNames from 'classnames';
import { useUploadStore } from '../../uploadFile';
import { useAnalyseStore } from '../model/store';

// todo
// fix function in OnClick

export const AnalyseButton = () => {
  const file = useUploadStore((state) => state.file);
  const isFileUploaded = useUploadStore((state) => state.isUploaded);
  const errorUpload = useUploadStore((state) => state.error);

  const errorAnalyse = useAnalyseStore((state) => state.error);
  const isProcessing = useAnalyseStore((state) => state.isProcessing);
  const isFinished = useAnalyseStore((state) => state.isFinished);

  const setAnalyseError = useAnalyseStore((state) => state.setError);

  const sendCsvToAggregate = useAnalyseStore(
    (state) => state.sendCsvToAggregate
  );

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
      onClick={async () => {
        if (file) {
          try {
            sendCsvToAggregate(file, 10000);
          } catch (error) {
            if (error) {
              setAnalyseError('упс, не то...');
            }
          }
        }
      }}
    >
      Отправить
    </button>
  );
};
