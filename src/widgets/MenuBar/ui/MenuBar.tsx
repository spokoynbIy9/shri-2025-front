import { MenuItem } from '../../../shared/ui/MenuItem';
import analysImg from '../../../shared/assets/images/csv_analyse_image.png';
import generatorImg from '../../../shared/assets/images/csv_generator_image.png';
import historyImg from '../../../shared/assets/images/history-linear.png';
import styles from './MenuBar.module.css';
import { useLocation } from 'react-router-dom';
import { RoutePath } from '../../../shared/config/routes';

export const MenuBar = () => {
  const location = useLocation();

  const MenuConfig = [
    {
      id: 1,
      image: analysImg,
      text: 'CSV Аналитик',
      needPath: RoutePath.AnalyseCSV,
    },
    {
      id: 2,
      image: generatorImg,
      text: 'CSV Генератор',
      needPath: RoutePath.GeneratorCSV,
    },
    { id: 3, image: historyImg, text: 'История', needPath: RoutePath.History },
  ];

  return (
    <div className={styles.container}>
      {MenuConfig.map((menuEl) => (
        <MenuItem
          key={menuEl.id}
          image={menuEl.image}
          text={menuEl.text}
          transferTo={menuEl.needPath}
          active={location.pathname === menuEl.needPath}
        />
      ))}
    </div>
  );
};
