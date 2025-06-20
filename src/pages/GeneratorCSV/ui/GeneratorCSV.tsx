import { GenerateContainer } from '../../../features/generateCSV';
import styles from './GeneratorCSV.module.css';

const GeneratorCSV = () => {
  return (
    <div>
      <p className={styles.title}>
        Сгенерируйте готовый csv-файл нажатием одной кнопки
      </p>
      <GenerateContainer />
    </div>
  );
};

export default GeneratorCSV;
