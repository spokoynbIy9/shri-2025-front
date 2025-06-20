import { useNavigate } from 'react-router-dom';
import styles from './LinkToGenerate.module.css';
import { RoutePath } from '../../../../shared/config/routes';

export const LinkToGenerate = () => {
  const navigate = useNavigate();

  const navigateToGeneratorCSV = () => navigate(RoutePath.GeneratorCSV);

  return (
    <button onClick={navigateToGeneratorCSV} className={styles.link}>
      Сгенерировать больше
    </button>
  );
};
