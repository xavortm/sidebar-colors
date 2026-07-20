/**
 * Sidebar Colors block editor entry point.
 */

import { addFilter } from '@wordpress/hooks';
import { registerPlugin } from '@wordpress/plugins';

import BlockColorMenu from './block-color-menu';
import { COLOR_ATTRIBUTE } from './colors';
import ListViewColors from './list-view-colors';
import type { BlockTypeSettings } from './types';

const addColorAttribute = (settings: BlockTypeSettings): BlockTypeSettings => {
	if (settings.attributes?.[COLOR_ATTRIBUTE]) {
		return settings;
	}

	return {
		...settings,
		attributes: {
			...settings.attributes,
			[COLOR_ATTRIBUTE]: {
				type: 'string',
				default: '',
			},
		},
	};
};

addFilter('blocks.registerBlockType', 'sidebar-colors/color-attribute', addColorAttribute);

registerPlugin('sidebar-colors-menu-item', {
	render: () => (
		<>
			<BlockColorMenu />
			<ListViewColors />
		</>
	),
});
