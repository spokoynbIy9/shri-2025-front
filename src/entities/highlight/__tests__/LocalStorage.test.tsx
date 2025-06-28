import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createMockFile } from '../../../shared/lib/test-utils';
import { useAnalyseStore } from '../../../features/analyseFile';
import { HIGHLIGHTS_KEY } from '../model/utils/localStorage';
import type { HighlightReport } from '../model/types';

describe('LocalStorage', () => {
	beforeEach(() => {
		localStorage.clear();
		vi.resetAllMocks();
	});

	it('Складывается ли запись в LocalStorage', async () => {
		const mockDto = JSON.stringify({
			total_spend_galactic: 100,
			rows_affected: 1,
			less_spent_at: 120,
			big_spent_at: 60,
			big_spent_value: 555,
			average_spend_galactic: 555,
			big_spent_civ: 'monsters',
			less_spent_civ: 'humans',
			less_spent_value: 333,
		});

		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue({
				ok: true,
				body: new ReadableStream({
					pull(controller) {
						controller.enqueue(
							new TextEncoder().encode(`${mockDto}\n`)
						);
						controller.close();
					},
				}),
			})
		);

		const file = createMockFile('test.csv');

		const { sendCsvToAggregate } = useAnalyseStore.getState();

		await sendCsvToAggregate(file, 1);

		const saved: Array<HighlightReport> = JSON.parse(
			localStorage.getItem(HIGHLIGHTS_KEY) || '[]'
		);

		expect(saved).toHaveLength(1);
		expect(saved[0].detailedInfo).toMatchObject({
			total_spend_galactic: 100,
			rows_affected: 1,
			less_spent_at: '30 апреля',
			big_spent_at: '1 марта',
			big_spent_value: 555,
			average_spend_galactic: 555,
			big_spent_civ: 'monsters',
			less_spent_civ: 'humans',
		});
	});
});
