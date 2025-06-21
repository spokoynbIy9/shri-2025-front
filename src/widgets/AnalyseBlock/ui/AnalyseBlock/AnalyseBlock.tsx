import { AnalyseUploadedFile } from '../../../AnalyseUploadedFile';
import styles from './AnalyseBlock.module.css';
import { AnalyseHighlightsList } from '../AnalyseHighlightsList/AnalyseHighlightsList';

export const AnalyseBlock = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>
        Загрузите <b>csv</b> файл и получите <b>полную информацию</b> о нём за
        сверхнизкое время
      </p>
      <AnalyseUploadedFile />
      <AnalyseHighlightsList />
    </div>
  );
};
