import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAnalyseStore } from '../../model/store';
import { createMockFile } from '../../../../shared/lib/test-utils';
import { act } from '@testing-library/react';
import { API_BASE_URL } from '../../../../shared/config/api';

describe('Analyse', () => {
	beforeEach(() => {
		const { setError, setIsProcessing, setIsFinished } =
			useAnalyseStore.getState();

		setError(null);
		setIsProcessing(false);
		setIsFinished(false);
	});

	// todo
	// зачем тогда возвращать что-то(highlightGroup)?
	// давай уберём
	it('Реализация запроса анализа файла', async () => {
		const fetchSpy = vi.fn().mockResolvedValue({
			ok: true,
			body: new ReadableStream({
				start(controller) {
					controller.enqueue(
						new TextEncoder().encode(
							JSON.stringify({
								id: 'test-id',
								filename: 'test.csv',
								total_spend_galactic: 123,
								big_spent_value: 100,
								average_spend_galactic: 50,
								big_spent_at: 150,
								less_spent_at: 50,
							}) + '\n'
						)
					);
					controller.close();
				},
			}),
		});

		vi.stubGlobal('fetch', fetchSpy);

		const file = createMockFile('test.csv', 'text/csv');
		const countRows = 20;
		const { sendCsvToAggregate } = useAnalyseStore.getState();

		await act(async () => await sendCsvToAggregate(file, countRows));

		expect(fetchSpy).toHaveBeenCalledTimes(1);
		expect(fetchSpy).toHaveBeenCalledWith(
			`${API_BASE_URL}/aggregate?rows=${countRows}`,
			expect.objectContaining({
				method: 'POST',
				body: expect.any(FormData),
			})
		);
	});
});
