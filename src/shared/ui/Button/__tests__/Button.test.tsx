import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '../Button';
import { useState } from 'react';

describe('ButtonWithLoader', () => {
	it('Отображение лоадера во время обработки', async () => {
		const Wrapper = () => {
			const [isProcessing, setIsProcessing] = useState(false);

			const processingKit = {
				isProcessing,
				isFinishedProcessing: false,
				titleFinishedProcessing: 'Готово',
				hasError: false,
				titleError: null,
				filename: null,
			};

			return (
				<Button
					title="test"
					processingKit={processingKit}
					onClick={() => setIsProcessing(true)}
				/>
			);
		};

		const { getByText, queryByTestId } = render(<Wrapper />);

		expect(queryByTestId('loader')).toBeNull();

		fireEvent.click(getByText('test'));

		expect(queryByTestId('loader')).not.toBeNull();
	});
});
