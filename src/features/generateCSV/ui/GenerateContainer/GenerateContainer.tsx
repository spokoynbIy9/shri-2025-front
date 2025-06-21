import classNames from 'classnames';
import { GenerateButton } from '../GenerateButton/GenerateButton';
import styles from './GenerateContainer.module.css';
import { CrossButton } from '../../../../shared/ui/CrossButton';
import { getSuitableMessage } from '../../utils/getSuitableMessage';
import { useGenerateStore } from '../../model/store';

export const GenerateContainer = () => {
  const isGenerating = useGenerateStore((state) => state.isProcessing);
  const isFinished = useGenerateStore((state) => state.isFinished);
  const hasError = Boolean(useGenerateStore((state) => state.error));

  const setError = useGenerateStore((state) => state.setError);
  const setIsProcessing = useGenerateStore((state) => state.setIsProcessing);
  const setIsFinished = useGenerateStore((state) => state.setIsFinished);

  const message = getSuitableMessage(hasError, isGenerating, isFinished);

  const resetFlags = () => {
    setError(null);
    setIsProcessing(false);
    setIsFinished(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.btn_container}>
        <GenerateButton
          isGenerating={isGenerating}
          isFinishedGenerate={isFinished}
          hasError={hasError}
        />
        {(isFinished || hasError) && <CrossButton onClick={resetFlags} />}
      </div>

      {message ? (
        <p className={classNames({ [styles.notification__error]: hasError })}>
          {message}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};
