import styles from './UploadContainer.module.css';
import classNames from 'classnames';
import { useUploadStore } from '../../model/store';
import { getSuitableMessage } from '../../utils/getSuitableMessage';
import { useAnalyseStore } from '../../../analyseFile/model/store';
import { UploadButton } from '../UploadButton/UploadButton';
import { useState } from 'react';

export const UploadContainer = () => {
  const [isDragActive, setIsDragActive] = useState(false);
  const setUploaded = useUploadStore((state) => state.setUploaded);
  const setFile = useUploadStore((state) => state.setFile);

  const isFileUploaded = useUploadStore((state) => state.isUploaded);
  const errorUpload = useUploadStore((state) => state.error);

  const errorAnalyse = useAnalyseStore((state) => state.error);
  const isAnalyzing = useAnalyseStore((state) => state.isProcessing);
  const isFinishedAnalyse = useAnalyseStore((state) => state.isFinished);

  const hasError = Boolean(errorUpload) || Boolean(errorAnalyse);

  // dnd
  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragActive(false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files.length === 0) return;

    const file = files[0];

    const isCSV =
      file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv');

    if (!isCSV) {
      alert('Пожалуйста, загрузите CSV файл.');
      return;
    }

    setFile(file);
    setUploaded(true);
  };

  return (
    <div
      className={classNames(styles.container, {
        [styles.container__uploaded]: !hasError && isFileUploaded,
        [styles.container__failed]: hasError && isFileUploaded,
        [styles.container__dragActive]: isDragActive,
      })}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
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
