import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

export function renderWithRouter(
	ui: React.ReactElement,
	initialEntries: string[] = ['/']
) {
	const customHistory = createMemoryHistory({ initialEntries });

	return {
		...render(
			<Router location={customHistory.location} navigator={customHistory}>
				{ui}
			</Router>
		),
		history: customHistory,
	};
}
