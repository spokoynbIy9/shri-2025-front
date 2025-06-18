import type { FC } from 'react';
import styles from './MenuItem.module.css';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

interface MenuItemProps {
  image: string;
  text: string;
  transferTo: string;

  active?: boolean;
}

export const MenuItem: FC<MenuItemProps> = ({
  image,
  text,
  transferTo,
  active,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(transferTo)}
      className={classNames(styles.menu_item, {
        [styles.menu_item__active]: active,
      })}
    >
      <img src={image} alt="" />
      <p>{text}</p>
    </div>
  );
};
