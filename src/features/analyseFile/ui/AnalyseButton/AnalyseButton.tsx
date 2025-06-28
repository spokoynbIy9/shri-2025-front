import { useUploadStore } from '../../../uploadFile';
import { useAnalyseStore } from '../../model/store';
import styles from './AnalyseButton.module.css';
import classNames from 'classnames';

export const AnalyseButton = () => {
	const file = useUploadStore((state) => state.file);
	const isFileUploaded = useUploadStore((state) => state.isUploaded);
	const errorUpload = useUploadStore((state) => state.error);

	const errorAnalyse = useAnalyseStore((state) => state.error);
	const isProcessing = useAnalyseStore((state) => state.isProcessing);
	const isFinished = useAnalyseStore((state) => state.isFinished);

	const sendCsvToAggregate = useAnalyseStore(
		(state) => state.sendCsvToAggregate
	);

	const handleSendCsv = () => {
		if (!file) return;
		sendCsvToAggregate(file, 100000);
	};

	return (
		<button
			data-testid="analyse-button"
			className={classNames(styles.btn, {
				[styles.btn__disabled]: !isFileUploaded,
				[styles.btn__fadeout]:
					(isFileUploaded && (errorUpload || errorAnalyse)) ||
					isProcessing ||
					isFinished,
			})}
			disabled={!isFileUploaded}
			onClick={handleSendCsv}
		>
			Отправить
		</button>
	);
};
