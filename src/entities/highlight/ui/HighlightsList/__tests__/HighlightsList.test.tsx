import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi,
	type Mock,
} from 'vitest';
import { useHighlightReportStore } from '../../../model/store';

import { createMockFile } from '../../../../../shared/lib/test-utils';
import { useAnalyseStore } from '../../../../../features/analyseFile';
import { act, render, waitFor } from '@testing-library/react';
import {
	HighlightTitlesForView,
	type HighlightGroup,
	type HighlightTitlesKey,
} from '../../../model/types';
import { screen } from '@testing-library/react';
import { HighlightsList } from '../HighlightsList';
import { getStubHighlightReportStore } from './getStubHighlightReportStore';

vi.mock('../../../model/store', () => {
	return {
		useHighlightReportStore: {
			getState: vi.fn(),
		},
	};
});

describe('Проверка плавного обновления данных во время запроса на анализ файла', () => {
	const mockGetCorrectTitlesForDetailedInfo = vi.fn(
		(data: HighlightGroup | null): [string, string][] => {
			if (data) {
				return Object.entries(data).map(([curTitle, value]) => [
					HighlightTitlesForView[curTitle as HighlightTitlesKey],
					value.toString(),
				]);
			}
			return [];
		}
	);

	beforeEach(() => {
		vi.resetAllMocks();

		(useHighlightReportStore.getState as Mock).mockReturnValue(
			getStubHighlightReportStore({
				getCorrectTitlesForDetailedInfo:
					mockGetCorrectTitlesForDetailedInfo,
			})
		);
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('Плавное обновление хайлайтов при стриминговом анализе CSV-файла', async () => {
		// Подготовка
		const firstHighlightGroupDto = JSON.stringify({
			total_spend_galactic: 100,
			rows_affected: 1,
			less_spent_at: 120,
			big_spent_at: 60,
			big_spent_value: 555,
			average_spend_galactic: 555,
			big_spent_civ: 'monsters',
			less_spent_civ: 'humans',
			less_spent_value: 333,
		});

		const secondHighlightGroupDto = JSON.stringify({
			total_spend_galactic: 200,
			rows_affected: 2,
			less_spent_at: 130,
			big_spent_at: 50,
			big_spent_value: 333,
			average_spend_galactic: 223,
			big_spent_civ: 'monsters',
			less_spent_civ: 'humans',
			less_spent_value: 333,
		});

		let controller: ReadableStreamDefaultController<Uint8Array>;
		const stream = new ReadableStream({
			start(c) {
				controller = c;
			},
		});

		const fetchSpy = vi.fn().mockResolvedValue({
			ok: true,
			body: stream,
		});
		vi.stubGlobal('fetch', fetchSpy);

		const file = createMockFile('test.csv');
		const { sendCsvToAggregate } = useAnalyseStore.getState();
		const sendPromise = sendCsvToAggregate(file, 1);

		const { rerender } = render(
			<HighlightsList highlights={[]} typeList="analyse" />
		);

		await act(async () => {
			controller.enqueue(
				new TextEncoder().encode(
					`${JSON.stringify(firstHighlightGroupDto)}\n`
				)
			);
		});

		let mockData = mockGetCorrectTitlesForDetailedInfo({
			total_spend_galactic: 200,
			rows_affected: 1,
			less_spent_at: '10 мая',
			big_spent_at: '19 февраля',
			big_spent_value: 333,
			average_spend_galactic: 223,
			big_spent_civ: 'monsters',
			less_spent_civ: 'humans',
		});

		rerender(<HighlightsList highlights={mockData} typeList="analyse" />);

		await waitFor(() => {
			// проверяемое поведение
			const highlightTitles = screen
				.getAllByTestId('highlight-title')
				.map((el) => el.textContent);

			// проверка результата
			expect(highlightTitles).toEqual(mockData.map(([, val]) => val));
		});

		await act(async () => {
			controller.enqueue(
				new TextEncoder().encode(
					`${JSON.stringify(secondHighlightGroupDto)}\n`
				)
			);
		});

		mockData = mockGetCorrectTitlesForDetailedInfo({
			total_spend_galactic: 300,
			rows_affected: 3,
			less_spent_at: '9 февраля',
			big_spent_at: '19 февраля',
			big_spent_value: 1000,
			average_spend_galactic: 300,
			big_spent_civ: 'humans',
			less_spent_civ: 'monsters',
		});

		rerender(<HighlightsList highlights={mockData} typeList="analyse" />);

		await waitFor(() => {
			// проверяемое поведение
			const highlightTitles = screen
				.getAllByTestId('highlight-title')
				.map((el) => el.textContent);

			// проверка результата
			expect(highlightTitles).toEqual(mockData.map(([, val]) => val));
		});

		await act(async () => {
			controller.close();
			await sendPromise;
		});
	});
});
