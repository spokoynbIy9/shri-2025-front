import { render, screen } from '@testing-library/react';
import { GenerateButton } from '../../GenerateButton';
import userEvent from '@testing-library/user-event';

export const clickGenerateButton = async () => {
	render(
		<GenerateButton
			isGenerating={false}
			isFinishedGenerate={false}
			hasError={false}
		/>
	);
	await userEvent.click(
		screen.getByRole('button', { name: /начать генерацию/i })
	);
};
