import { useEffect, useRef, useState, type FC } from 'react';
import { CrossButton } from '../../../shared/ui/CrossButton';
import styles from './UploadButton.module.css';
import classNames from 'classnames';

interface UploadButtonProps {
  updateStateAnalyseBtn: (isUploadedFile: boolean) => void;
}

export const UploadButton: FC<UploadButtonProps> = ({
  updateStateAnalyseBtn,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const resetLastFile = (event: React.MouseEvent<HTMLInputElement>) => {
    (event.target as HTMLInputElement).value = '';
  };

  useEffect(() => {
    updateStateAnalyseBtn(!!fileName);
  }, [fileName, updateStateAnalyseBtn]);

  return (
    <div className={styles.container_btn}>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={uploadFile}
        onClick={resetLastFile}
      />
      <button
        className={classNames(styles.btn, { [styles.btn__uploaded]: fileName })}
        onClick={handleClick}
      >
        {fileName ? fileName : 'Загрузить файл'}
      </button>

      {fileName && <CrossButton onClick={() => setFileName(null)} />}
    </div>
  );
};
