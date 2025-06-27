import { useRef, type FC } from 'react';
import styles from './UploadButton.module.css';
import { CrossButton } from '../../../../shared/ui/CrossButton';
import { useUploadStore } from '../../model/store';
import { useAnalyseStore } from '../../../analyseFile';
import { Button } from '../../../../shared/ui';

interface UploadButtonProps {
	hasError: boolean;
	isAnalyzing: boolean;
	isFinishedAnalyse: boolean;
}

export const UploadButton: FC<UploadButtonProps> = ({
	hasError,
	isAnalyzing,
	isFinishedAnalyse,
}) => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const file = useUploadStore((state) => state.file);
	const setUploaded = useUploadStore((state) => state.setUploaded);
	const setFile = useUploadStore((state) => state.setFile);

	const setIsFinished = useAnalyseStore((state) => state.setIsFinished);
	const setAnalyseError = useAnalyseStore((state) => state.setError);

	const handleClick = () => {
		if (!file) fileInputRef.current?.click();
	};

	const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setFile(file);
			setUploaded(true);
		}
	};

	const resetLastFile = (event: React.MouseEvent<HTMLInputElement>) => {
		(event.target as HTMLInputElement).value = '';
	};

	const deleteFile = () => {
		setFile(null);
		setUploaded(false);
		setIsFinished(false);
		setAnalyseError(null);
	};

	return (
		<div className={styles.container_btn}>
			<input
				data-testid="input-upload-csv-file"
				ref={fileInputRef}
				type="file"
				accept=".csv,text/csv"
				className={styles.input}
				onChange={uploadFile}
				onClick={resetLastFile}
			/>

			<Button
				title="Загрузить файл"
				specific_type="upload"
				processingKit={{
					isProcessing: isAnalyzing,
					isFinishedProcessing: isFinishedAnalyse,
					titleFinishedProcessing: file?.name || null,
					hasError,
					titleError: file?.name ?? null,
					filename: file?.name ?? null,
				}}
				onClick={handleClick}
			/>

			{file?.name && !isAnalyzing && <CrossButton onClick={deleteFile} />}
		</div>
	);
};
