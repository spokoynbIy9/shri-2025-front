export interface ProcessingKit {
  isProcessing: boolean;
  isFinishedProcessing: boolean;
  titleFinishedProcessing: string | null;
  hasError: boolean;
  titleError: string | null;
  filename: string | null;
}
