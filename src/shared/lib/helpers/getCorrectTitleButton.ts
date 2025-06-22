import type { ProcessingKit } from '../types/processingKit';

export function getCorrectTitleButton(
  defaultTitle: string,
  processingKit: ProcessingKit | undefined
): string {
  if (!processingKit) return defaultTitle;

  const {
    hasError,
    titleError,
    isFinishedProcessing,
    titleFinishedProcessing,
  } = processingKit;

  if (hasError) {
    return titleError;
  } else if (isFinishedProcessing) {
    return titleFinishedProcessing;
  } else {
    return defaultTitle;
  }
}
