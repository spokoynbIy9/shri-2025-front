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
    filename,
  } = processingKit;

  if (hasError) {
    return titleError;
  } else if (isFinishedProcessing) {
    return titleFinishedProcessing;
  } else if (filename) {
    return filename;
  } else return defaultTitle;
}
