import { describe, expect, it, vi } from 'vitest';
import { AnalyseBlock } from '../AnalyseBlock';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMockFile } from '../../../../../shared/lib/test-utils';
import { fakeHighlights } from './fakeHighlights';

vi.mock('../../../../../entities/highlight/model/store', () => {
	return {
		useHighlightReportStore: vi.fn((selector) =>
			selector({
				curHighlightReportId: 'mock-id',
				getDetailedInfoById: () => ({
					total_spend_galactic: 300,
					rows_affected: 3,
					less_spent_at: 40,
					big_spent_at: 50,
					big_spent_value: 1000,
					average_spend_galactic: 300,
					big_spent_civ: 'humans',
					less_spent_civ: 'monsters',
					less_spent_value: 220,
				}),
				getCorrectTitlesForDetailedInfo: () => fakeHighlights,
			})
		),
	};
});

const analyseState = {
	isProcessing: false,
	isFinished: true,
	setIsFinished: vi.fn((val: boolean) => {
		analyseState.isFinished = val;
	}),
	setError: vi.fn(),
};

vi.mock('../../../../../features/analyseFile/model/store', () => {
	return {
		useAnalyseStore: vi.fn((selector) => selector(analyseState)),
	};
});

describe('Сброс состояния интерфейса при нажатии на кнопку очистки', () => {
	it('Очищает подгруженный файл и список хайлайтов при нажатии на кнопку очистки', async () => {
		const { getByTestId, rerender } = render(<AnalyseBlock />);

		const inputUpload = getByTestId('input-upload-csv-file');
		const file = createMockFile('test.csv');

		await userEvent.upload(inputUpload, file);
		expect(await screen.findByText('test.csv')).toBeInTheDocument();
		expect(
			await screen.findByTestId('highlights-list')
		).toBeInTheDocument();
		expect(await screen.findByTestId('cross-button')).toBeInTheDocument();

		const crossButton = getByTestId('cross-button');
		await userEvent.click(crossButton);

		expect(analyseState.setIsFinished).toHaveBeenCalledWith(false);
		expect(analyseState.isFinished).toBe(false);

		rerender(<AnalyseBlock />);

		expect(screen.queryByText('test.csv')).not.toBeInTheDocument();
		expect(screen.queryByTestId('highlights-list')).not.toBeInTheDocument();
	});
});
