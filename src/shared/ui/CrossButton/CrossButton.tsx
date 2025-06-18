import type { FC } from 'react';
import cross from '../../assets/images/cross.png';
import styles from './CrossButton.module.css';

interface CrossButtonProps {
  onClick: () => void;
}

export const CrossButton: FC<CrossButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.btn} onClick={onClick}>
      <img src={cross} alt="" />
    </button>
  );
};
