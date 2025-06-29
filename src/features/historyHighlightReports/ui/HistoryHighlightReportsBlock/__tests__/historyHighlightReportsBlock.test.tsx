import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
	useHighlightReportStore,
	type HighlightReport,
} from '../../../../../entities/highlight';
import { HIGHLIGHTS_KEY } from '../../../../../entities/highlight/model/utils/localStorage';
import { render, screen, waitFor, within } from '@testing-library/react';
import { HistoryHighlightReportsBlock } from '../HistoryHighlightReportsBlock';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockHighlights = {
	total_spend_galactic: 200,
	rows_affected: 2,
	less_spent_at: '10 мая',
	big_spent_at: '19 февраля',
	big_spent_value: 333,
	average_spend_galactic: 223,
	big_spent_civ: 'monsters',
	less_spent_civ: 'humans',
};

const mockData: Array<HighlightReport> = [
	{
		id: 'test-id-1',
		filename: 'test.csv',
		date: '2025-06-25',
		isSuccessProcessed: true,
		detailedInfo: mockHighlights,
	},
	{
		id: 'test-id-2',
		filename: 'delete.csv',
		date: '2025-06-26',
		isSuccessProcessed: true,
		detailedInfo: mockHighlights,
	},
];

const highlightsForFirstReport: [string, string][] = [
	['общие расходы в галактических кредитах', '200'],
	['количество обработанных записей', '2'],
	['день года с минимальными расходами', '10 мая'],
	['день года с максимальными расходами', '19 февраля'],
	['максимальная сумма расходов за день ', '333'],
	['средние расходы в галактических кредитах', '223'],
	['цивилизация с максимальными расходами', 'monsters'],
	['цивилизация с минимальными расходами', 'humans'],
];

describe('История отчётов с хайлайтами — HistoryHighlightReportsBlock', () => {
	beforeEach(() => {
		useHighlightReportStore.setState({ highlightReports: [] });

		localStorage.setItem(HIGHLIGHTS_KEY, JSON.stringify(mockData));
	});

	it('Загружает и отображает список отчётов из localStorage при инициализации', async () => {
		render(
			<MemoryRouter>
				<HistoryHighlightReportsBlock />
			</MemoryRouter>
		);

		const filename = await screen.findByText(/test.csv/i);
		expect(filename).toBeInTheDocument();
	});

	it('Удаляет отдельный отчёт при клике на кнопку удаления', async () => {
		render(
			<MemoryRouter>
				<HistoryHighlightReportsBlock />
			</MemoryRouter>
		);

		expect(screen.getByText(/test.csv/i)).toBeInTheDocument();
		expect(screen.getByText(/delete.csv/i)).toBeInTheDocument();

		const card = screen.getByTestId('highlight-report-card-test-id-2');

		const deleteBtn = within(card).getByTestId('delete-button');

		await userEvent.click(deleteBtn);

		expect(screen.queryByText(/delete.csv/i)).not.toBeInTheDocument();

		expect(screen.getByText(/test.csv/i)).toBeInTheDocument();
	});

	it('Открывает модальное окно с хайлайтами по клику на отчёт', async () => {
		render(
			<MemoryRouter>
				<HistoryHighlightReportsBlock />
			</MemoryRouter>
		);

		const reportCard = screen.getByTestId('highlight-report-test-id-1');
		await userEvent.click(reportCard);

		expect(
			await screen.findByTestId('highlights-list')
		).toBeInTheDocument();

		await waitFor(() => {
			const highlightTitles = screen
				.getAllByTestId('highlight-title')
				.map((el) => el.textContent);

			expect(highlightTitles).toEqual(
				highlightsForFirstReport.map(([, val]) => val)
			);
		});
	});

	it('Удаляет всю историю отчётов по нажатию кнопки очистки', async () => {
		render(
			<MemoryRouter>
				<HistoryHighlightReportsBlock />
			</MemoryRouter>
		);

		expect(screen.getByText(/test.csv/i)).toBeInTheDocument();
		expect(screen.getByText(/delete.csv/i)).toBeInTheDocument();

		const clearBtn = screen.getByTestId('clear-history-button');

		await userEvent.click(clearBtn);

		expect(screen.queryByText(/delete.csv/i)).not.toBeInTheDocument();

		expect(screen.queryByText(/test.csv/i)).not.toBeInTheDocument();
	});

	afterEach(() => {
		localStorage.clear();
	});
});
