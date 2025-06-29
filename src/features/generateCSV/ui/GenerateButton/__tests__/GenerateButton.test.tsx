import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useGenerateStore } from '../../../model/store';
import { clickGenerateButton } from './utils/clickGenerateButton';

describe('Генерация CSV-файла по клику на кнопку', () => {
	beforeEach(() => {
		useGenerateStore.setState({
			isProcessing: false,
			isFinished: false,
			error: null,
		});
	});

	it('Отправляется запрос и запускается загрузка файла при успешной генерации', async () => {
		const fakeBlob = new Blob(['csv content'], { type: 'text/csv' });
		const fakeUrl = 'blob:http://localhost/fake-url';

		global.fetch = vi.fn().mockResolvedValueOnce({
			ok: true,
			blob: () => Promise.resolve(fakeBlob),
		});

		if (!URL.createObjectURL) {
			URL.createObjectURL = vi.fn();
		}
		if (!URL.revokeObjectURL) {
			URL.revokeObjectURL = vi.fn();
		}

		const createObjectURLMock = vi
			.spyOn(URL, 'createObjectURL')
			.mockReturnValue(fakeUrl);

		const revokeObjectURLMock = vi
			.spyOn(URL, 'revokeObjectURL')
			.mockImplementation(() => {});

		const clickMock = vi.fn();

		const originalCreateElement = document.createElement;

		vi.spyOn(document, 'createElement').mockImplementation(
			(tagName: string) => {
				const element = originalCreateElement.call(document, tagName);

				if (tagName === 'a') {
					(element as HTMLAnchorElement).click = clickMock;
				}

				return element;
			}
		);

		await clickGenerateButton();

		expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/report?'));
		expect(createObjectURLMock).toHaveBeenCalledWith(fakeBlob);
		expect(clickMock).toHaveBeenCalled();
		expect(revokeObjectURLMock).toHaveBeenCalledWith(fakeUrl);
	});
});

describe('Обработка ошибок при генерации', () => {
	beforeEach(() => {
		useGenerateStore.setState({
			isProcessing: false,
			isFinished: false,
			error: null,
		});
	});

	const mockStoreSetters = () => {
		const mockSetError = vi.fn();
		const mockSetProcessingMock = vi.fn();
		useGenerateStore.setState({
			...useGenerateStore.getState(),
			setError: mockSetError,
			setIsProcessing: mockSetProcessingMock,
		});
		return { mockSetError, mockSetProcessingMock };
	};

	it('Показывается сообщение об ошибке, если генерация завершилась неудачно (ответ не ok)', async () => {
		global.fetch = vi.fn().mockResolvedValueOnce({
			ok: false,
		});

		const { mockSetError, mockSetProcessingMock } = mockStoreSetters();

		await clickGenerateButton();

		expect(mockSetError).toHaveBeenCalledWith(
			expect.stringContaining('Ошибка')
		);
		expect(mockSetProcessingMock).toHaveBeenCalledWith(false);
	});

	it('Показывается сообщение об ошибке, если запрос завершился с исключением (например, ошибка сети)', async () => {
		const errorMessage = 'Network error';
		global.fetch = vi.fn().mockRejectedValue(new Error(errorMessage));

		const { mockSetError, mockSetProcessingMock } = mockStoreSetters();

		await clickGenerateButton();

		expect(mockSetError).toHaveBeenCalledWith(errorMessage);
		expect(mockSetProcessingMock).toHaveBeenCalledWith(false);
	});
});
