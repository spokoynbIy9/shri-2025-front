import { beforeEach, describe, expect, it } from 'vitest';
import { useUploadStore } from '../../model/store';
import { waitFor } from '@testing-library/react';
import { makeDropToZone } from './__tests__/utils';
import { mockAlert } from '../../../../shared/lib/test-utils';

describe('FileDropzone', () => {
	beforeEach(() => {
		const { setFile, setError, setUploaded } = useUploadStore.getState();

		setFile(null);
		setError(null);
		setUploaded(false);
	});

	it('Обрабатывает перетаскивание файла и обновляет состояние', async () => {
		makeDropToZone('upload-container', 'test.csv', 'text/csv', 123);

		await waitFor(() => {
			const { file: uploadedFile, isUploaded } =
				useUploadStore.getState();

			expect(uploadedFile?.name).toBe('test.csv');

			expect(isUploaded).toBe(true);
		});
	});

	it('Не загружает файл с неподдерживаемым типом (например .txt)', async () => {
		const { restore } = mockAlert();

		makeDropToZone('upload-container', 'test.txt', 'text/plain', 123);

		await waitFor(() => {
			const { file: uploadedFile, isUploaded } =
				useUploadStore.getState();

			expect(uploadedFile).toBeNull();
			expect(isUploaded).toBe(false);
		});

		restore();
	});

	it('Вызывает alert при попытке загрузки неверного файла', async () => {
		const { alertMock, restore } = mockAlert();

		makeDropToZone('upload-container', 'test.txt', 'text/plain', 123);

		await waitFor(() => {
			expect(alertMock).toHaveBeenCalledWith(
				'Пожалуйста, загрузите CSV файл.'
			);
		});

		restore();
	});
});
