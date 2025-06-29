import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createMockFile } from '../../../shared/lib/test-utils';
import { useAnalyseStore } from '../model/store';

describe('Обработка ошибок в функции sendCsvToAggregate', () => {
	const mockSetError = vi.fn();
	const mockSetIsProcessing = vi.fn();

	beforeEach(() => {
		useAnalyseStore.setState({
			setError: mockSetError,
			setIsProcessing: mockSetIsProcessing,
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
		mockSetError.mockReset();
		mockSetIsProcessing.mockReset();
	});

	it('Обработка ошибки сети при запросе на анализ файла', async () => {
		const file = createMockFile('test.csv');

		const errorMessage = 'Network error';

		global.fetch = vi.fn().mockRejectedValue(new Error(errorMessage));

		await useAnalyseStore.getState().sendCsvToAggregate(file, 1);

		expect(mockSetIsProcessing).toHaveBeenCalledWith(true);
		expect(mockSetIsProcessing).toHaveBeenCalledWith(false);
		expect(mockSetError).toHaveBeenCalledWith(errorMessage);
	});

	it('Обработка ошибки при неудачном ответе сервера или пустом теле из запроса на анализ файла', async () => {
		const file = createMockFile('test.csv');

		global.fetch = vi.fn().mockResolvedValue({
			ok: false,
			body: {},
		});

		await useAnalyseStore.getState().sendCsvToAggregate(file, 1);

		expect(mockSetIsProcessing).toHaveBeenCalledWith(true);
		expect(mockSetError).toHaveBeenCalledWith(
			'Ошибка при отправке файла или пустой ответ'
		);
		expect(mockSetIsProcessing).toHaveBeenCalledWith(false);
	});
});
