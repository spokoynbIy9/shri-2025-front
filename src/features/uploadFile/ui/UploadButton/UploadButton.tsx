import { useRef, type FC } from 'react';
import styles from './UploadButton.module.css';
import classNames from 'classnames';
import { CrossButton } from '../../../../shared/ui/CrossButton';
import { useUploadStore } from '../../model/store';
import { useAnalyseStore } from '../../../analyseFile';

interface UploadButtonProps {
  hasError: boolean;
  isAnalyzing: boolean;
  isFinishedAnalyse: boolean;
}

export const UploadButton: FC<UploadButtonProps> = ({
  hasError,
  isAnalyzing,
  isFinishedAnalyse,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const file = useUploadStore((state) => state.file);
  const setUploaded = useUploadStore((state) => state.setUploaded);
  const setFile = useUploadStore((state) => state.setFile);

  const setIsFinished = useAnalyseStore((state) => state.setIsFinished);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      setUploaded(true);
    }
  };

  const resetLastFile = (event: React.MouseEvent<HTMLInputElement>) => {
    (event.target as HTMLInputElement).value = '';
  };

  const deleteFile = () => {
    setFile(null);
    setUploaded(false);
    setIsFinished(false);
  };

  return (
    <div className={styles.container_btn}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,text/csv"
        className={styles.input}
        onChange={uploadFile}
        onClick={resetLastFile}
      />
      <button
        className={classNames(styles.btn, {
          [styles.btn__processing]: !hasError && file?.name && isAnalyzing,
          [styles.btn__uploaded]: !hasError && file?.name && !isFinishedAnalyse,
          [styles.btn__failed]: hasError && file?.name,
          [styles.btn__finishedProcessing]: isFinishedAnalyse,
          [styles.btn__disabled]: file?.name,
        })}
        onClick={handleClick}
        disabled={Boolean(file?.name)}
      >
        {file?.name ? (
          !isAnalyzing ? (
            file?.name
          ) : (
            <span className={styles.loader}></span>
          )
        ) : (
          'Загрузить файл'
        )}
      </button>

      {file?.name && !hasError && !isAnalyzing && (
        <CrossButton onClick={deleteFile} />
      )}
    </div>
  );
};
