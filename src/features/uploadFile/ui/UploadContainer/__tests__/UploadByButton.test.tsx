import { beforeEach, describe, expect, it } from 'vitest';
import { useUploadStore } from '../../../model/store';
import { UploadContainer } from '../UploadContainer';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMockFile } from '../../../../../shared/lib/test-utils';

// Проверка на присоединение файла с невалидным расширением не нужна
// в связи с реализованной валидацией самого input'а (accept=".csv,text/csv")

describe('Компонент UploadContainer — загрузка CSV-файла', () => {
	beforeEach(() => {
		const { setFile, setError, setUploaded } = useUploadStore.getState();

		setFile(null);
		setError(null);
		setUploaded(false);
	});

	it('Отображает имя загруженного файла на кнопке после загрузки', async () => {
		const { getByTestId } = render(<UploadContainer />);

		const input = getByTestId('input-upload-csv-file');

		const file = createMockFile('test.csv');

		await userEvent.upload(input, file);

		await waitFor(() => {
			const { file: uploadedFile, isUploaded } =
				useUploadStore.getState();

			expect(uploadedFile?.name).toBe('test.csv');

			expect(isUploaded).toBe(true);

			expect(screen.getByText('test.csv')).toBeInTheDocument();
		});
	});
});
