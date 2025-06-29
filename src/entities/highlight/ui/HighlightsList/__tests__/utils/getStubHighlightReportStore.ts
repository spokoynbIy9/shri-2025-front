import { vi } from 'vitest';
import type { HighlightReportState } from '../../../model/store';

export function getStubHighlightReportStore(
	overrides: Partial<HighlightReportState> = {}
) {
	return {
		highlightReports: [],
		curHighlightReportId: null,

		setCurHighlightReportId: vi.fn(),
		resetCurHighlightReportId: vi.fn(),

		createHighlightReport: vi.fn(),

		setHighlightGroupById: vi.fn(),
		setIsSuccessProcessedById: vi.fn(),

		getDetailedInfoById: vi.fn(),
		getCorrectTitlesForDetailedInfo: vi.fn(),

		saveHighlightReportByIdFromLS: vi.fn(),
		removeHighlightReportsFromLS: vi.fn(),
		removeHighlightReportByIdFromLS: vi.fn(),
		loadHighlightReportsFromLS: vi.fn(),

		...overrides,
	};
}
