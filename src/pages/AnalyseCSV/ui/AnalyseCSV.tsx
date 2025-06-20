import { HighlightsList } from '../../../features/hightlights/ui/HighlightsList';
import { AnalyseUploadedFile } from '../../../widgets/AnalyseUploadedFile';
import styles from './AnalyseCSV.module.css';

const AnalyseCSV = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>
        Загрузите <b>csv</b> файл и получите <b>полную информацию</b> о нём за
        сверхнизкое время
      </p>
      <AnalyseUploadedFile />
      <HighlightsList />
    </div>
  );
};

export default AnalyseCSV;
