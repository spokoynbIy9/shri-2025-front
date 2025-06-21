import type { HighlightReport } from '../types';

export const HIGHLIGHTS_KEY = 'highlights_reports';

export function saveHighlightReportToStorage(report: HighlightReport) {
  const raw = localStorage.getItem(HIGHLIGHTS_KEY);
  const existingReports: Array<HighlightReport> = raw ? JSON.parse(raw) : [];

  localStorage.setItem(
    HIGHLIGHTS_KEY,
    JSON.stringify([...existingReports, report])
  );
}

export function clearHighlightReportsFromStorage() {
  localStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify([]));
}

export function removeHighlightReportByIdFromStorage(id: string) {
  const raw = localStorage.getItem(HIGHLIGHTS_KEY);
  const existingReports: HighlightReport[] = raw ? JSON.parse(raw) : [];

  const filteredReports = existingReports.filter((report) => report.id !== id);

  localStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify(filteredReports));

  return filteredReports;
}

export function loadHighlightReportsFromStorage(): Array<HighlightReport> {
  const raw = localStorage.getItem(HIGHLIGHTS_KEY);

  return raw ? JSON.parse(raw) : [];
}
