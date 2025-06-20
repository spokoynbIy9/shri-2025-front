import { AnalyseButton } from '../../../features/analyseFile';
import { UploadContainer } from '../../../features/uploadFile';
import styles from './AnalyseUploadedFile.module.css';

export const AnalyseUploadedFile = () => {
  return (
    <div className={styles.container}>
      <UploadContainer />
      <AnalyseButton />
    </div>
  );
};
