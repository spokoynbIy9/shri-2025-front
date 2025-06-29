import { describe, expect, it } from 'vitest';
import { RoutePath } from '../../../../../shared/config/routes';
import { renderWithRouter } from '../../../../../shared/lib/test-utils';
import { HistoryHighlightReportsBlock } from '../HistoryHighlightReportsBlock';
import userEvent from '@testing-library/user-event';

describe('Роутинг: переход со страницы истории на другие разделы', () => {
	it('Осуществляется переход на страницу генерации CSV по клику из истории', async () => {
		const { history, getByTestId } = renderWithRouter(
			<HistoryHighlightReportsBlock />,
			[`${RoutePath.History}`]
		);
		const pathToGenerate = RoutePath.GeneratorCSV;
		const linkToGenerate = getByTestId('link-to-generate');

		await userEvent.click(linkToGenerate);

		expect(history.location.pathname).toBe(pathToGenerate);
	});
});
