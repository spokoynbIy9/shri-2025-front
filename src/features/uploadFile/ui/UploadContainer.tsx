import { type FC } from 'react';
import { UploadButton } from './UploadButton';
import styles from './UploadContainer.module.css';
import classNames from 'classnames';

interface UploadContainerProps {
  updateStateAnalyseBtn: (isUploadedFile: boolean) => void;
  isFileUploaded: boolean;
}

export const UploadContainer: FC<UploadContainerProps> = ({
  updateStateAnalyseBtn,
  isFileUploaded,
}) => {
  return (
    <div
      className={classNames(styles.container, {
        [styles.container__uploaded]: isFileUploaded,
      })}
    >
      <UploadButton updateStateAnalyseBtn={updateStateAnalyseBtn} />
      <p className={styles.notification}>
        {isFileUploaded ? 'файл загружен!' : 'или перетащите сюда'}
      </p>
    </div>
  );
};
