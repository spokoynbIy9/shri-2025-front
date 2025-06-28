import { create } from 'zustand';
import {
	HighlightTitlesForView,
	type HighlightGroup,
	type HighlightReport,
	type HighlightTitlesKey,
} from './types';
import {
	clearHighlightReportsFromStorage,
	loadHighlightReportsFromStorage,
	removeHighlightReportByIdFromStorage,
	saveHighlightReportToStorage,
} from './utils/localStorage';

export interface HighlightReportState {
	highlightReports: HighlightReport[];
	curHighlightReportId: string | null;

	setCurHighlightReportId: (id: string) => void;
	resetCurHighlightReportId: () => void;

	createHighlightReport: (data: HighlightReport) => void;

	setHighlightGroupById: (id: string, highlightGroup: HighlightGroup) => void;
	setIsSuccessProcessedById: (
		id: string,
		isSuccessProcessed: boolean
	) => void;

	getDetailedInfoById: (id: string) => HighlightGroup | null;
	getCorrectTitlesForDetailedInfo: (
		curDetailedInfo: HighlightGroup | null
	) => [string, string][];

	saveHighlightReportByIdFromLS: (id: string) => void;
	removeHighlightReportsFromLS: () => void;
	removeHighlightReportByIdFromLS: (id: string) => void;
	loadHighlightReportsFromLS: () => void;
}

export const useHighlightReportStore = create<HighlightReportState>(
	(set, get) => ({
		// defaultStates
		highlightReports: [],
		curHighlightReportId: null,

		// function are connected with curHighlightReport
		setCurHighlightReportId: (id) => {
			set({ curHighlightReportId: id });
		},
		resetCurHighlightReportId: () => {
			set({ curHighlightReportId: null });
		},

		// creating highlightReport
		createHighlightReport: (data) => {
			set({ highlightReports: [data, ...get().highlightReports] });
		},

		// functions are connected with setting highlightReport by Id
		setHighlightGroupById(id, highlightGroup) {
			set((state) => ({
				highlightReports: state.highlightReports.map((report) =>
					report.id === id
						? { ...report, detailedInfo: highlightGroup }
						: report
				),
			}));
		},
		setIsSuccessProcessedById: (id, isSuccessProcessed) => {
			set((state) => ({
				highlightReports: state.highlightReports.map((report) =>
					report.id === id
						? { ...report, isSuccessProcessed }
						: report
				),
			}));
		},

		// function is in order to get DetailedInfo form HighlightReport by Id
		getDetailedInfoById: (id) => {
			const highlightReports = get().highlightReports;

			const curHighlight = highlightReports.find(
				(report) => report.id === id
			);

			return curHighlight ? curHighlight!.detailedInfo : null;
		},
		// get correct titles for view on front
		getCorrectTitlesForDetailedInfo: (curDetailedInfo) => {
			if (curDetailedInfo) {
				return Object.entries(curDetailedInfo).map(
					([curTitle, value]) => [
						HighlightTitlesForView[curTitle as HighlightTitlesKey],
						value.toString(),
					]
				);
			}
			return [];
		},

		// functions are connected with LS (localStorage)
		saveHighlightReportByIdFromLS: (id) => {
			const highlightReports = get().highlightReports;

			const highlightReport = highlightReports.find(
				(report) => report.id === id
			);

			saveHighlightReportToStorage(highlightReport!);
		},
		removeHighlightReportsFromLS: () => {
			clearHighlightReportsFromStorage();
			set({ highlightReports: [] });
		},
		removeHighlightReportByIdFromLS: (id: string) => {
			const filteredHighlightReports =
				removeHighlightReportByIdFromStorage(id);

			set({ highlightReports: filteredHighlightReports });
		},
		loadHighlightReportsFromLS: () => {
			const highlightReportsFromLS = loadHighlightReportsFromStorage();

			set({ highlightReports: highlightReportsFromLS });
		},
	})
);
