import { AnalyseUploadedFile } from '../../../widgets/AnalyseUploadedFile';
import styles from './AnalyseCSV.module.css';

const AnalyseCSV = () => {
  return (
    <div>
      <p className={styles.title}>
        Загрузите <b>csv</b> файл и получите <b>полную информацию</b> о нём за
        сверхнизкое время
      </p>
      <AnalyseUploadedFile />
    </div>
  );
};

export default AnalyseCSV;
