import type {
	HighlightGroup,
	HighlightGroupDto,
} from '../../../../entities/highlight';
import { getDateStringFromDayOfYear } from '../../../../shared/lib/helpers/getDateStringFromDayOfYear';

export function transformHighlight(raw: HighlightGroupDto): HighlightGroup {
	return {
		...raw,
		total_spend_galactic: Math.round(raw.total_spend_galactic),
		big_spent_value: Math.round(raw.big_spent_value),
		average_spend_galactic: Math.round(raw.average_spend_galactic),
		big_spent_at: getDateStringFromDayOfYear(raw.big_spent_at),
		less_spent_at: getDateStringFromDayOfYear(raw.less_spent_at),
	};
}
