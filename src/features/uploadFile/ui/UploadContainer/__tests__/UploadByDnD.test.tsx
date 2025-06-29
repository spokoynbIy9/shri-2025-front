import { beforeEach, describe, expect, it } from 'vitest';
import { waitFor, screen } from '@testing-library/react';
import { useUploadStore } from '../../../model/store';
import { makeDropToZone } from './utils/makeDropToZone';
import { mockAlert } from '../../../../../shared/lib/test-utils';

describe('FileDropzone — загрузка файла через drag-and-drop', () => {
	beforeEach(() => {
		const { setFile, setError, setUploaded } = useUploadStore.getState();

		setFile(null);
		setError(null);
		setUploaded(false);
	});

	it('Отображает имя загруженного файла на кнопке после его загрузки через drag-and-drop', async () => {
		makeDropToZone('upload-container', 'test.csv', 'text/csv', 'test');

		await waitFor(() => {
			const { file: uploadedFile, isUploaded } =
				useUploadStore.getState();

			expect(uploadedFile?.name).toBe('test.csv');

			expect(isUploaded).toBe(true);

			expect(screen.getByText('test.csv')).toBeInTheDocument();
		});
	});

	it('Не загружает файл с неподдерживаемым типом (например, .txt) через drag-and-drop', async () => {
		const { restore } = mockAlert();

		makeDropToZone('upload-container', 'test.txt', 'text/plain', 'test');

		await waitFor(() => {
			const { file: uploadedFile, isUploaded } =
				useUploadStore.getState();

			expect(uploadedFile).toBeNull();
			expect(isUploaded).toBe(false);
			expect(screen.queryByText('test.csv')).not.toBeInTheDocument();
		});

		restore();
	});

	it('Отображает alert при попытке загрузить файл через drag-and-drop неподдерживаемого типа', async () => {
		const { alertMock, restore } = mockAlert();

		makeDropToZone('upload-container', 'test.txt', 'text/plain', 'test');

		await waitFor(() => {
			expect(alertMock).toHaveBeenCalledWith(
				'Пожалуйста, загрузите CSV файл.'
			);
		});

		restore();
	});
});
