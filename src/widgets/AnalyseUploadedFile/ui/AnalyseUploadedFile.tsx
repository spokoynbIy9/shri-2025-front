import { useCallback, useState } from 'react';
import { AnalyseButton } from '../../../features/analyseFile';
import { UploadContainer } from '../../../features/uploadFile';
import styles from './AnalyseUploadedFile.module.css';

export const AnalyseUploadedFile = () => {
  const [isDisabledAnalyseBtn, setIsDisabledAnalyseBtn] = useState(true);

  const updateDisabledAnalyseBtn = useCallback((isUploadedFile: boolean) => {
    setIsDisabledAnalyseBtn(!isUploadedFile);
  }, []);

  return (
    <div className={styles.container}>
      <UploadContainer
        updateStateAnalyseBtn={updateDisabledAnalyseBtn}
        isFileUploaded={!isDisabledAnalyseBtn}
      />
      <AnalyseButton isDisabled={isDisabledAnalyseBtn} />
    </div>
  );
};
