import { useState, type FC } from 'react';
import {
  useHighlightStore,
  type Highlight,
} from '../../../hightlights/model/store';
import styles from './HistoryHighlightsItem.module.css';
import { DeleteButton } from '../../../../shared/ui/DeleteButton';
import documents from '../../../../shared/assets/images/filename_doc.png';
import smile from '../../../../shared/assets/images/smile.png';
import sad_smile from '../../../../shared/assets/images/sad_smile.png';
import classNames from 'classnames';
import { Modal } from '../../../../shared/ui/Modal';
import { HighlightsDetailedInfoList } from '../HighlightsDetailedInfoList/HighlightsDetailedInfoList';

interface HistoryHighlightsItemProps {
  highlightInfo: Highlight;
}

export const HistoryHighlightsItem: FC<HistoryHighlightsItemProps> = ({
  highlightInfo,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const removeHighlightById = useHighlightStore(
    (state) => state.removeHighlightByIdFromLocalStorage
  );

  const { id, filename, date, isSuccessProcessed, detailedInfo } =
    highlightInfo;

  const closeModal = () => setIsOpen(false);

  return (
    <div className={styles.container}>
      <div
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
      <DeleteButton onClick={() => removeHighlightById(id)} />
      <Modal isOpen={isOpen} onClose={closeModal}>
        <HighlightsDetailedInfoList detailedInfo={detailedInfo} />
      </Modal>
    </div>
  );
};
