import type { FC } from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { getCorrectTitleButton } from '../../lib/helpers/getCorrectTitleButton';
import type { ProcessingKit } from '../../lib/types/processingKit';

interface ButtonProps {
	title: string;

	specific_type?: 'default' | 'upload';
	processingKit?: ProcessingKit;

	onClick: () => void;
}

export const Button: FC<ButtonProps> = ({
	title,
	processingKit,
	specific_type,

	onClick,
}) => {
	const { isProcessing, isFinishedProcessing, hasError, filename } =
		processingKit ?? {};

	return (
		<button
			onClick={onClick}
			className={classNames(styles.btn, {
				[styles.btn__uploadType]: specific_type === 'upload',
				[styles.btn__failed]: hasError,
				[styles.btn__processing]: isProcessing,
				[styles.btn__finishedProcessing]: isFinishedProcessing,
				[styles.btn__uploaded]:
					!hasError && !isFinishedProcessing && filename,
				[styles.btn__disabled]: filename,
			})}
		>
			{isProcessing ? (
				<Loader />
			) : (
				getCorrectTitleButton(title, processingKit)
			)}
		</button>
	);
};
