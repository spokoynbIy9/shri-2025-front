import type { FC } from 'react';
import trash from '../../assets/images/Trash.png';
import styles from './DeleteButton.module.css';

interface DeleteButtonProps {
  onClick: () => void;
}

export const DeleteButton: FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.btn}>
      <img src={trash} alt="" />
    </button>
  );
};
