import { describe, expect, it, vi } from 'vitest';
import { useAnalyseStore } from '../../../model/store';
import { createMockFile } from '../../../../../shared/lib/test-utils';
import { act } from '@testing-library/react';
import { API_BASE_URL } from '../../../../../shared/config/api';

describe('Отправка CSV-файла на анализ', () => {
	it('Должен отправлять POST-запрос с файлом и параметрами', async () => {
		const fetchSpy = vi.fn().mockResolvedValue({
			ok: true,
			body: new ReadableStream({
				start(controller) {
					controller.enqueue(new TextEncoder().encode('{}\n'));
					controller.close();
				},
			}),
		});

		vi.stubGlobal('fetch', fetchSpy);

		const file = createMockFile('test.csv', 'text/csv');
		const { sendCsvToAggregate } = useAnalyseStore.getState();

		await act(async () => await sendCsvToAggregate(file, 20));

		expect(fetchSpy).toHaveBeenCalledTimes(1);
		expect(fetchSpy).toHaveBeenCalledWith(
			`${API_BASE_URL}/aggregate?rows=${20}`,
			expect.objectContaining({
				method: 'POST',
				body: expect.any(FormData),
			})
		);
	});
});
