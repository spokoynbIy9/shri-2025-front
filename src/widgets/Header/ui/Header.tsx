import styles from './Header.module.css';
import logo from '../../../shared/assets/images/Logo.png';
import sublogo from '../../../shared/assets/images/SubLogo.png';
import { MenuBar } from '../../MenuBar';

export const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo_wrapper}>
        <img className={styles.logo_img} src={logo} alt="Летние школы" />
        <img src={sublogo} alt="Межгалактическая аналитика" />
      </div>
      <MenuBar />
    </div>
  );
};
