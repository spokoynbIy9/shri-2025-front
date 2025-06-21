import styles from './UploadContainer.module.css';
import classNames from 'classnames';
import { useUploadStore } from '../../model/store';
import { getSuitableMessage } from '../../utils/getSuitableMessage';
import { useAnalyseStore } from '../../../analyseFile/model/store';
import { UploadButton } from '../UploadButton/UploadButton';

export const UploadContainer = () => {
  const isFileUploaded = useUploadStore((state) => state.isUploaded);
  const errorUpload = useUploadStore((state) => state.error);

  const errorAnalyse = useAnalyseStore((state) => state.error);
  const isAnalyzing = useAnalyseStore((state) => state.isProcessing);
  const isFinishedAnalyse = useAnalyseStore((state) => state.isFinished);

  const hasError = Boolean(errorUpload) || Boolean(errorAnalyse);

  return (
    <div
      className={classNames(styles.container, {
        [styles.container__uploaded]: !hasError && isFileUploaded,
        [styles.container__failed]: hasError && isFileUploaded,
      })}
    >
      <UploadButton
        hasError={hasError}
        isAnalyzing={isAnalyzing}
        isFinishedAnalyse={isFinishedAnalyse}
      />
      <p
        className={classNames(styles.notification, {
          [styles.notification__error]: hasError && isFileUploaded,
        })}
      >
        {getSuitableMessage(
          isFileUploaded,
          hasError,
          isAnalyzing,
          isFinishedAnalyse
        )}
      </p>
    </div>
  );
};
