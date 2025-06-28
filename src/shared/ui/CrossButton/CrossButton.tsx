import type { FC } from 'react';
import cross from '../../assets/images/cross.png';
import styles from './CrossButton.module.css';
import classNames from 'classnames';

interface CrossButtonProps {
	onClick: () => void;

	specific_type?: 'default' | 'modal';
}

export const CrossButton: FC<CrossButtonProps> = ({
	onClick,
	specific_type,
}) => {
	return (
		<button
			data-testid="cross-button"
			className={classNames(styles.btn, {
				[styles.btn_modal]: specific_type === 'modal',
			})}
			onClick={onClick}
		>
			<img src={cross} alt="" />
		</button>
	);
};
