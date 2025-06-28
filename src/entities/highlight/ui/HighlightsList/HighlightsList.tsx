import type { FC } from 'react';
import styles from './HighlightsList.module.css';
import { HighlightsItem } from '../HighlightsItem/HighlightsItem';
import classNames from 'classnames';
import type { TypeHighlightsList } from '../../model/types';

interface HighlightsListProps {
	highlights: [string, string][];
	typeList: TypeHighlightsList;
}

export const HighlightsList: FC<HighlightsListProps> = ({
	highlights,
	typeList,
}) => {
	return (
		<div
			data-testid="highlights-list"
			className={classNames(styles.container, {
				[styles.container_history]: typeList === 'history',
				[styles.container_analyse]: typeList === 'analyse',
			})}
		>
			{highlights.map(([title, value]) => {
				return (
					<HighlightsItem
						key={title}
						title={value}
						value={title}
						typeItem={typeList}
					/>
				);
			})}
		</div>
	);
};
