import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

export function renderWithRouter(ui: React.ReactElement, initialRoute = '/') {
	return render(
		<MemoryRouter initialEntries={[initialRoute]}>{ui}</MemoryRouter>
	);
}
