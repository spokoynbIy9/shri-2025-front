import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useGenerateStore } from '../../model/store';
import { render, screen } from '@testing-library/react';
import { GenerateButton } from './GenerateButton';
import userEvent from '@testing-library/user-event';

describe('GenerateButton', () => {
	beforeEach(() => {
		useGenerateStore.setState({
			isProcessing: false,
			isFinished: false,
			error: null,
		});
	});

	it('Успешная генерация файла', async () => {
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

		render(
			<GenerateButton
				isGenerating={false}
				isFinishedGenerate={false}
				hasError={false}
			/>
		);

		const generateButton = screen.getByRole('button', {
			name: /начать генерацию/i,
		});

		await userEvent.click(generateButton);

		expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/report?'));
		expect(createObjectURLMock).toHaveBeenCalledWith(fakeBlob);
		expect(clickMock).toHaveBeenCalled();
		expect(revokeObjectURLMock).toHaveBeenCalledWith(fakeUrl);
	});

	it('Обработка ошибки при генерации', async () => {
		global.fetch = vi.fn().mockResolvedValueOnce({
			ok: false,
		});

		const mockSetError = vi.fn();
		const mockSetProcessingMock = vi.fn();

		useGenerateStore.setState({
			...useGenerateStore.getState(),
			setError: mockSetError,
			setIsProcessing: mockSetProcessingMock,
		});

		render(
			<GenerateButton
				isGenerating={false}
				isFinishedGenerate={false}
				hasError={false}
			/>
		);

		const generateButton = screen.getByRole('button', {
			name: /начать генерацию/i,
		});
		await userEvent.click(generateButton);

		expect(mockSetError).toHaveBeenCalledWith(
			expect.stringContaining('Ошибка')
		);
		expect(mockSetProcessingMock).toHaveBeenCalledWith(false);
	});

	it('Обработка ошибок генерации, если возникли проблемы с сетью/backend', async () => {
		const errorMessage = 'Network error';
		global.fetch = vi.fn().mockRejectedValue(new Error(errorMessage));

		const mockSetError = vi.fn();
		const mockSetProcessingMock = vi.fn();

		useGenerateStore.setState({
			...useGenerateStore.getState(),
			setError: mockSetError,
			setIsProcessing: mockSetProcessingMock,
		});

		render(
			<GenerateButton
				isGenerating={false}
				isFinishedGenerate={false}
				hasError={false}
			/>
		);

		const generateButton = screen.getByRole('button', {
			name: /начать генерацию/i,
		});
		await userEvent.click(generateButton);

		expect(mockSetError).toHaveBeenCalledWith(errorMessage);
		expect(mockSetProcessingMock).toHaveBeenCalledWith(false);
	});
});
