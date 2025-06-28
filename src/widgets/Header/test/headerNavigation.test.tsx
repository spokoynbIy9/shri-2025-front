import { describe, expect, it } from 'vitest';
import { renderWithRouter } from '../../../shared/lib/test-utils';
import { Header } from '../ui/Header';
import { RoutePath } from '../../../shared/config/routes';
import userEvent from '@testing-library/user-event';

describe('HeaderNavigation', () => {
	it('Переход на страничку генерации файлов', async () => {
		const { history, getByTestId } = renderWithRouter(<Header />);
		const pathToGenerate = RoutePath.GeneratorCSV;
		const linkToGenerate = getByTestId(`nav-link-to-${pathToGenerate}`);

		await userEvent.click(linkToGenerate);

		expect(history.location.pathname).toBe(pathToGenerate);
	});

	it('Переход на страничку с анализом файлов', async () => {
		const { history, getByTestId } = renderWithRouter(<Header />);
		const pathToAnalyse = RoutePath.AnalyseCSV;
		const linkToAnalyse = getByTestId(`nav-link-to-${pathToAnalyse}`);

		await userEvent.click(linkToAnalyse);

		expect(history.location.pathname).toBe(pathToAnalyse);
	});

	it('Переход на страничку с историей', async () => {
		const { history, getByTestId } = renderWithRouter(<Header />);
		const pathToHistory = RoutePath.History;
		const linkToHistory = getByTestId(`nav-link-to-${pathToHistory}`);

		await userEvent.click(linkToHistory);

		expect(history.location.pathname).toBe(pathToHistory);
	});
});
