import { useState, type FC } from 'react';
import styles from './HistoryHighlightReportsItem.module.css';
import { DeleteButton } from '../../../../shared/ui/DeleteButton';
import documents from '../../../../shared/assets/images/filename_doc.png';
import smile from '../../../../shared/assets/images/smile.png';
import sad_smile from '../../../../shared/assets/images/sad_smile.png';
import classNames from 'classnames';
import { Modal } from '../../../../shared/ui/Modal';
import {
	HighlightsList,
	useHighlightReportStore,
	type HighlightReport,
} from '../../../../entities/highlight';

interface HistoryHighlightsItemProps {
	highlightInfo: HighlightReport;
}

export const HistoryHighlightReportsItem: FC<HistoryHighlightsItemProps> = ({
	highlightInfo,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const removeHighlightReportById = useHighlightReportStore(
		(state) => state.removeHighlightReportByIdFromLS
	);

	const { id, filename, date, isSuccessProcessed, detailedInfo } =
		highlightInfo;

	const getCorrectTitlesForDetailedInfo = useHighlightReportStore(
		(state) => state.getCorrectTitlesForDetailedInfo
	);

	const closeModal = () => setIsOpen(false);

	return (
		<div
			className={styles.container}
			data-testid={`highlight-report-card-${id}`}
		>
			<div
				data-testid={`highlight-report-${id}`}
				className={styles.containerInfo}
				onClick={() => {
					if (isSuccessProcessed) setIsOpen(true);
				}}
			>
				<div className={styles.wrapperInfo}>
					<img src={documents} alt="" />
					<p>{filename}</p>
				</div>

				<div className={styles.wrapperInfo}>
					<p>{date}</p>
				</div>

				<div
					className={classNames(styles.wrapperInfo, {
						[styles.wrapperInfo__disabled]: !isSuccessProcessed,
					})}
				>
					<p>Обработан успешно</p>
					<img src={smile} alt="" />
				</div>

				<div
					className={classNames(styles.wrapperInfo, {
						[styles.wrapperInfo__disabled]: isSuccessProcessed,
					})}
				>
					<p>Не удалось обработать</p>
					<img src={sad_smile} alt="" />
				</div>
			</div>
			<DeleteButton onClick={() => removeHighlightReportById(id)} />
			<Modal isOpen={isOpen} onClose={closeModal}>
				<HighlightsList
					highlights={getCorrectTitlesForDetailedInfo(detailedInfo)}
					typeList="history"
				/>
			</Modal>
		</div>
	);
};
