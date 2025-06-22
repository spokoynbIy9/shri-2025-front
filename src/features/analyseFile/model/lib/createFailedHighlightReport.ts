import { useHighlightReportStore } from '../../../../entities/highlight';
import { getCorrectDataFormat } from '../../../../shared/lib/helpers/getCorrectDataFormat';

export function createFailedHighlightReport(file: File): void {
  const id = Date.now().toString();
  const filename = file.name;

  const resultData = {
    id,
    filename,
    date: getCorrectDataFormat(new Date()),
    isSuccessProcessed: false,
    detailedInfo: null,
  };

  const { createHighlightReport, saveHighlightReportByIdFromLS } =
    useHighlightReportStore.getState();

  createHighlightReport(resultData);
  saveHighlightReportByIdFromLS(id);
}
