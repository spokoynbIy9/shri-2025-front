import classNames from 'classnames';
import { useGenerateState } from '../model/store';
import { getSuitableMessage } from '../utils';
import { GenerateButton } from './GenerateButton';
import styles from './GenerateContainer.module.css';
import { CrossButton } from '../../../shared/ui/CrossButton';

export const GenerateContainer = () => {
  const isGenerating = useGenerateState((state) => state.isProcessing);
  const isFinished = useGenerateState((state) => state.isFinished);
  const hasError = Boolean(useGenerateState((state) => state.error));

  const setError = useGenerateState((state) => state.setError);
  const setIsFinished = useGenerateState((state) => state.setIsFinished);

  const message = getSuitableMessage(hasError, isGenerating, isFinished);

  const resetFlags = () => {
    setError(null);
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
